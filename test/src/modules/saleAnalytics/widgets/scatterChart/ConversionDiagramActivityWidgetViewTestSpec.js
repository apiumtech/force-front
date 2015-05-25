/**
 * Created by justin on 2/2/15.
 */

define([
    'modules/saleAnalytics/widgets/scatterChart/ConversionDiagramActivityWidgetView'
], function (ConversionDiagramActivityWidgetView) {
    'use strict';
    describe("ConversionDiagramActivityWidgetView", function () {
        var sut, scope;

        function initSut() {
            scope = {
                $on: function () {
                },
                $watch: function () {
                }
            };
            sut = ConversionDiagramActivityWidgetView.newInstance(scope, {}, {}, {}, false, false);
        }

        describe("configureEvents", function () {
            beforeEach(initSut);

            [
                {method: 'assignWidget', exercise: assignWidgetTestExercise},
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
                data: {}
            };

            beforeEach(function () {
                sut = new ConversionDiagramActivityWidgetView(scope, {});
                sut.event = {};
                sut.event.onReloadWidgetDone = function () {
                };

                spyOn(sut, 'refreshChart');
                spyOn(sut, '_onReloadWidgetSuccess');
            });

            it("Should assign data to scope", function () {
                spyOn(sut.event, 'onReloadWidgetDone');
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.data).toEqual(fakeResponseData.data);
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
