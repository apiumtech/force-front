/**
 * Created by justin on 2/11/15.
 */

define([
    'angular',
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetView',
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetPresenter',
    'plots/MapChart',
    'shared/services/config/PermissionsService'
], function (angular, MapChartWidgetView, MapChartWidgetPresenter, MapChart, PermissionsService) {
    'use strict';
    describe("MapChartWidgetView", function () {

        var sut, scope, presenter, element, mapChart;

        beforeEach(inject(function (_$rootScope_) {
            scope = _$rootScope_.$new();
            presenter = mock(MapChartWidgetPresenter);
            element = angular.element("<div />");
            mapChart = mock(MapChart);
            sut = new MapChartWidgetView(scope, element, mapChart, presenter, mock(PermissionsService));
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

            var data = [{not: "null"}];

            it("should call paintChart()", function () {
                spyOn(sut, 'paintChart');
                var fakeElement = {};
                spyOn(sut.element, 'find').and.returnValue(fakeElement);
                sut.refreshChart(data);
                expect(sut.paintChart).toHaveBeenCalledWith(fakeElement);
            });

            it("should call clearHeatMap and clearPointMap from mapchart()", function () {
                spyOn(sut, 'paintChart');
                sut.refreshChart(data);
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
                        sut.selectedFilter = filter;
                        sut.refreshChart(data);
                        expect(mapChart[method]).toHaveBeenCalledWith(data);
                    });
                });
        });

        describe("canDisplayUsersInMap", function () {
            it('should allow displaying when permission is true', function () {
                spyOn(sut.permissionsService, "getPermission").and.returnValue(true);
                expect(sut.canDisplayUsersInMap()).toBe(true);
            });
            it('should not allow displaying when permission is false', function () {
                spyOn(sut.permissionsService, "getPermission").and.returnValue(false);
                expect(sut.canDisplayUsersInMap()).toBe(false);
            });
        });
    });

});