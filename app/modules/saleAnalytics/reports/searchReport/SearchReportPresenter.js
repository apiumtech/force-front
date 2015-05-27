define([
    'modules/saleAnalytics/reports/searchReport/SearchReportModel'
], function (SearchReportModel) {
    'use strict';

    function SearchReportPresenter(model) {
        this.model = model || new SearchReportModel();
    }

    SearchReportPresenter.prototype.show = function (view) {
        this.view = view;
        var self = this;

        view.event.onLoadReports = function (queryString) {
            self.model._getReports(queryString)
                .then(view.onReportsLoaded.bind(view), view.showError.bind(view));
        }
    };

    SearchReportPresenter.prototype.searchTabSelected = function () {

    };


    return SearchReportPresenter;
});