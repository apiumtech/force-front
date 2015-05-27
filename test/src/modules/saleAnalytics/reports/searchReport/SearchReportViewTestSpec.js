define([
    'modules/saleAnalytics/reports/searchReport/SearchReportView',
    'modules/saleAnalytics/reports/searchReport/SearchReportPresenter',
    'modules/saleAnalytics/reports/ReportEventBus'
], function (SearchReportView, SearchReportPresenter, ReportEventBus) {
    'use strict';

    describe('SearchReportView', function () {
        var reportEventBus = ReportEventBus.getInstance();
        var sut, scope, presenter;
        describe('construct', function () {
            it("should call configureEvents", function () {
                spyOn(SearchReportView.prototype, 'configureEvents').and.callThrough();
                new SearchReportView({}, {});
                expect(SearchReportView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        beforeEach(function () {
            scope = {};
            presenter = jasmineMock(SearchReportPresenter);
            sut = new SearchReportView({}, presenter);
            sut.event = {};
            sut.event.onLoadReports = jasmine.createSpy();
        });

        describe("configureEvents", function () {
            describe("fn.loadReports", function () {
                it("should fire onLoadReports event", function () {
                    sut.fn.loadReports();
                    expect(sut.event.onLoadReports).toHaveBeenCalledWith("");
                });
                it("should fire onLoadReports event with argument", function () {
                    sut.fn.loadReports("some_query");
                    expect(sut.event.onLoadReports).toHaveBeenCalledWith("some_query");
                });
            });
        });

        describe("startSearching", function () {
            it("should call loadReports", function () {
                spyOn(sut.fn, 'loadReports');
                sut.startSearching();
                expect(sut.fn.loadReports).toHaveBeenCalled();
            });
        });
    });
});