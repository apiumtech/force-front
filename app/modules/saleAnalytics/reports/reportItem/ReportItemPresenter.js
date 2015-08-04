define([
    'modules/saleAnalytics/reports/reportItem/ReportItemModel'
], function (ReportItemModel) {
    'use strict';

    function ReportItemPresenter(model) {
        this.model = model || new ReportItemModel();
    }

    ReportItemPresenter.prototype.show = function (view) {
        var self = this;
        self.view = view;

        view.event.onSaveName = function (report) {
            self.model.update(report)
                .then(view.onSaveNameSuccess.bind(view), view.onSaveNameError.bind(view));
        };

        view.event.onSaveDescription = function (report) {
            self.model.update(report)
                .then(view.onSaveDescriptionSuccess.bind(view), view.onSaveDescriptionError.bind(view));
        };

        view.event.toggleFavouriteReport = function(reportId){
            self.model.toggleFavouriteReport(reportId)
                .then(view.onToggledFavouriteReport.bind(view), view.showError.bind(view));
        };

        view.event.getParameterConfiguration = function(reportId, callback){
            self.model.getParameterConfiguration(reportId, callback);
        };

        view.event.getReportURL = function(report, callback, errorCallback){
            self.model.getReportURL(report).then(callback, errorCallback);
        }
    };

    return ReportItemPresenter;
});