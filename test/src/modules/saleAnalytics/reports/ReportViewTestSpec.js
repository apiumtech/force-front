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
                beforeEach(function () {
                    sut.fn.allReportSelected();
                });
                it("should fire event AllReportSelected to the eventbus", function () {
                    expect(sut.reportEventBus.fireAllReportTabSelected).toHaveBeenCalled();
                });
            });
            describe('fn.favReportSelected', function () {
                beforeEach(function () {
                    sut.fn.favReportSelected();
                });
                it("should fire event FavReportSelected to the eventbus", function () {
                    expect(sut.reportEventBus.fireFavReportTabSelected).toHaveBeenCalled();
                });
            });
            describe('fn.searchReportSelected', function () {
                beforeEach(function () {
                    sut.fn.searchReportSelected();

                });
                it("should display the search report tab", function () {
                    expect(sut.displaySearch).toBeTruthy();
                });
                it("should fire event AllReportTabSelected to the eventbus", function () {
                    expect(sut.reportEventBus.fireSearchReportTabSelected).toHaveBeenCalled();
                });
            });

            describe('fn.removeSearchTab', function () {
                it("should deactivate the search tab", function () {
                    sut.searchTabActivated = true;
                    sut.fn.removeSearchTab();
                    expect(sut.searchTabActivated).toBeFalsy();
                });

                it("should hide the search tab ", function () {
                    sut.displaySearch = true;
                    sut.fn.removeSearchTab();
                    expect(sut.displaySearch).toBeFalsy();
                });

            });
        });
    });


});