/**
 * Created by justin on 2/2/15.
 */

define([
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetPresenter',
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetModel'
], function (ScatterChartWidgetPresenter, ScatterChartWidgetModel) {
    'use strict';
    describe("ScatterChartWidgetPresenter", function () {
        var sut, model;

        beforeEach(function () {
            model = mock(ScatterChartWidgetModel);
            sut = new ScatterChartWidgetPresenter(model);
        });

        describe("Connect view to model", function () {
            //region test should declare methods
            var view;
            [
                {
                    viewEvent: "onDateFilterApplied", test: onDateFilterAppliedTest
                },
                {
                    viewEvent: "onUsersFilterApplied", test: onUsersFilterAppliedTest
                }
            ].forEach(function (testCase) {
                    var viewEvent = testCase.viewEvent,
                        test = testCase.test;

                    beforeEach(function () {
                        view = {
                            sendReloadCommandToChannel: function () {
                            },
                            generateTooltip: function(){},
                            event: {}
                        };
                        sut.show(view);
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
                    view.event.onReloading();
                    expect(model.setFetchEndPoint).toHaveBeenCalledWith('/test/end/point');
                });
                it("should call '_executeLoadWidget' method", function () {
                    view.event.onReloading();
                    expect(sut._executeLoadWidget).toHaveBeenCalled();
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
                    spyOn(view, 'sendReloadCommandToChannel');
                    view.event.onDateFilterApplied(filterValue);
                });

                it("should call 'addDateFilter' on the model", function () {
                    expect(model.addDateFilter).toHaveBeenCalledWith(filterValue.dateStart, filterValue.dateEnd);
                });

                it("should call 'sendReloadCommandToChannel' on the channel", function () {
                    expect(view.sendReloadCommandToChannel).toHaveBeenCalled();
                });
            }

            //endregion test should declare methods

            //region specific methods
            [{
                method: "_executeLoadWidget",
                modelMethod: "_reload",
                onError: "onReloadWidgetError",
                onSuccess: "onReloadWidgetSuccess"
            }].forEach(function (item) {
                    describe("Calling '" + item.method + "' ", function () {
                        var view = createView();

                        it("should call '" + item.modelMethod + "' on model", function () {
                            spyOn(model, item.modelMethod).and.returnValue(exerciseFakePromise());
                            sut.show(view);
                            sut[item.method]();
                            expect(model[item.modelMethod]).toHaveBeenCalled();
                        });

                        it("should call '" + item.onSuccess + "' when model returns success", function () {
                            spyOn(model, item.modelMethod).and.returnValue(exerciseFakeOkPromise());
                            sut.show(view);
                            sut[item.method]();
                            expect(view[item.onSuccess]).toHaveBeenCalled();
                        });

                        it("should call '" + item.onError + "' when model returns fail", function () {
                            spyOn(model, item.modelMethod).and.returnValue(exerciseFakeKoPromise());
                            sut.show(view);
                            sut[item.method]();
                            expect(view[item.onError]).toHaveBeenCalled();
                        });
                    });

                    function createView() {
                        var v = {event: {}, generateTooltip: function(){}};
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
