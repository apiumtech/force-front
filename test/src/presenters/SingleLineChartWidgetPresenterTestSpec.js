/**
 * Created by justin on 2/2/15.
 */

describe("SingleLineChartWidgetPresenter", function () {
    var SingleLineChartWidgetPresenter = app.getPresenter('presenters/SingleLineChartWidgetPresenter');
    var sut;

    beforeEach(function () {
        sut = SingleLineChartWidgetPresenter.newInstance().getOrElse(throwException("Cannot instantiate SingleLineChartWidgetPresenter"));
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

            it("should call 'sendReloadCompleteSignal' on the channel", function () {
                expect(sut.widgetEventChannel.sendReloadCompleteSignal).toHaveBeenCalledWith(errMsg);
            });
        }

        function onFilterChangedTest() {
            function prepareTabChanged() {
                ___view.selectedFilter = "tab1";
                ___model.changeFilterTab = jasmine.createSpy();
                spyOn(sut.widgetEventChannel, 'sendReloadSignal');
                ___view.event.onFilterChanged();
            }

            it("should call addQuery with new value", function () {
                prepareTabChanged();
                expect(___model.changeFilterTab).toHaveBeenCalledWith("tab1");
            });

            it("should fire reload signal on channel", function () {
                prepareTabChanged();
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