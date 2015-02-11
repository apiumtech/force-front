/**
 * Created by justin on 2/11/15.
 */

describe("MapChartWidgetView", function () {
    var MapChartWidgetView = app.getView('views/MapChartWidgetView');
    var sut;

    function initSut() {
        sut = MapChartWidgetView.newInstance({}, {}, {}, {}, false, false).getOrElse(throwInstantiateException(MapChartWidgetView));
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
                params: {
                    params: [
                        {label: "pie1", data: 30},
                        {label: "pie4", data: 15},
                        {label: "pie3", data: 15},
                        {label: "pie2", data: 40}
                    ]
                }
            }
        };

        function instantiateSut() {
            sut = new MapChartWidgetView({}, {});
            sut.event = {};
            sut.event.onReloadWidgetDone = function () {
            };

            spyOn(sut, 'refreshChart');
            sut.$scope.apply = function () {
            };
        }

        it("Should assign data to scope", function () {
            instantiateSut();
            spyOn(sut.event, 'onReloadWidgetDone');
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.data).toEqual(fakeResponseData.data.params.params);
        });

        it("should call refreshChart method", function () {
            instantiateSut();
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.refreshChart).toHaveBeenCalled();
        });

        it("Should fire done reload widget event", function () {
            instantiateSut();
            spyOn(sut.event, 'onReloadWidgetDone');
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.event.onReloadWidgetDone).toHaveBeenCalledWith();
        });
    });

    describe("refreshChart", function () {
        beforeEach(initSut);

        beforeEach(function () {
            sut.element = {
                find: function(){}
            };
        });

        it("should call paintChart()", function () {
            spyOn(sut, 'paintChart');
            var fakeElement = {};
            spyOn(sut.element, 'find').and.returnValue(fakeElement);
            sut.refreshChart();
            expect(sut.paintChart).toHaveBeenCalledWith(fakeElement);
        });
    });
});