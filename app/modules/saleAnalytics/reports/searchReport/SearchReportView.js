define([
    'modules/saleAnalytics/reports/ReportTabBaseView',
    'modules/saleAnalytics/reports/searchReport/SearchReportPresenter'
], function (ReportTabBaseView, SearchReportPresenter) {
    'use strict';

    function SearchReportView($scope, $presenter) {
        ReportTabBaseView.call(this, $scope, $presenter);
        this.configureEvents();
    }

    SearchReportView.prototype = Object.create(ReportTabBaseView.prototype, {});

    SearchReportView.prototype.configureEvents = function () {
        var self = this;

        self.fn.loadReports = function (queryString) {
            self.event.onLoadReports(queryString || "");
        };

        self.reportEventBus.onSearchReportTabSelected(self.startSearching.bind(self));
    };

    SearchReportView.prototype.startSearching = function (queryString) {
        var self = this;
        console.log(self.event);
        self.fn.loadReports(queryString);
    };

    SearchReportView.newInstance = function ($scope, $presenter, viewRepaintAspect, logErrorAspect) {
        $presenter = $presenter || new SearchReportPresenter();
        var view = new SearchReportView($scope, $presenter);

        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return SearchReportView;
});