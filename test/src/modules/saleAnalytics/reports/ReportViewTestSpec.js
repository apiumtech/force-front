define([
    'modules/saleAnalytics/reports/ReportView',
    'modules/saleAnalytics/reports/ReportPresenter',
    'modules/saleAnalytics/reports/ReportEventBus'
], function (ReportView, ReportPresenter, ReportEventBus) {
    'use strict';

    describe('ReportView', function () {
        var sut, $scope,
            presenter = mock(ReportPresenter),
            eventBus = mock(ReportEventBus);

        describe('construct', function () {
            beforeEach(function () {
                sinon.stub(ReportView.prototype, 'configureEvents');
            });
            afterEach(function () {
                ReportView.prototype.configureEvents.restore();
            });
            it("should call configureEvents", function () {
                new ReportView({}, {});
                expect(ReportView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        beforeEach(function () {
            $scope = mockAngularScope();
            sut = new ReportView($scope, presenter, eventBus);
        });

        describe("show", function () {
            it("should call show on presenter", function () {
                sut.show();
                expect(presenter.show).toHaveBeenCalled();
            });
        });

        describe('configureEvents', function () {
            describe('fn.allReportSelected', function () {
                it("should fire event AllReportSelected to the eventbus if not opening folder", function () {
                    sut.openingFolder = true;
                    sut.fn.allReportSelected();
                    expect(eventBus.fireAllReportTabSelected).not.toHaveBeenCalled();
                });
                it("should fire event AllReportSelected to the eventbus", function () {
                    sut.openingFolder = false;
                    sut.fn.allReportSelected();
                    expect(eventBus.fireAllReportTabSelected).toHaveBeenCalled();
                });
            });
            describe('fn.favReportSelected', function () {
                beforeEach(function () {
                    sut.fn.favReportSelected();
                });
                it("should fire event FavReportSelected to the eventbus", function () {
                    expect(eventBus.fireFavReportTabSelected).toHaveBeenCalled();
                });
            });
            describe('fn.searchReportSelected', function () {
                beforeEach(function () {
                    sut.firstTabActivated = true;
                    sut.fn.searchReportSelected();
                });
                it("should display the search report tab", function () {
                    expect(sut.displaySearch).toBeTruthy();
                });
                it("should display the search report tab", function () {
                    expect(sut.firstTabActivated).toBeFalsy();
                });
                it("should fire event AllReportTabSelected to the eventbus", function () {
                    expect(eventBus.fireSearchReportTabSelected).toHaveBeenCalled();
                });
            });

            describe('fn.removeSearchTab', function () {
                it("should deactivate the search tab", function () {
                    sut.searchTabActivated = true;
                    sut.fn.removeSearchTab();
                    expect(sut.searchTabActivated).toBeFalsy();
                });
                it("should activate the first tab", function () {
                    sut.firstTabActivated = false;
                    sut.fn.removeSearchTab();
                    expect(sut.firstTabActivated).toBeTruthy();
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