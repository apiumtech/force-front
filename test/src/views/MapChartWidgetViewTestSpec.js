/**
 * Created by justin on 2/11/15.
 */

describe("MapChartWidgetView", function () {
    var MapChartWidgetView = app.getView('views/MapChartWidgetView');
    var sut, scope;

    function initSut() {
        scope = {
            $on: function(){},
            $watch: function(){}
        };
        sut = MapChartWidgetView.newInstance(scope, {}, {}, {}, false, false).getOrElse(throwInstantiateException(MapChartWidgetView));
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
        var element, mapChart;
        beforeEach(function () {
            element = {};
            mapChart = {
                clearHeatMap: jasmine.createSpy(),
                clearPointMap: jasmine.createSpy(),
                applyHeatLayer: jasmine.createSpy(),
                createUserMap: jasmine.createSpy(),
                createPointMap: jasmine.createSpy()
            };
            sut = MapChartWidgetView.newInstance(scope, element, mapChart, {}, {}, false, false).getOrElse(throwInstantiateException(MapChartWidgetView));

            sut.element = {
                find: function () {
                }
            };

        });

        it("should call paintChart()", function () {
            spyOn(sut, 'paintChart');
            var fakeElement = {};
            spyOn(sut.element, 'find').and.returnValue(fakeElement);
            sut.refreshChart();
            expect(sut.paintChart).toHaveBeenCalledWith(fakeElement);
        });

        it("should call clearHeatMap and clearPointMap from mapchart()", function () {
            spyOn(sut, 'paintChart');
            var fakeElement = {};
            sut.refreshChart();
            expect(mapChart.clearHeatMap).toHaveBeenCalled();
            expect(mapChart.clearPointMap).toHaveBeenCalled();
        });

        [
            {selectedFilter: "checkins", method: "applyHeatLayer"},
            {selectedFilter: "users", method: "createUserMap"},
            {selectedFilter: "activity", method: "createPointMap"}
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
});