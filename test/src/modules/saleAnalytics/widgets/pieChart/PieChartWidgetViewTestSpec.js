/**
 * Created by justin on 1/26/15.
 */

define([
    'angular',
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetView',
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetPresenter'
], function (angular, PieChartWidgetView, PieChartPresenter) {
    'use strict';
    describe("PieChartWidgetView", function () {
        var sut, scope, presenter, element;

        beforeEach(inject(function(_$rootScope_){
            scope = _$rootScope_.$new();
            presenter = mock(PieChartPresenter);
            element = angular.element('<div />');
            sut = new PieChartWidgetView(scope, element, presenter);
        }));

        describe("configureEvents", function () {
            [
                {method: 'assignWidget', exercise: assignWidgetTestExercise},
                {method: 'changeFilter', exercise: changeTabTestExercise}
            ].forEach(function (testCase) {
                    var method = testCase.method,
                        exercise = testCase.exercise;

                    it("should declare method fn." + method, function () {
                        expect(sut.fn[method]).not.toBeNull();
                        expect(isFunction(sut.fn[method])).toEqual(true);
                    });

                    if (exercise)
                        describe("calling fn." + method, function () {
                            beforeEach(function () {
                                spyOn(sut, 'paintChart');
                            });

                            exercise();
                        });
                });

            function assignWidgetTestExercise() {
                var outerWidgetScope = {
                    widgetId: 10,
                    order: 10
                };

                function spyEvent() {
                    sut.event.onReloadWidgetStart = jasmine.createSpy();
                }

                it("should assign outer scope to current instance", function () {
                    spyEvent();
                    sut.fn.assignWidget(outerWidgetScope);
                    expect(sut.widget).toEqual(outerWidgetScope);
                });

                it("should fire event 'onReloadWidgetStart'", function () {
                    spyEvent();
                    sut.fn.assignWidget(outerWidgetScope);
                    expect(sut.event.onReloadWidgetStart).toHaveBeenCalled();
                });

            }

            function changeTabTestExercise() {
                beforeEach(function () {
                    sut.event = sut.event || {};
                    sut.event.onTabChanged = jasmine.createSpy();
                });
                var newValue = "tab2";

                function exerciseChangeTab() {
                    sut.fn.changeFilter(newValue);
                }

                it("should fire onTabChanged event", function () {
                    exerciseChangeTab();
                    expect(sut.event.onTabChanged).toHaveBeenCalled();
                });
            }
        });

    });
});
