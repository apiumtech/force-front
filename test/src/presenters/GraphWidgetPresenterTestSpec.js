/**
 * Created by justin on 12/22/14.
 */
describe("GraphWidgetPresenter", function () {
    var GraphWidgetPresenter = app.getPresenter('presenters/GraphWidgetPresenter');
    var sut;

    beforeEach(function () {
        sut = GraphWidgetPresenter.newInstance().getOrElse(throwException("Cannot instantiate GraphWidgetPresenter"));
    });

    describe("Connect view to model", function () {
        //region test should declare methods
        var ___view, ___model;
        [
            {
                viewEvent: "onReloadWidgetStart", test: onReloadWidgetStartTest
            },
            {
                viewEvent: "onReloadWidgetDone", test: onReloadWidgetDoneTest
            },
            {
                viewEvent: "onFilterChanged", test: onFilterChangedTest
            },
            {
                viewEvent: "onFilterRangeChanged", test: onFilterRangeChangedTest
            }
        ].forEach(function (testCase) {
                var viewEvent = testCase.viewEvent,
                    test = testCase.test;

                beforeEach(function () {
                    ___view = {
                        event: {}
                    };
                    ___model = {
                        setFetchEndPoint: jasmine.createSpy()
                    };
                    sut.show(___view, ___model);
                });

                it("should declared '" + viewEvent + "' event for View", function () {

                    expect(___view.event[viewEvent]).not.toBeNull();
                    expect(isFunction(___view.event[viewEvent])).toEqual(true);
                });

                describe("when event '" + viewEvent + "' fired", test);
            });

        function onReloadWidgetStartTest() {
            beforeEach(function () {
                ___view.widget = {
                    dataEndpoint: "/test/end/point"
                };
                spyOn(sut, '_executeLoadWidget');
            });
            it("should add endpoint to model", function () {
                ___view.event.onReloadWidgetStart();
                expect(___model.setFetchEndPoint).toHaveBeenCalledWith('/test/end/point');
            });

            it("should call '_executeLoadWidget' method", function () {
                ___view.event.onReloadWidgetStart();
                expect(sut._executeLoadWidget).toHaveBeenCalled();
            });
        }

        function onReloadWidgetDoneTest() {
            var errMsg = {msg: "test message"};
            beforeEach(function () {
                ___model.addQuery = jasmine.createSpy();
                ___view.$scope = {
                    selectedFilter: 'selectedFilter',
                    selectedRangeOption: 'selectedRangeOption'
                };
                spyOn(sut.widgetEventChannel, 'sendReloadCompleteSignal');
                ___view.event.onReloadWidgetDone(errMsg);
            });

            it("should call 'addQuery' on model for initialing selectedFilter", function () {
                expect(___model.addQuery).toHaveBeenCalledWith('filter', 'selectedFilter');
            });
            it("should call 'addQuery' on model for initialing selectedRangeOption", function () {
                expect(___model.addQuery).toHaveBeenCalledWith('rangeOption', 'selectedRangeOption');
            });

            it("should call 'sendReloadCompleteSignal' on the channel", function () {
                expect(sut.widgetEventChannel.sendReloadCompleteSignal).toHaveBeenCalledWith(errMsg);
            });
        }

        function onFilterChangedTest() {
            beforeEach(function () {
                ___model.addQuery = jasmine.createSpy();
            });

            function exercisePrepareFilterChangeCall() {
                ___view.$scope = {selectedFilter: "abcdef"};
                spyOn(sut.widgetEventChannel, 'sendReloadSignal');
                ___view.event.onFilterChanged();
            }

            it("should call addQuery on model", function () {
                exercisePrepareFilterChangeCall();
                expect(___model.addQuery).toHaveBeenCalledWith('filter', 'abcdef');
            });

            it("should fire sendReloadSignal signal on channel", function () {
                exercisePrepareFilterChangeCall();
                expect(sut.widgetEventChannel.sendReloadSignal).toHaveBeenCalled();
            });
        }

        function onFilterRangeChangedTest() {
            beforeEach(function () {
                ___model.addQuery = jasmine.createSpy();
            });

            function exercisePrepareFilterChangeCall() {
                ___view.$scope = {selectedRangeOption: "date"};
                spyOn(sut.widgetEventChannel, 'sendReloadSignal');
                ___view.event.onFilterRangeChanged();
            }

            it("should call addQuery on model", function () {
                exercisePrepareFilterChangeCall();
                expect(___model.addQuery).toHaveBeenCalledWith('rangeOption', 'date');
            });

            it("should fire sendReloadSignal signal on channel", function () {
                exercisePrepareFilterChangeCall();
                expect(sut.widgetEventChannel.sendReloadSignal).toHaveBeenCalled();
            });
        }


        //endregion test should declare methods

        //region specific methods
        [{
            method: "_executeLoadWidget",
            modelMethod: "reloadWidget",
            onError: "onReloadWidgetError",
            onSuccess: "onReloadWidgetSuccess"
        }, {
            method: "_executeLoadWidget",
            modelMethod: "reloadWidget",
            onError: "onReloadWidgetError",
            onSuccess: "onReloadWidgetSuccess"
        }].forEach(function (item) {
                describe("Calling '" + item.method + "' ", function () {
                    var model = createModel();
                    var view = createView();

                    it("should call '" + item.modelMethod + "' on model", function () {
                        spyOn(model, item.modelMethod).and.returnValue(exerciseFakePromise());
                        sut.show(view, model);
                        sut[item.method]();
                        expect(model[item.modelMethod]).toHaveBeenCalled();
                    });

                    it("should call '" + item.onSuccess + "' when model returns success", function () {
                        spyOn(model, item.modelMethod).and.returnValue(exerciseFakeOkPromise());
                        sut.show(view, model);
                        sut[item.method]();
                        expect(view[item.onSuccess]).toHaveBeenCalled();
                    });

                    it("should call '" + item.onError + "' when model returns fail", function () {
                        spyOn(model, item.modelMethod).and.returnValue(exerciseFakeKoPromise());
                        sut.show(view, model);
                        sut[item.method]();
                        expect(view[item.onError]).toHaveBeenCalled();
                    });
                });

                function createModel() {
                    var model = {};
                    model[item.modelMethod] = function () {
                    };
                    return model;
                }

                function createView() {
                    var v = {event: {}};
                    v[item.onSuccess] = jasmine.createSpy();
                    v[item.onError] = jasmine.createSpy();
                    v.event[item.event] = function () {
                    };
                    return v;
                }
            });

        //endregion
    });
});