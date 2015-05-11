/**
 * Created by justin on 1/26/15.
 */

describe("BarChartWidgetView", function () {
    var BarChartWidgetView = app.getView('views/BarChartWidgetView');
    var sut, scope;

    function initSut() {
        scope={
            $on:function(){},
            $watch:function(){}
        };
        sut = BarChartWidgetView.newInstance(scope, {}, {}, {}, false, false).getOrElse(throwInstantiateException(BarChartWidgetView));
    }

    describe("configureEvents", function () {
        beforeEach(initSut);

        [
            {method: 'assignWidget', exercise: assignWidgetTestExercise},
            {method: 'changeFilter', exercise: changeTabTestExercise},
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

        beforeEach(function(){
            initSut();
            sut.event.onReloadWidgetDone=function(){};
            sut.refreshChart = jasmine.createSpy();
            spyOn(sut, '_onReloadWidgetSuccess');
        });

        it("Should assign filters to scope", function () {
            spyOn(sut.event, 'onReloadWidgetDone');
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.tabs).toEqual(fakeResponseData.data.params.filters);
        });

        it("Should assign selectedFiler to scope with value is first element of filters", function () {
            spyOn(sut.event, 'onReloadWidgetDone');
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.selectedFilter).toEqual(fakeResponseData.data.params.filters[0]);
        });

        it("Should not assign selectedFiler if it has value", function () {
            sut.selectedFilter = "tab2";
            spyOn(sut.event, 'onReloadWidgetDone');
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.selectedFilter).not.toEqual(fakeResponseData.data.params.filters[0]);
            expect(sut.selectedFilter).toEqual("tab2");
        });

        it("Should assign data to scope", function () {
            spyOn(sut.event, 'onReloadWidgetDone');
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.data).toEqual(fakeResponseData.data.params.bars);
        });

        it("Should assign tickLabels to scope", function () {
            spyOn(sut.event, 'onReloadWidgetDone');
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.tickLabels).toEqual(fakeResponseData.data.params.axis.x);
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

        it("Should call _onReloadWidgetSuccess on base", function () {
            spyOn(sut.event, 'onReloadWidgetDone');
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut._onReloadWidgetSuccess).toHaveBeenCalled();
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
            }, {
                testCase: "data is not array", widgetData: {fields: {blah: 123456}}
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
                sut.data = [
                    {label: "pie1", data: 30},
                    {label: "pie4", data: 15},
                    {label: "pie3", data: 15},
                    {label: "pie2", data: 40}
                ];
                sut.element = {
                    find: function () {
                        return fakeElement;
                    }
                }
            });

            it("should call paintChart()", function () {
                sut.refreshChart();
                expect(sut.paintChart).toHaveBeenCalledWith(fakeElement);
            });
        });
    });
});