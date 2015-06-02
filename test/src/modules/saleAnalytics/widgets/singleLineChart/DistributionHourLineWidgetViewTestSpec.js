/**
 * Created by justin on 2/2/15.
 */

define([
    'angular',
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetView',
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetPresenter'
], function (angular, DistributionHourLineWidgetView, DistributionHourLineWidgetPresenter) {
    'use strict';
    describe("DistributionHourLineWidgetView", function () {
        var sut, scope, presenter, element;

        beforeEach(inject(function (_$rootScope_) {
            scope = _$rootScope_.$new();
            presenter = mock(DistributionHourLineWidgetPresenter);
            element = angular.element('<div />');
            sut = new DistributionHourLineWidgetView(scope, element, presenter);
        }));

        describe('construct', function () {
            beforeEach(function () {
                sinon.stub(DistributionHourLineWidgetView.prototype, 'configureEvents');
            });
            afterEach(function () {
                DistributionHourLineWidgetView.prototype.configureEvents.restore();
            });

            it("should call configureEvents", function () {
                new DistributionHourLineWidgetView(scope, element);
                expect(DistributionHourLineWidgetView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        describe("configureEvents", function () {
            [
                {method: 'assignWidget', test: assignWidgetTestExercise},
                {method: 'changeFilter', test: changeFilterTestExercise},
                {method: 'refreshChart', test: refreshChartTestExercise}
            ].forEach(function (test) {
                    var method = test.method;
                    describe("calling fn." + method, test.test);
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

            function changeFilterTestExercise() {
                beforeEach(function () {
                    sut.event = sut.event || {};
                    sut.event.onFilterChanged = jasmine.createSpy();
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
                    expect(sut.event.onFilterChanged).toHaveBeenCalled();
                });
            }


            function refreshChartTestExercise() {
                it("should call refresh chart function", function () {
                    spyOn(sut, 'refreshChart');
                    sut.fn.refreshChart();
                    expect(sut.refreshChart).toHaveBeenCalled();
                });
            }

        });

        describe("onReloadWidgetSuccess", function () {
            var fakeResponseData = {
                data: {
                    widgetType: "bar",
                    params: {
                        filters: ["filter1", "filter2"],
                        axis: {
                            x: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                        },
                        bars: [
                            {label: "bar1", data: [12, 13, 25, 32, 46, 58]},
                            {label: "bar4", data: [12, 13, 25, 32, 46, 58]},
                            {label: "bar3", data: [12, 13, 25, 32, 46, 58]},
                            {label: "bar2", data: [12, 13, 25, 32, 46, 58]}
                        ]
                    }
                }
            };

            beforeEach(function () {
                sut = new DistributionHourLineWidgetView(scope, {});
                sut.event = {};
                sut.event.onReloadWidgetDone = function () {
                };

                spyOn(sut, 'refreshChart');
                spyOn(sut, 'extractFilters');
                spyOn(sut, '_onReloadWidgetSuccess');
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

        describe("extractFilters", function () {

            it("should assign filters from data", function () {
                sut.data.filters = [{name: "name1", key: "key1"}, {name: "name2", key: "key2"}];
                sut.extractFilters();
                expect(sut.filters).toEqual(sut.data.filters);
            });

            describe("assign new value to selectedFilter", function () {
                describe("current value is empty", function () {
                    it("should assign selectedFilter to the first element in array", function () {
                        sut.data.filters = [{name: "name1", key: "key1"}, {name: "name2", key: "key2"}];
                        sut.extractFilters();
                        expect(sut.$scope.selectedFilter).toEqual('key1');
                    });
                });

                describe("current value is not in filters list", function () {
                    it("should assign selectedFilter to the first element in array", function () {
                        sut.selectedFilter = 'filterNotInList';
                        sut.data.filters = [{name: "name1", key: "key1"}, {name: "name2", key: "key2"}];
                        sut.extractFilters();
                        expect(sut.selectedFilter).toEqual('key1');
                    });
                });

                describe("current value is in filters list", function () {
                    it("should not assign selectedFilter if it has value", function () {
                        sut.selectedFilter = 'key2';
                        sut.data.filters = [{name: "name1", key: "key1"}, {name: "name2", key: "key2"}];
                        sut.extractFilters();
                        expect(sut.selectedFilter).toEqual('key2');
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
                    testCase: "data is not defined", widgetData: undefined
                }, {
                    testCase: "data is null", widgetData: null
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
                var fakeElement = {"element returned": "element"};
                beforeEach(function () {
                    spyOn(sut, 'paintChart');
                    sut.data = {
                        fields: [
                            {
                                name: "pie1", data: [1, 2]
                            }
                        ]
                    };
                    sut.element = {
                        find: function () {
                            return fakeElement;
                        }
                    }
                });

                it("should call paintChart()", function () {
                    sut.refreshChart();
                    expect(sut.paintChart).toHaveBeenCalled();
                });
            });
        });
    });
});
