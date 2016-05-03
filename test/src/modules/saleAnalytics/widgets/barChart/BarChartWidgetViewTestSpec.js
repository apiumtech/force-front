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

