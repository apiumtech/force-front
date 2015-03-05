/**
 * Created by justin on 1/26/15.
 */

describe("PieChartWidgetPresenter", function () {
    var PieChartWidgetPresenter = app.getPresenter('presenters/PieChartWidgetPresenter');
    var sut;

    beforeEach(function () {
        sut = PieChartWidgetPresenter.newInstance().getOrElse(throwException("Cannot instantiate PieChartWidgetPresenter"));
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
            },
            {
                viewEvent: "onUsersFilterApplied", test: onUsersFilterAppliedTest
            },
            {
                viewEvent: "onTabChanged", test: onTabChangedTest
            }
        ].forEach(function (testCase) {
                var viewEvent = testCase.viewEvent,
                    test = testCase.test;

                beforeEach(function () {
                    view = {
                        event: {}
                    };
                    ___model = {
                        setFetchEndPoint: jasmine.createSpy()
                    };
                    sut.show(view, ___model);
                });

                it("should declared '" + viewEvent + "' event for View", function () {
                    testDeclareMethod(view.event, viewEvent);
                });

                describe("when event '" + viewEvent + "' fired", test);
            });

        function onReloadWidgetStartTest() {
            beforeEach(function () {
                view.widget = {
                    dataEndpoint: "/test/end/point"
                };
                spyOn(sut, '_executeLoadWidget');
            });
            it("should add endpoint to model", function () {
                view.event.onReloadWidgetStart();
                expect(___model.setFetchEndPoint).toHaveBeenCalledWith('/test/end/point');
            });

            it("should call '_executeLoadWidget' method", function () {
                view.event.onReloadWidgetStart();
                expect(sut._executeLoadWidget).toHaveBeenCalled();
            });
        }

        function onUsersFilterAppliedTest() {
            var filterValue = [1, 2, 3, 4, 5];
            beforeEach(function () {
                ___model.addUserFilter = jasmine.createSpy();

                spyOn(sut.widgetEventChannel, 'sendReloadSignal');
                view.event.onUsersFilterApplied(filterValue);
            });

            it("should call 'addUserFilter' on the model", function () {
                expect(___model.addUserFilter).toHaveBeenCalledWith(filterValue);
            });

            it("should call 'sendReloadSignal' on the channel", function () {
                expect(sut.widgetEventChannel.sendReloadSignal).toHaveBeenCalled();
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
                view.event.onDateFilterApplied(filterValue);
            });

            it("should call 'addDateFilter' on the model", function () {
                expect(___model.addDateFilter).toHaveBeenCalledWith(filterValue.dateStart, filterValue.dateEnd);
            });

            it("should call 'sendReloadSignal' on the channel", function () {
                expect(sut.widgetEventChannel.sendReloadSignal).toHaveBeenCalled();
            });
        }

        function onReloadWidgetDoneTest() {
            var errMsg = {msg: "test message"};
            beforeEach(function () {
                ___model.addQuery = jasmine.createSpy();
                view.$scope = {
                    selectedFilter: 'selectedFilter',
                    selectedRangeOption: 'selectedRangeOption'
                };
                spyOn(sut.widgetEventChannel, 'sendReloadCompleteSignal');
                view.event.onReloadWidgetDone(errMsg);
            });

            it("should call 'sendReloadCompleteSignal' on the channel", function () {
                expect(sut.widgetEventChannel.sendReloadCompleteSignal).toHaveBeenCalledWith(errMsg);
            });
        }

        function onTabChangedTest() {
            function prepareTabChanged() {
                view.selectedFilter = "tab1";
                ___model.changeFilterTab = jasmine.createSpy();
                spyOn(sut.widgetEventChannel, 'sendReloadSignal');
                view.event.onTabChanged();
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