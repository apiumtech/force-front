define([
    'modules/saleAnalytics/reports/allReport/AllReportModel'
], function (AllReportModel) {
    'use strict';

    function AllReportPresenter(model) {
        this.model = model || new AllReportModel();
    }

    AllReportPresenter.prototype.show = function (view) {
        var self = this;
        this.view = view;

        view.event.onLoadReports = function () {
            self.model._getReports()
                .then(view.onReportsLoaded.bind(view), view.showError.bind(view));
        }
    };


    return AllReportPresenter;
});