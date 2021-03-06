define([
    'shared/BaseView',
    'modules/saleAnalytics/reports/reportSearchBox/ReportSearchBoxPresenter',
    'modules/saleAnalytics/reports/ReportEventBus',
    'shared/services/AwaitHelper',
    'jquery',
    'moment'
], function (BaseView, ReportSearchBoxPresenter, ReportEventBus, AwaitHelper, $, moment) {
    'use strict';

    function ReportSearchBoxView($scope, $element, presenter, eventBus, awaitHelper) {
        presenter = presenter || new ReportSearchBoxPresenter();
        BaseView.call(this, $scope, null, presenter);
        this.eventBus = eventBus || ReportEventBus.getInstance();
        this.awaitHelper = awaitHelper || AwaitHelper.newInstance();
        this.element = $element;
        this.configureEvents();
    }

    ReportSearchBoxView.inherits(BaseView, {
        showSearchResult: {
            get: function () {
                return this.$scope.data.showSearchResult;
            },
            set: function (value) {
                this.$scope.data.showSearchResult = value;
            }
        },
        isLoading: {
            get: function () {
                return this.$scope.data.isLoading;
            },
            set: function (value) {
                this.$scope.data.isLoading = value;
            }
        },
        searchQuery: {
            get: function () {
                return this.$scope.searchQuery;
            },
            set: function (value) {
                this.$scope.searchQuery = value;
            }
        },
        reports: {
            get: function () {
                return this.$scope.reports;
            },
            set: function (value) {
                this.$scope.reports = value;
            }
        }
    });

    ReportSearchBoxView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;

        self.fn.searchQueryKeyUp = function ($event) {
            if(!self.isValidKey($event)) return;
            ($event.keyCode == 13) ? self.fn.activateSearch() : self.fn.search();
        };

        self.fn.search = function () {

            var searchQuery = self.searchQuery || "";

            if (searchQuery.length == 0) {
                self.fn.deactivateSearch();
            }
            else if (searchQuery.length >= 3) {
                self.awaitHelper.await(self.fn.__search, 1000);
            }

        };

        self.fn.__search = function(){
            self.isLoading = true;
            self.event.onSearch(self.searchQuery);
            scope.$apply();
        };

        self.fn.deactivateSearch = function () {
            self.searchQuery = "";
            self.showSearchResult = false;
            self.searchResultLoaded = false;
            self.searchActivated = false;
            self.eventBus.fireSearchDeactivated();
        };

        self.fn.activateSearch = function () {
            if (!self.searchQuery) return;
            self.showSearchResult = false;
            self.searchActivated = true;
            self.eventBus.fireSearchActivated(self.searchQuery);
        };

        self.fn.openResult = function(report){
            var id = report.Id;
            self.showSearchResult = false;
            if(report.Type==='folder') {
                self.eventBus.fireFolderReportSelected(id);
            }
            else{
                self.eventBus.fireReportSelected(id);
            }
        };

        self.fn.showSearchResult = function(){
            if(self.searchResultLoaded) {
                self.showSearchResult = true;
            }
        };

        self.fn.timestampToDateString = function(timestamp) {
            var currentLocale = moment.localeData();
            return moment(timestamp)
                    .format(currentLocale.longDateFormat('L'));
        };

        $(document).bind('click', self.hideSearchBox.bind(self));

    };

    ReportSearchBoxView.prototype.hideSearchBox = function(event){
        var self = this;
        var scope = self.$scope;
        if(self.element.find(event.target).length <= 0){
            self.showSearchResult = false;
            scope.$apply();
        }
    };

    ReportSearchBoxView.prototype.onSearchResultLoaded = function (result) {
        var self = this;
        self.isLoading = false;
        self.reports = result;
        self.searchResultLoaded = true;
        if(!self.searchActivated)
        self.showSearchResult = true;
    };

    ReportSearchBoxView.newInstance = function ($scope, $element, viewRepaintAspect, logErrorAspect) {
        var view = new ReportSearchBoxView($scope, $element);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return ReportSearchBoxView;
});