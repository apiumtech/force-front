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
                it("should fire onLoadReports event", function () {
                    sut.event.onLoadReports = jasmine.createSpy();
                    sut.fn.loadReports();
                    expect(sut.event.onLoadReports).toHaveBeenCalled();
                });
            });

            describe("fn.activeSearch", function () {
                it("should fire searchTabSelected event to event bus", function () {
                    spyOn(sut.reportEventBus, 'fireSearchReportTabSelected');
                    sut.searchQuery = "search_string";
                    sut.fn.activeSearch();
                    expect(sut.reportEventBus.fireSearchReportTabSelected).toHaveBeenCalledWith(sut.searchQuery);
                });
            });
        });
    });
});