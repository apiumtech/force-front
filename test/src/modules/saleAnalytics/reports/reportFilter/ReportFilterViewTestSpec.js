define([
    'modules/saleAnalytics/reports/reportFilter/ReportFilterView',
    'modules/saleAnalytics/reports/reportFilter/ReportFilterPresenter'
], function (ReportFilterView, ReportFilterPresenter) {
    'use strict';

    describe('ReportFilterView', function () {
        var sut, scope, presenter;
        describe('construct', function () {
            it("should call configureEvents", function () {
                spyOn(ReportFilterView.prototype, 'configureEvents').and.callThrough();
                new ReportFilterView({}, {});
                expect(ReportFilterView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        beforeEach(function () {
            scope = {};
            presenter = mock(ReportFilterPresenter);
            sut = new ReportFilterView({}, presenter);
        });

        describe("configureEvents", function () {

            describe("fn.activateSearch", function () {
                it("should fire SearchActivated event to event bus", function () {
                    spyOn(sut.reportEventBus, 'fireSearchActivated');
                    sut.searchQuery = "search_string";
                    sut.fn.activateSearch();
                    expect(sut.reportEventBus.fireSearchActivated).toHaveBeenCalledWith(sut.searchQuery);
                });
            });

            describe("fn.deactivateSearch", function () {
                beforeEach(function () {
                    sut.searchQuery = "hasValue";
                    spyOn(sut.reportEventBus, 'fireSearchDeactivated');
                    sut.fn.deactivateSearch();
                });
                it("should remove searchQuery value", function () {
                    expect(sut.searchQuery).toEqual("");
                });
                it("should fire SearchActivated event to event bus", function () {
                    expect(sut.reportEventBus.fireSearchDeactivated).toHaveBeenCalled();
                });
            });

            describe("fn.searchQueryKeyUp", function () {
                describe('searchQuery is empty', function () {
                    it("should fire fn.deactivateSearch", function () {
                        spyOn(sut.fn, 'deactivateSearch');
                        sut.searchQuery = "";
                        sut.fn.searchQueryKeyUp({keyCode: 3});
                        expect(sut.fn.deactivateSearch).toHaveBeenCalled();
                    });
                });

                describe('searchQuery is not empty', function () {
                    it("should not fire fn.deactivateSearch", function () {
                        spyOn(sut.fn, 'deactivateSearch');
                        sut.searchQuery = "not-an-empty-query";
                        sut.fn.searchQueryKeyUp({keyCode: 3});
                        expect(sut.fn.deactivateSearch).not.toHaveBeenCalled();
                    });

                    it("should fire fn.activateSearch when press enter", function () {
                        spyOn(sut.fn, 'activateSearch');
                        sut.searchQuery = "not-an-empty-query";
                        sut.fn.searchQueryKeyUp({keyCode: 13});
                        expect(sut.fn.activateSearch).toHaveBeenCalled();
                    });
                });
            });

        });

    });
});