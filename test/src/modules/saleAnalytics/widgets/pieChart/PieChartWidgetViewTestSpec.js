/**
 * Created by justin on 1/26/15.
 */

define([
    'angular',
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetView',
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetPresenter'
], function (angular, PieChartWidgetView, PieChartPresenter) {
    'use strict';
    xdescribe("PieChartWidgetView", function () {
        var sut, scope, presenter, element, pieChart;

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

                it("should assign selected tab with new value", function () {
                    exerciseChangeTab();
                    expect(sut.selectedFilter).toEqual(newValue);
                });

                it("should fire onTabChanged event", function () {
                    exerciseChangeTab();
                    expect(sut.event.onTabChanged).toHaveBeenCalled();
                });
            }




            function assertCallPaintChart(exercise) {
                it("should call paintChart", function () {
                    exercise();
                    expect(sut.paintChart).toHaveBeenCalled();
                });
            }
        });

        describe("onReloadWidgetSuccess", function () {
            var fakeResponseData = {
                data: {
                    widgetType: "pie",
                    params: {
                        filters: [{name: "name1", key: "key1"}, {name: "name2", key: "key2"}],
                        params: [
                            {label: "pie1", data: 30},
                            {label: "pie4", data: 15},
                            {label: "pie3", data: 15},
                            {label: "pie2", data: 40}
                        ]
                    }
                }
            };

            beforeEach(function () {
                sut.event = {};
                sut.event.onReloadWidgetDone = function () {
                };

                spyOn(sut, 'paintChart');
                spyOn(sut, '_onReloadWidgetSuccess');
                sut.$scope.apply = function () {
                };
            });

            it("Should assign filters to scope", function () {
                spyOn(sut.event, 'onReloadWidgetDone');
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.tabs).toEqual(fakeResponseData.data.params.filters);
            });

            it("Should assign selectedFiler to scope with value is first element of filters", function () {
                spyOn(sut.event, 'onReloadWidgetDone');
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.selectedFilter).toEqual(fakeResponseData.data.params.filters[0].key);
            });

            it("Should not assign selectedFiler if it has value", function () {
                sut.selectedFilter = "tab2";
                spyOn(sut.event, 'onReloadWidgetDone');
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.selectedFilter).not.toEqual(fakeResponseData.data.params.filters[0].key);
                expect(sut.selectedFilter).toEqual("tab2");
            });

            it("Should assign data to scope", function () {
                spyOn(sut.event, 'onReloadWidgetDone');
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.data).toEqual(fakeResponseData.data.params.params);
            });

            it("should call paintChart method", function () {
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.paintChart).toHaveBeenCalled();
            });

            it("Should call _onReloadWidgetSuccess on base", function () {
                spyOn(sut.event, 'onReloadWidgetDone');
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut._onReloadWidgetSuccess).toHaveBeenCalled();
            });
        });

    });
});
