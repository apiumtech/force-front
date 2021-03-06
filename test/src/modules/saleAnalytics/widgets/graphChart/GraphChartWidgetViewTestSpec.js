/**
 * Created by justin on 12/22/14.
 */
define([
    'angular',
    'modules/saleAnalytics/widgets/graphChart/GraphChartWidgetView',
    'modules/saleAnalytics/widgets/graphChart/GraphChartWidgetPresenter'
], function (angular, GraphChartWidgetView, GraphChartWidgetPresenter) {
    'use strict';
    describe("GraphChartWidgetView", function () {

        var sut, scope, presenter, element;

        beforeEach(inject(function (_$rootScope_) {
            scope = _$rootScope_.$new();
            presenter = mock(GraphChartWidgetPresenter);
            element = angular.element("<div />");
            sut = new GraphChartWidgetView(scope, element, presenter);
        }));

        describe('construct', function () {
            it("should call configureEvents methods", function () {
                spyOn(GraphChartWidgetView.prototype, "configureEvents").and.callThrough();
                new GraphChartWidgetView(scope, element, presenter);
                expect(GraphChartWidgetView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        describe("configureEvents", function () {
            [
                {method: 'changeFilterRange', exercise: changeFilterRangeTestExercise},
                {method: 'switchToFilled', exercise: switchToFilledTestExercise},
                {method: 'switchToLine', exercise: switchToLineTestExercise},
                {method: 'toggleDisplayField', exercise: toggleDisplayFieldTestExercise}
            ].forEach(function (testCase) {
                    var method = testCase.method,
                        exercise = testCase.exercise;

                    if (exercise)
                        describe("calling fn." + method, function () {
                            beforeEach(function () {
                                spyOn(sut, 'paintChart');
                            });

                            exercise();
                        });
                });

            function changeFilterRangeTestExercise() {
                beforeEach(function () {
                    sut.event.onFilterRangeChanged = jasmine.createSpy();
                });
                function performFilterChange() {
                    var param = 'hour';
                    sut.fn.changeFilterRange(param);
                    return param;
                }

                it("should assign correct value", function () {
                    var param = performFilterChange();
                    expect(sut.$scope.selectedRangeOption).toEqual(param);
                });
            }

            function switchToFilledTestExercise() {
                it("should assign currentChartType with 'filled'", function () {
                    sut.fn.switchToFilled();
                    expect(sut.$scope.currentChartType).toEqual('filled');
                });

                assertCallPaintChart(function () {
                    sut.fn.switchToFilled();
                });
            }

            function switchToLineTestExercise() {
                it("should assign currentChartType with 'line'", function () {
                    sut.fn.switchToLine();
                    expect(sut.$scope.currentChartType).toEqual('line');
                });

                assertCallPaintChart(function () {
                    sut.fn.switchToLine();
                });
            }

            function toggleDisplayFieldTestExercise() {
                beforeEach(function () {
                    sut.availableFields = [{
                        name: "Page Views",
                        isDisplaying: true
                    }, {
                        name: "Visits",
                        isDisplaying: false
                    }, {
                        name: "Something",
                        isDisplaying: true
                    }];
                });

                it("should hide field if it's displaying", function () {
                    sut.fn.toggleDisplayField("Page Views");
                    expect(sut.availableFields[0].isDisplaying).toEqual(false);
                });

                it("should show field if it's hidden", function () {
                    sut.fn.toggleDisplayField("Visits");
                    expect(sut.availableFields[1].isDisplaying).toEqual(true);
                });

                it("should not hide field if it's the last one", function () {
                    sut.availableFields[0].isDisplaying = false;
                    sut.fn.toggleDisplayField("Something");
                    expect(sut.availableFields[2].isDisplaying).toEqual(true);
                });
            }

            function assertCallPaintChart(exercise) {
                it("should call paintChart", function () {
                    exercise();
                    expect(sut.paintChart).toHaveBeenCalled();
                });
            }
        });


        describe("extractFilters", function () {
            it("should assign filters from data", function () {
                sut.data.filters = ['filter1', 'filter2'];
                sut.extractFilters();
                expect(sut.$scope.filters).toEqual(sut.data.filters);
            });
        });

    });

});
