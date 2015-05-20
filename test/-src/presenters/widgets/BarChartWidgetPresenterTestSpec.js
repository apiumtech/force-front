/**
 * Created by justin on 1/26/15.
 */

describe("BarChartWidgetPresenter", function () {
    var BarChartWidgetPresenter = app.getPresenter('presenters/widgets/BarChartWidgetPresenter');
    var sut;

    beforeEach(function () {
        sut = BarChartWidgetPresenter.newInstance();
    });

    describe("Connect view to model", function () {
        //region test should declare methods
        var ___view, ___model;
        [
            {
                viewEvent: "onReloading", test: onReloadingTest
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
                        sendReloadCommandToChannel: function () {
                        },
                        event: {}
                    };
                    ___model = {
                        setFetchEndPoint: jasmine.createSpy()
                    };
                    sut.show(view, ___model);
                });

                describe("when event '" + viewEvent + "' fired", test);
            });

        function onReloadingTest() {
            beforeEach(function () {
                view.widget = {
                    dataEndpoint: "/test/end/point"
                };
                spyOn(sut, '_executeLoadWidget');
            });
            it("should add endpoint to model", function () {
                view.event.onReloading();
                expect(___model.setFetchEndPoint).toHaveBeenCalledWith('/test/end/point');
            });
            it("should call '_executeLoadWidget' method", function () {
                view.event.onReloading();
                expect(sut._executeLoadWidget).toHaveBeenCalled();
            });
        }

        function onUsersFilterAppliedTest() {
            var filterValue = [1, 2, 3, 4, 5];
            beforeEach(function () {
                ___model.addUserFilter = jasmine.createSpy();

                spyOn(view, 'sendReloadCommandToChannel');
                view.event.onUsersFilterApplied(filterValue);
            });

            it("should call 'addUserFilter' on the model", function () {
                expect(___model.addUserFilter).toHaveBeenCalledWith(filterValue);
            });

            it("should call 'sendReloadCommandToChannel' on the channel", function () {
                expect(view.sendReloadCommandToChannel).toHaveBeenCalled();
            });
        }

        function onDateFilterAppliedTest() {
            var filterValue = {
                dateStart: new Date(),
                dateEnd: new Date()
            };
            beforeEach(function () {

                ___model.addDateFilter = jasmine.createSpy();

                spyOn(view, 'sendReloadCommandToChannel');
                view.event.onDateFilterApplied(filterValue);
            });

            it("should call 'addDateFilter' on the model", function () {
                expect(___model.addDateFilter).toHaveBeenCalledWith(filterValue.dateStart, filterValue.dateEnd);
            });

            it("should call 'sendReloadCommandToChannel' on the channel", function () {
                expect(view.sendReloadCommandToChannel).toHaveBeenCalled();
            });
        }

        function onTabChangedTest() {
            beforeEach(function () {
                view.selectedFilter = "tab1";
                ___model.changeQueryFilter = jasmine.createSpy();
                spyOn(view, 'sendReloadCommandToChannel');
                view.event.onTabChanged();
            });

            it("should call addQuery with new value", function () {
                expect(___model.changeQueryFilter).toHaveBeenCalledWith("tab1");
            });

            it("should call 'sendReloadCommandToChannel' on the channel", function () {
                expect(view.sendReloadCommandToChannel).toHaveBeenCalled();
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