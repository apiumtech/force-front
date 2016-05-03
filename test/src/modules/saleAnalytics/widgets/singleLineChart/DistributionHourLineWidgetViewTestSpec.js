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
                {method: 'changeFilter', test: changeFilterTestExercise}
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

                it("should fire onTabChanged event", function () {
                    exerciseChangeTab();
                    expect(sut.event.onFilterChanged).toHaveBeenCalled();
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

                spyOn(sut, 'paintChart');
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
