/**
 * Created by justin on 2/2/15.
 */

define([
    'angular',
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetView',
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetPresenter',
    'shared/services/GoogleChartService'
], function (angular, ScatterChartWidgetView, ScatterChartWidgetPresenter, GoogleChartService) {
    'use strict';
    describe("ScatterChartWidgetView", function () {
        var sut, scope, presenter, element, chartService;

        beforeEach(inject(function(_$rootScope_){
            scope = _$rootScope_.$new();
            presenter = mock(ScatterChartWidgetPresenter);
            chartService = mock(GoogleChartService);
            element = angular.element("<div />");
            sut = new ScatterChartWidgetView(scope, element, chartService, presenter);
        }));

        describe('construct', function () {
            beforeEach(function () {
                sinon.stub(ScatterChartWidgetView.prototype, 'configureEvents');
            });
            afterEach(function () {
                ScatterChartWidgetView.prototype.configureEvents.restore();
            });

            it("should call configureEvents", function () {
                new ScatterChartWidgetView(scope, element, chartService);
                expect(ScatterChartWidgetView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        describe("configureEvents", function () {
            [
                {method: 'assignWidget', test: assignWidgetTestExercise},
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

            function refreshChartTestExercise() {
                it("should call funciton refresh chart", function () {
                    spyOn(sut, 'refreshChart');
                    sut.fn.refreshChart();
                    expect(sut.refreshChart).toHaveBeenCalled();
                });
            }

        });

        describe("onReloadWidgetSuccess", function () {
            var fakeResponseData = {
                data: {}
            };

            beforeEach(function () {
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
