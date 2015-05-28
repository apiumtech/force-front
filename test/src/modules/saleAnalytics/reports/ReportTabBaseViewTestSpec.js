define([
    'modules/saleAnalytics/reports/ReportTabBaseView'
], function (ReportTabBaseView) {
    'use strict';

    describe('ReportTabBaseView', function () {

        var sut, $scope;

        beforeEach(function () {
            $scope = mockAngularScope();
            sut = new ReportTabBaseView($scope);
            sut.event = {
                onReloadWidgetSuccess: function () {
                }
            };
        });

        describe('construct', function () {
            beforeEach(function () {
                sinon.stub(ReportTabBaseView.prototype, 'configureEvents');
            });
            afterEach(function () {
                ReportTabBaseView.prototype.configureEvents.restore();
            });
            it("should call configureEvents", function () {
                new ReportTabBaseView($scope,{},{});
                expect(ReportTabBaseView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        describe("configureEvents", function () {
            [
            ].forEach(function (testCase) {
                    var method = testCase.method,
                        exercise = testCase.exercise;

                    if (exercise)
                        describe("calling fn." + method, function () {
                            beforeEach(function () {
                                spyOn(sut, 'refreshChart');
                            });

                            exercise();
                        });
                });
        })

        describe("onReloadWidgetSuccess", function () {
            var data = {
                "data": "test"
            };
            it("Should assign data to scope", function () {
                spyOn(sut.event, 'onReloadWidgetSuccess');
                sut.onReloadWidgetSuccess(data);
                expect(sut.reports).toEqual(data);
            });
        });
    });
});