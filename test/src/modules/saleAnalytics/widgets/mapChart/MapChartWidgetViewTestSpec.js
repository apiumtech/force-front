/**
 * Created by justin on 2/11/15.
 */

define([
    'angular',
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetView',
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetPresenter',
    'plots/MapChart'
], function (angular, MapChartWidgetView, MapChartWidgetPresenter, MapChart) {
    'use strict';
    describe("MapChartWidgetView", function () {

        var sut, scope, presenter, element, mapChart;

        beforeEach(inject(function (_$rootScope_) {
            scope = _$rootScope_.$new();
            presenter = mock(MapChartWidgetPresenter);
            element = angular.element("<div />");
            mapChart = mock(MapChart);
            sut = new MapChartWidgetView(scope, element, mapChart, presenter);
        }));

        describe("configureEvents", function () {
            [
                {method: 'changeFilter', exercise: changeFilterTestExercise},
                {method: 'refreshChart', exercise: refreshChartTestExercise}
            ].forEach(function (testCase) {
                    var method = testCase.method,
                        exercise = testCase.exercise;

                    if (exercise)
                        describe("calling fn." + method, function () {
                            beforeEach(function () {
                                spyOn(sut, 'refreshChart');
                            });

                            exercise();
                        });
                });

            function changeFilterTestExercise() {
                beforeEach(function () {
                    sut.event = sut.event || {};
                    sut.event.onFilterChanged = jasmine.createSpy();
                });

                function exerciseChangeTab() {
                    sut.fn.changeFilter();
                }

                it("should fire onFilterChanged event", function () {
                    exerciseChangeTab();
                    expect(sut.event.onFilterChanged).toHaveBeenCalled();
                });
            }


            function refreshChartTestExercise() {
                assertCallRefreshChart(function () {
                    sut.fn.refreshChart();
                });
            }

            function assertCallRefreshChart(exercise) {
                it("should call refreshChart", function () {
                    exercise();
                    expect(sut.refreshChart).toHaveBeenCalled();
                });
            }
        });

        describe("onReloadWidgetSuccess", function () {
            var fakeResponseData = {
                data: {
                    widgetType: "map",
                    params: {}
                }
            };

            beforeEach(function () {
                //sut = new MapChartWidgetView(scope, {});
                sut.event = {};
                sut.event.onReloadWidgetDone = function () {
                };

                spyOn(sut, 'refreshChart');
                spyOn(sut, '_onReloadWidgetSuccess');
            });

            it("should call refreshChart method", function () {
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.refreshChart).toHaveBeenCalled();
            });

            it("Should call _onReloadWidgetSuccess on base", function () {
                spyOn(sut.event, 'onReloadWidgetDone');
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut._onReloadWidgetSuccess).toHaveBeenCalled();
            });
        });

        describe("refreshChart", function () {

            it("should call paintChart()", function () {
                spyOn(sut, 'paintChart');
                var fakeElement = {};
                spyOn(sut.element, 'find').and.returnValue(fakeElement);
                sut.refreshChart();
                expect(sut.paintChart).toHaveBeenCalledWith(fakeElement);
            });

            it("should call clearHeatMap and clearPointMap from mapchart()", function () {
                spyOn(sut, 'paintChart');
                sut.refreshChart();
                expect(mapChart.clearHeatMap).toHaveBeenCalled();
                expect(mapChart.clearPointMap).toHaveBeenCalled();
            });

            [
                {selectedFilter: "checkins", method: "applyHeatLayer"},
                {selectedFilter: "users", method: "createUserMap"}
            ].forEach(function (test) {
                    var filter = test.selectedFilter;
                    var method = test.method;

                    it("should call '" + method + "' method from mapchart when selectedFilter is '" + filter + "'", function () {
                        spyOn(sut, 'paintChart');
                        var data = {};
                        sut.selectedFilter = filter;
                        sut.refreshChart(data);
                        expect(mapChart[method]).toHaveBeenCalledWith(data);
                    });
                });
        });

        describe("shouldShowOption", function () {
            it("should return true when widget.option has the item", function () {
                sut.widget = {
                    option: "option1|option2|option3"
                };
                expect(sut.shouldShowOption('option2')).toBe(true);
            });
            it("should return false when widget.option doesn't have the item", function () {
                sut.widget = {
                    option: "option1|option2|option3"
                };
                expect(sut.shouldShowOption('option4')).toBe(false);
            });
            it("should work with one item", function () {
                sut.widget = {
                    option: "option5"
                };
                expect(sut.shouldShowOption('option5')).toBe(true);
            });
            it("should return false when no items are provided", function () {
                sut.widget = {
                    option: ""
                };
                expect(sut.shouldShowOption('option6')).toBe(false);
            });
        });
    });

});