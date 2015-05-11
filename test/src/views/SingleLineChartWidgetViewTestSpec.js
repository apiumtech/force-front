/**
 * Created by justin on 2/2/15.
 */

describe("SingleLineChartWidgetView", function () {
    var SingleLineChartWidgetView = app.getView('views/SingleLineChartWidgetView');
    var sut, scope;

    function initSut() {
        scope = {
            $on: function(){},
            $watch: function(){}
        };
        sut = SingleLineChartWidgetView.newInstance(scope, {}, {}, {}, false, false).getOrElse(throwInstantiateException(SingleLineChartWidgetView));
    }

    describe("configureEvents", function () {
        beforeEach(initSut);

        [
            {method: 'assignWidget', exercise: assignWidgetTestExercise},
            {method: 'changeFilter', exercise: changeFilterTestExercise},
            {method: 'refreshChart', exercise: refreshChartTestExercise}
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
                            spyOn(sut, 'refreshChart');
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
            sut = new SingleLineChartWidgetView(scope, {});
            sut.event = {};
            sut.event.onReloadWidgetDone = function () {
            };

            spyOn(sut, 'refreshChart');
            spyOn(sut, 'extractFilters');
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

        it("Should fire done reload widget event", function () {
            spyOn(sut.event, 'onReloadWidgetDone');
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.event.onReloadWidgetDone).toHaveBeenCalledWith();
        });
    });

    describe("extractFilters", function () {
        beforeEach(initSut);

        it("should assign filters from data", function () {
            sut.data.filters = ['filter1', 'filter2'];
            sut.extractFilters();
            expect(sut.filters).toEqual(sut.data.filters);
        });

        describe("assign new value to selectedFilter", function () {
            describe("current value is empty", function () {
                it("should assign selectedFilter to the first element in array", function () {
                    sut.data.filters = ['filter1', 'filter2', 'filter3'];
                    sut.extractFilters();
                    expect(sut.$scope.selectedFilter).toEqual('filter1');
                });
            });

            describe("current value is not in filters list", function () {
                it("should assign selectedFilter to the first element in array", function () {
                    sut.selectedFilter = 'filterNotInList';
                    sut.data.filters = ['filter1', 'filter2', 'filter3'];
                    sut.extractFilters();
                    expect(sut.selectedFilter).toEqual('filter1');
                });
            });

            describe("current value is in filters list", function () {
                it("should not assign selectedFilter if it has value", function () {
                    sut.selectedFilter = 'filter2';
                    sut.data.filters = ['filter1', 'filter2'];
                    sut.extractFilters();
                    expect(sut.selectedFilter).toEqual('filter2');
                });
            });
        });
    });

    describe("refreshChart", function () {
        beforeEach(initSut);

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
                            label: "pie1", data: [
                            [0, 1],
                            [1, 2]
                        ]
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