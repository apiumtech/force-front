define([
    'modules/saleAnalytics/reports/allReport/AllReportView',
    'modules/saleAnalytics/reports/allReport/AllReportPresenter'
], function (AllReportView, AllReportPresenter) {
    'use strict';

    describe('AllReportView', function () {
        var sut, scope, presenter;
        describe('construct', function () {
            it("should call configureEvents", function () {
                spyOn(AllReportView.prototype, 'configureEvents').and.callThrough();
                new AllReportView({}, {});
                expect(AllReportView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        beforeEach(function () {
            scope = {};
            presenter = jasmineMock(AllReportPresenter);
            sut = new AllReportView({}, presenter);
        });

        describe("configureEvents", function () {
            describe("fn.loadReports", function () {
                beforeEach(function () {
                    sut.event.onLoadReports = jasmine.createSpy();
                    sut.fn.loadReports();
                });
                it("should turn on isLoading", function () {
                    expect(sut.isLoading).toBeTruthy();
                });
                it("should fire onLoadReports event", function () {
                    expect(sut.event.onLoadReports).toHaveBeenCalled();
                });
            });

        });

        describe('onReportsLoaded', function () {
            var data;
            beforeEach(function () {
                data = [{
                    alist: {
                        of: {
                            stupid: [
                                {reports: 10}
                            ]
                        }
                    }
                }];
                sut.isLoading = true;
                sut.onReportsLoaded(data);
            });
            it("should turn off isLoading", function () {
                expect(sut.isLoading).toBeFalsy();
            });

            it("should assign data to reports", function () {
                expect(sut.reports).toEqual(data);
            });
        });
    });
});