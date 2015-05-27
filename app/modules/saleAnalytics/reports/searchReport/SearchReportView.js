define([
    'modules/saleAnalytics/reports/ReportTabBaseView',
    'modules/saleAnalytics/reports/searchReport/SearchReportPresenter'
], function (ReportTabBaseView, SearchReportPresenter) {
    'use strict';

    function SearchReportView($scope, $presenter) {
        ReportTabBaseView.call(this, $scope, $presenter);

        this.currentQueryString = "";
        this.configureEvents();
    }

    SearchReportView.prototype = Object.create(ReportTabBaseView.prototype, {});

    SearchReportView.prototype.configureEvents = function () {
        var self = this;

        self.fn.loadReports = function (queryString) {
            self.isLoading = true;
            self.event.onLoadReports(queryString || "");
        };

        self.reportEventBus.onSearchReportTabSelected(self.startSearching.bind(self));
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