/**
 * Created by justin on 1/26/15.
 */

define([
    'angular',
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetView',
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetPresenter'
], function (angular, BarChartWidgetView, BarChartPresenter) {
    'use strict';
    describe("BarChartWidgetView", function () {

        var sut, scope, presenter;

        beforeEach(inject(function (_$rootScope_) {
            scope = _$rootScope_.$new();
            presenter = mock(BarChartPresenter);
            var element = angular.element("<div />");
            sut = new BarChartWidgetView(scope, element, presenter);
        }));

        describe('construct', function () {
            it("should call configureEvents", function () {
                spyOn(BarChartWidgetView.prototype, 'configureEvents').and.callThrough();
                new BarChartWidgetView(scope);
                expect(BarChartWidgetView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        describe("configureEvents", function () {
            [
                {method: 'assignWidget', exercise: assignWidgetTestExercise},
                {method: 'changeFilter', exercise: changeTabTestExercise}
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
                                spyOn(sut, 'paintChart');
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

        });

        describe("onReloadWidgetSuccess", function () {
            var fakeResponseData = {
                data: {
                    widgetType: "bar",
                    params: {
                        filters: [{
                            name: "filter1",
                            key: "filter1"
                        },{
                            name: "filter2",
                            key:"filter2"
                        }],
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
                sut.event.onReloadWidgetDone=function(){};
                sut.paintChart = jasmine.createSpy();
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
                expect(sut.selectedFilter).toEqual(fakeResponseData.data.params.filters[0].key);
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

            it("should call paintChart method", function () {
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.paintChart).toHaveBeenCalled();
            });

            it("Should call _onReloadWidgetSuccess on base", function () {
                spyOn(sut.event, 'onReloadWidgetDone');
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut._onReloadWidgetSuccess).toHaveBeenCalled();
            });
        });

    });

});

