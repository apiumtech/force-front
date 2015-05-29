/**
 * Created by justin on 2/11/15.
 */

define([
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetPresenter',
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetModel'
], function (MapChartWidgetPresenter, MapChartWidgetModel) {
    'use strict';
    describe("MapChartWidgetPresenter", function () {

        var sut, model;

        beforeEach(function () {
            model = mock(MapChartWidgetModel);
            sut = new MapChartWidgetPresenter(model);
        });

        describe("Connect view to model", function () {
            //region test should declare methods
            var view;
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
                    viewEvent: "onFilterChanged", test: onFilterChangedTest
                }
            ].forEach(function (testCase) {
                    var viewEvent = testCase.viewEvent,
                        test = testCase.test;

                    beforeEach(function () {
                        view = {
                            event: {},
                            sendReloadCommandToChannel: function () {
                            }
                        };
                        sut.show(view);
                    });

                    describe("when event '" + viewEvent + "' fired", test);
                });

            function onReloadingTest() {
                beforeEach(function () {
                    view.selectedFilter = 'users';
                    view.widget = {
                        dataEndpoint: "/test/end/point"
                    };
                    spyOn(sut, '_executeLoadWidget');
                });

                it("should call '_executeLoadWidget' method", function () {
                    view.event.onReloading();
                    expect(sut._executeLoadWidget).toHaveBeenCalled();
                });
            }


            function onDateFilterAppliedTest() {
                var filterValue = {
                    dateStart: new Date(),
                    dateEnd: new Date()
                };
                beforeEach(function () {
                    spyOn(view, 'sendReloadCommandToChannel');
                    view.event.onDateFilterApplied(filterValue);
                });

                it("should call 'addDateFilter' on the model", function () {
                    expect(model.addDateFilter).toHaveBeenCalledWith(filterValue.dateStart, filterValue.dateEnd);
                });

                it("should call 'sendReloadCommandToChannel' on the view", function () {
                    expect(view.sendReloadCommandToChannel).toHaveBeenCalled();
                });
            }

            function onUsersFilterAppliedTest() {
                var filterValue = [1, 2, 3, 4, 5];
                beforeEach(function () {
                    spyOn(view, 'sendReloadCommandToChannel');
                    view.event.onUsersFilterApplied(filterValue);
                });

                it("should call 'addUserFilter' on the model", function () {
                    expect(model.addUserFilter).toHaveBeenCalledWith(filterValue);
                });

                it("should call 'sendReloadCommandToChannel' on the view", function () {
                    expect(view.sendReloadCommandToChannel).toHaveBeenCalled();
                });
            }

            function onFilterChangedTest() {
                beforeEach(function () {
                    spyOn(view, 'sendReloadCommandToChannel');
                    view.selectedFilter = "abcdef";
                    view.event.onFilterChanged();
                });

                it("should call addQuery on model", function () {
                    expect(model.changeQueryFilter).toHaveBeenCalledWith('abcdef');
                });

                it("should fire sendReloadCommandToChannel signal on view", function () {
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

});