/**
 * Created by justin on 12/22/14.
 */
describe("TableWidgetPresenter", function () {
    var TableWidgetPresenter = app.getPresenter('presenters/TableWidgetPresenter');
    var sut;

    beforeEach(function () {
        sut = TableWidgetPresenter.newInstance().getOrElse(throwException("Cannot instantiate TableWidgetPresenter"));
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
                viewEvent: "onDateFilterApplied", test: onDateFilterAppliedTest
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
                    testDeclareMethod(___view.event, viewEvent);
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

            it("should call 'sendReloadCompleteSignal' on the channel", function () {
                expect(sut.widgetEventChannel.sendReloadCompleteSignal).toHaveBeenCalledWith(errMsg);
            });
        }

        function onDateFilterAppliedTest() {
            var filterValue = {
                dateStart: new Date(),
                dateEnd: new Date()
            };
            beforeEach(function () {
                ___model.addDateFilter = jasmine.createSpy();

                spyOn(sut.widgetEventChannel, 'sendReloadSignal');
                ___view.event.onDateFilterApplied(filterValue);
            });

            it("should call 'addDateFilter' on the model", function () {
                expect(___model.addDateFilter).toHaveBeenCalledWith(filterValue.dateStart, filterValue.dateEnd);
            });

            it("should call 'sendReloadSignal' on the channel", function () {
                expect(sut.widgetEventChannel.sendReloadSignal).toHaveBeenCalled();
            });
        }


        //endregion test should declare methods

        [{
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
    });
});