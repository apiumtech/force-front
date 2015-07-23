define([
    'modules/saleAnalytics/reports/ReportTabBaseView',
    'modules/saleAnalytics/reports/searchReport/SearchReportPresenter',
    'shared/services/AwaitHelper'
], function (ReportTabBaseView, SearchReportPresenter, AwaitHelper) {
    'use strict';

    function SearchReportView($scope, $presenter) {
        ReportTabBaseView.call(this, $scope, $presenter);
        this.awaitHelper = AwaitHelper.getInstance();
        this.configureEvents();
    }

    SearchReportView.inherits(ReportTabBaseView, {
        currentQueryString: {
            get: function () {
                return this.$scope.data.currentQueryString || (this.$scope.data.currentQueryString = "");
            },
            set: function (value) {
                this.$scope.data.currentQueryString = value;
            }
        }
    });

    SearchReportView.prototype.configureEvents = function () {
        this.__base__.configureEvents.call(this);
        var self = this;

        self.fn.loadReports = function (queryString) {
            self.isLoading = true;
            self.event.onLoadReports(queryString || "");
        };

        self.fn.delaySearch = function (searchQuery) {
            self.awaitHelper.await(self.startSearching.bind(self, searchQuery), 10);
        };

        self.reportEventBus.onSearchReportTabSelected(self.fn.delaySearch);
    };

    SearchReportView.prototype.startSearching = function (queryString) {
        var self = this;
        self.currentQueryString = queryString || self.currentQueryString;
        self.fn.loadReports(self.currentQueryString);
    };

    SearchReportView.prototype.onReportsLoaded = function (reports) {
        this.reports = reports;
        this.isLoading = false;
    };

    SearchReportView.prototype.showError = function (error) {
        console.error(error);
    };

    SearchReportView.newInstance = function ($scope, $presenter, viewRepaintAspect, logErrorAspect) {
        $presenter = $presenter || new SearchReportPresenter();
        var view = new SearchReportView($scope, $presenter);

        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return SearchReportView;
});