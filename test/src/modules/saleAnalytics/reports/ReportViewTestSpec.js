define([
    'modules/saleAnalytics/reports/ReportView'
], function (ReportView) {
    'use strict';

    describe('ReportView', function () {
        var sut, $scope, presenter;

        describe('construct', function () {
            it("should call configureEvents", function () {
                spyOn(ReportView.prototype, 'configureEvents').and.callThrough();
                new ReportView({}, {});
                expect(ReportView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        beforeEach(function () {
            $scope = {
                $on: function () {
                },
                $watch: function () {
                }
            };
            presenter = {
                show: function () {
                }
            };

            sut = new ReportView($scope, presenter);
        });


        describe('configureEvents', function () {
            beforeEach(function () {
                spyOn(sut.reportEventBus, 'fireAllReportTabSelected');
                spyOn(sut.reportEventBus, 'fireFavReportTabSelected');
                spyOn(sut.reportEventBus, 'fireSearchReportTabSelected');
            });
            describe('fn.allReportSelected', function () {
                it("should fire event AllReportSelected to the eventbus", function () {
                    sut.fn.allReportSelected();
                    expect(sut.reportEventBus.fireAllReportTabSelected).toHaveBeenCalled();
                });
            });
            describe('fn.favReportSelected', function () {
                it("should fire event FavReportSelected to the eventbus", function () {
                    sut.fn.favReportSelected();
                    expect(sut.reportEventBus.fireFavReportTabSelected).toHaveBeenCalled();
                });
            });
            describe('fn.searchReportSelected', function () {

            });
        });
    });


});