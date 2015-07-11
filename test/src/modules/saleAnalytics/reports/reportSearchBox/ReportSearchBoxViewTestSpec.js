define([
    'modules/saleAnalytics/reports/reportSearchBox/ReportSearchBoxView',
    'modules/saleAnalytics/reports/reportSearchBox/ReportSearchBoxPresenter',
    'modules/saleAnalytics/reports/ReportEventBus',
    'shared/services/AwaitHelper',
    'angular',
    'jquery'
], function (ReportSearchBoxView, ReportSearchBoxPresenter, ReportEventBus, AwaitHelper, angular, $) {
    'use strict';

    describe('ReportSearchBoxView Test', function () {

        var sut, presenter, scope, eventBus, awaitHelper, element;

        beforeEach(function () {
            inject(function ($rootScope) {
                scope = $rootScope.$new();
            });
            element = angular.element("<div/>");
            eventBus = mock(ReportEventBus);
            awaitHelper = mock(AwaitHelper);
            presenter = mock(ReportSearchBoxPresenter);
            sut = new ReportSearchBoxView(scope, element, presenter, eventBus, awaitHelper);
        });

        describe("construct", function () {
            it("should call configureEvents", function () {
                spyOn(ReportSearchBoxView.prototype, 'configureEvents').and.callThrough();
                new ReportSearchBoxView(scope, presenter, eventBus);
                expect(ReportSearchBoxView.prototype.configureEvents).toHaveBeenCalled();
            })
        });

        describe('configureEvents', function () {
            beforeEach(function () {
                sut.configureEvents();
            });

            describe('fn.searchQueryKeyUp', function () {

                beforeEach(function () {
                    sut.fn.activateSearch = sinon.stub();
                    sut.fn.search = sinon.stub();
                });

                describe('enter is pressed', function () {
                    it("should call fn.activateSearch", function () {
                        var event = {keyCode: 13};
                        sut.fn.searchQueryKeyUp(event);
                        expect(sut.fn.activateSearch).toHaveBeenCalled();
                    });
                });

                describe('an invalid key is pressed', function () {
                    beforeEach(function () {
                        var event = {keyCode: 3};
                        sut.fn.searchQueryKeyUp(event);
                    });
                    it("should not call fn.search", function () {
                        expect(sut.fn.search).not.toHaveBeenCalled();
                    });
                    it("should not call fn.activateSearch", function () {
                        expect(sut.fn.activateSearch).not.toHaveBeenCalled();
                    });
                });

                describe('a valid key is pressed', function () {
                    it("should call fn.search", function () {
                        var event = {keyCode: 48};
                        sut.fn.searchQueryKeyUp(event);
                        expect(sut.fn.search).toHaveBeenCalled();
                    });
                });

            });

            describe('fn.activateSearch', function () {
                describe('searchQuery is empty', function () {
                    beforeEach(function () {
                        sut.searchQuery = "";
                        sut.fn.activateSearch();
                    });
                    it("should not fire SearchActivated event to event bus", function () {
                        expect(sut.eventBus.fireSearchActivated).not.toHaveBeenCalled();
                    });
                });

                describe('searchQuery is not empty', function () {
                    beforeEach(function () {
                        sut.showSearchResult = true;
                        sut.searchQuery = "search query";
                        sut.fn.activateSearch();
                    });
                    it("should fire SearchActivated event to event bus", function () {
                        expect(sut.eventBus.fireSearchActivated).toHaveBeenCalledWith("search query");
                    });
                    it("should set showSearchResult to false", function () {
                        expect(sut.showSearchResult).toBeFalsy();
                    });
                    it("should set searchActivated to true", function () {
                        expect(sut.searchActivated).toBeTruthy();
                    });
                });

            });

            describe("fn.deactivateSearch", function () {
                beforeEach(function () {
                    sut.searchQuery = "hasValue";
                    spyOn(sut.eventBus, 'fireSearchDeactivated');
                    sut.showSearchResult = true;
                    sut.searchResultLoaded = true;
                    sut.searchActivated = true;
                    sut.fn.deactivateSearch();
                });
                it("should remove searchQuery value", function () {
                    expect(sut.searchQuery).toEqual("");
                });
                it("should fire SearchActivated event to event bus", function () {
                    expect(sut.eventBus.fireSearchDeactivated).toHaveBeenCalled();
                });
                it("should set showSearchResult to false", function () {
                    expect(sut.showSearchResult).toBeFalsy();
                });
                it("should set searchActivated to false", function () {
                    expect(sut.searchActivated).toBeFalsy();
                });
                it("should set searchResultLoaded to false", function () {
                    expect(sut.searchResultLoaded).toBeFalsy();
                });
            });

            describe('fn.search', function () {
                describe('searchQuery is longer than or equal to 3 characters', function () {
                    it("should call fn.__search", function () {
                        sut.fn.__search = sinon.stub();
                        sut.searchQuery = "long query";
                        spyOn(sut.awaitHelper, 'await');
                        sut.fn.search();
                        expect(sut.awaitHelper.await).toHaveBeenCalledWith(sut.fn.__search, 1000);
                    });
                });
                describe('searchQuery contains less than 3 characters', function () {
                    it("should not fire onSearch event", function () {
                        sut.event.onSearch = sinon.stub();
                        sut.searchQuery = "sq";
                        sut.fn.search();
                        expect(sut.event.onSearch).not.toHaveBeenCalled();
                    });
                });

                it("searchQuery is empty", function () {
                    it("should call fn.deactivateSearch", function () {
                        sut.fn.deactivateSearch = sinon.stub();
                        sut.searchQuery = "";
                        sut.fn.search();
                        expect(sut.fn.deactivateSearch).toHaveBeenCalled();
                    });
                });

            });

            describe('fn.__search', function () {
                it("should fire onSearch event", function () {
                    sut.event.onSearch = sinon.stub();
                    sut.searchQuery = "long query";
                    sut.fn.__search();
                    expect(sut.event.onSearch).toHaveBeenCalledWith("long query");
                });
            });

            describe('hideSearchBox', function () {
                var event;
                beforeEach(function () {
                    event = {};
                    sut.element = angular.element("<div class='search-box'><div class='inside-elem'>searchbox</div></div>");

                });

                describe('event\'s target is outside the element', function () {
                    beforeEach(function () {
                        sut.showSearchResult = true;
                        event.target = angular.element("<div class='outside-elem'></div>");
                        sut.hideSearchBox(event);
                    });
                    it("should set showSearchResult to false", function () {
                        expect(sut.showSearchResult).toBeFalsy();
                    });
                });

            });

            describe('onSearchResultLoaded', function () {
                var data = [{
                    "this": "is search result"
                }];
                beforeEach(function () {
                    sut.showSearchResult = false;
                    sut.reports = null;
                });

                it("should set searchResultLoaded to true", function () {
                    sut.onSearchResultLoaded(data);
                    expect(sut.searchResultLoaded).toBeTruthy();
                });

                it("should assign the returned data to sut.reports", function () {
                    sut.onSearchResultLoaded(data);
                    expect(sut.reports).toEqual([{
                        "this": "is search result"
                    }]);
                });

                describe('searchActivated is false', function () {
                    it("should set showSearchResult to true", function () {
                        sut.searchActivated = false;
                        sut.onSearchResultLoaded(data);
                        expect(sut.showSearchResult).toBeTruthy();
                    });
                    it("should set showSearchResult to false", function () {
                        sut.searchActivated = true;
                        sut.onSearchResultLoaded(data);
                        expect(sut.showSearchResult).toBeFalsy();
                    });
                });

            });


            describe('fn.openResult', function () {

                it("should set showSearchResult to false", function () {
                    sut.showSearchResult = true;
                    var report = {
                        Type: "folder",
                        Id: 10
                    };
                    sut.fn.openResult(report);
                    expect(sut.showSearchResult).toBeFalsy();
                });

                describe('a folder is clicked on', function () {
                    it("should fire event bus's fireFolderReportSelected", function () {
                        var report = {
                            Type: "folder",
                            Id: 10
                        };
                        sut.fn.openResult(report);
                        expect(sut.eventBus.fireFolderReportSelected).toHaveBeenCalledWith(10);

                    });
                });

                describe('a report is clicked on', function () {
                    it("should fire event bus's fireReportSelected", function () {
                        var report = {
                            Type: "report",
                            Id: 10
                        };
                        sut.fn.openResult(report);
                        expect(sut.eventBus.fireReportSelected).toHaveBeenCalledWith(10);

                    });
                });
            });

            describe('fn.showSearchResult', function () {
                describe('searchResultLoaded is true', function () {
                    it("should set showSearchResult to true", function () {
                        sut.searchResultLoaded = true;
                        sut.showSearchResult = false;
                        sut.fn.showSearchResult();
                        expect(sut.showSearchResult).toBeTruthy();
                    });
                });
                describe('searchResultLoaded is false', function () {
                    it("should not set value for showSearchResult", function () {
                        sut.searchResultLoaded = false;
                        sut.showSearchResult = false;
                        sut.fn.showSearchResult();
                        expect(sut.showSearchResult).toBeFalsy();
                    });
                });
            });

        });

    });
});