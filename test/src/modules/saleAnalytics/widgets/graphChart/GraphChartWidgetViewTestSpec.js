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
                {method: 'changeFilter', exercise: changeFilterTestExercise},
                {method: 'switchToFilled', exercise: switchToFilledTestExercise},
                {method: 'switchToLine', exercise: switchToLineTestExercise},
                {method: 'toggleDisplayField', exercise: toggleDisplayFieldTestExercise},
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

                it("Should fire event onFilterRangeChanged", function () {
                    performFilterChange();
                    expect(sut.event.onFilterRangeChanged).toHaveBeenCalled();
                });
            }

            function changeFilterTestExercise() {
                it("Should fire event onFilterChanged", function () {
                    sut.event.onFilterChanged = jasmine.createSpy();
                    sut.fn.changeFilter();
                    expect(sut.event.onFilterChanged).toHaveBeenCalled();
                });
            }

            function switchToFilledTestExercise() {
                it("should assign currentChartType with 'filled'", function () {
                    sut.fn.switchToFilled();
                    expect(sut.$scope.currentChartType).toEqual('filled');
                });

                assertCallRefreshChart(function () {
                    sut.fn.switchToFilled();
                });
            }

            function switchToLineTestExercise() {
                it("should assign currentChartType with 'line'", function () {
                    sut.fn.switchToLine();
                    expect(sut.$scope.currentChartType).toEqual('line');
                });

                assertCallRefreshChart(function () {
                    sut.fn.switchToLine();
                });
            }

            function refreshChartTestExercise() {
                assertCallRefreshChart(function () {
                    sut.fn.refreshChart();
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
                    widgetType: "graph",
                    params: {
                        filters: ['abc', 'def'],
                        fields: []
                    }
                }
            };

            beforeEach(function () {
                sut = new GraphChartWidgetView(scope, {});
                sut.event = {};
                sut.event.onReloadWidgetDone = function () {
                };

                spyOn(sut, 'extractFilters');
                spyOn(sut, 'extractDisplayFields');
                spyOn(sut, 'refreshChart');
            });

            it("Should assign data to scope", function () {
                spyOn(sut.event, 'onReloadWidgetDone');
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.data).toEqual(fakeResponseData.data.params);
            });

            it("should call extractFilters method", function () {
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.extractFilters).toHaveBeenCalled();
            });

            it("should call extractDisplayFields method", function () {
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.extractDisplayFields).toHaveBeenCalled();
            });

            it("should call refreshChart method", function () {
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.refreshChart).toHaveBeenCalled();
            });
        });

        describe("extractDisplayFields", function () {

            var fields = [{
                name: 'field1', data: []
            }, {
                name: 'field2', data: []
            }, {
                name: 'field3', data: []
            }, {
                name: 'field4', data: []
            }];


            beforeEach(function () {
                sut.data = {
                    fields: fields
                };
            });

            describe("availableFields is empty", function () {
                it("should assign availableFields", function () {
                    sut.$scope.availableFields = [];
                    sut.extractDisplayFields();
                    var expected = [{
                        name: 'field1', isDisplaying: true
                    }, {
                        name: 'field2', isDisplaying: true
                    }, {
                        name: 'field3', isDisplaying: true
                    }, {
                        name: 'field4', isDisplaying: true
                    }];
                    expect(sut.$scope.availableFields).toEqual(expected);
                });
            });

            describe("availableFields is not empty", function () {
                it("should keep the current fields setting", function () {
                    sut.$scope.availableFields = [{
                        name: 'field1', isDisplaying: true
                    }, {
                        name: 'field2', isDisplaying: false
                    }, {
                        name: 'field3', isDisplaying: true
                    }, {
                        name: 'field4', isDisplaying: false
                    }];
                    var expected = [{
                        name: 'field1', isDisplaying: true
                    }, {
                        name: 'field2', isDisplaying: false
                    }, {
                        name: 'field3', isDisplaying: true
                    }, {
                        name: 'field4', isDisplaying: false
                    }];


                    sut.extractDisplayFields();
                    expect(sut.$scope.availableFields).toEqual(expected);
                });
            });
        });

        describe("extractFilters", function () {

            it("should assign filters from data", function () {
                sut.data.filters = ['filter1', 'filter2'];
                sut.extractFilters();
                expect(sut.$scope.filters).toEqual(sut.data.filters);
            });

            describe("assign new value to selectedFilter", function () {
                describe("current value is empty", function () {
                    it("should assign selectedFilter to the first element in array", function () {
                        sut.data.filters = [{
                            key: 'filter1',
                            name: 'Filter1'
                        }, {
                            key: 'filter2',
                            name: 'Filter2'
                        }];
                        sut.extractFilters();
                        expect(sut.$scope.selectedFilter).toEqual('filter1');
                    });
                });

                describe("current value is not in filters list", function () {
                    it("should assign selectedFilter to the first element in array", function () {
                        sut.$scope.selectedFilter = 'filterNotInList';
                        sut.data.filters = [{
                            key: 'filter1',
                            name: 'Filter1'
                        }, {
                            key: 'filter2',
                            name: 'Filter2'
                        }];
                        sut.extractFilters();
                        expect(sut.$scope.selectedFilter).toEqual('filter1');
                    });
                });

                describe("current value is in filters list", function () {
                    it("should not assign selectedFilter if it has value", function () {
                        sut.$scope.selectedFilter = 'filter2';
                        sut.data.filters = [{
                            key: 'filter1',
                            name: 'Filter1'
                        }, {
                            key: 'filter2',
                            name: 'Filter2'
                        }];
                        sut.extractFilters();
                        expect(sut.$scope.selectedFilter).toEqual('filter2');
                    });
                });
            });
        });

        describe("refreshChart", function () {

            beforeEach(function () {
                sut.element = {
                    find: jasmine.createSpy()
                };
            });

            describe("data is invalid", function () {

                [{
                    testCase: "fields is not defined", widgetData: {}
                }].forEach(function (test) {
                        describe(test.testCase, function () {
                            it("Should not call paintChart", function () {
                                sut.data = test.widgetData;
                                spyOn(sut, 'paintChart');
                                sut.refreshChart();
                                expect(sut.paintChart).not.toHaveBeenCalled();
                            });
                        });
                    });
            });

            describe("data is valid", function () {
                var spyOnLineGraph;
                beforeEach(function () {
                    sut.$scope.currentChartType = 'filled';
                    spyOnLineGraph = spyOn(sut, 'getLineGraph');
                    spyOn(sut, 'paintChart');
                });

                function performRefreshChart() {
                    sut.data = {
                        fields: [{
                            name: 'abc',
                            data: []
                        }, {
                            name: 'def',
                            data: []
                        }]
                    };
                    sut.refreshChart();
                }

                it("should call getLineGraph() correct times equivalent the available fields", function () {
                    performRefreshChart();
                    expect(sut.getLineGraph).toHaveBeenCalled();
                    expect(spyOnLineGraph.calls.count()).toEqual(sut.data.fields.length);

                    expect(spyOnLineGraph.calls.mostRecent().args[0]).toEqual(sut.data.fields[sut.data.fields.length - 1]);
                    expect(spyOnLineGraph.calls.mostRecent().args[1]).toEqual(sut.$scope.availableFields);
                    expect(spyOnLineGraph.calls.mostRecent().args[2]).toEqual('filled');
                });

                it("should call paintChart()", function () {
                    performRefreshChart();
                    expect(sut.paintChart).toHaveBeenCalled();
                });
            });
        });

        describe("getLineGraph", function () {

            var displayFields = [{
                name: "field1",
                isDisplaying: true
            }, {
                name: "field2",
                isDisplaying: true
            }, {
                name: "field3",
                isDisplaying: false
            }];
            var fields = {
                name: "field1", data: []
            };

            [{
                field: {name: "field1", data: []},
                hidden: false,
                filledStatus: 'filled',
                filled: true
            }, {
                field: {name: "field3", data: []},
                hidden: true,
                filledStatus: 'filled',
                filled: true
            }, {
                field: {name: "field3", data: []},
                hidden: true,
                filledStatus: 'line',
                filled: false
            }].forEach(function (testCase) {
                    var field = testCase.field,
                        hidden = testCase.hidden,
                        filledStatus = testCase.filledStatus,
                        filled = testCase.filled;

                    if (hidden) {
                        it("should return null and not call getLineGraphInstance", function () {
                            GraphChartWidgetView.getLineGraphInstance = jasmine.createSpy();
                            var actual = sut.getLineGraph(field, displayFields, filledStatus);
                            expect(GraphChartWidgetView.getLineGraphInstance).not.toHaveBeenCalled();
                            expect(actual).toBeNull();
                        });
                    }
                    else {
                        it("should call getLineGraphInstance with correct arguments", function () {
                            GraphChartWidgetView.getLineGraphInstance = jasmine.createSpy();
                            sut.getLineGraph(field, displayFields, filledStatus);
                            expect(GraphChartWidgetView.getLineGraphInstance).toHaveBeenCalledWith(field, hidden, filled);
                        });
                    }
                });
        });
    });

});