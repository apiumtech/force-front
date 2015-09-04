define([
    'shared/services/ajax/AuthAjaxService',
    'modules/saleAnalytics/reports/ReportService',
    'config'
], function (AjaxService, ReportService, Configuration) {
    'use strict';

    function ReportItemModel(ajaxService, reportService) {
        this.authAjaxService = ajaxService || new AjaxService();
        this.reportService = reportService || new ReportService();
    }

    ReportItemModel.prototype.toggleFavouriteReport = function (reportId) {
        return this.reportService.toggleFavouriteReport(reportId);
    };

    ReportItemModel.prototype.update = function (report) {
        var self = this;
        var url = Configuration.api.updateReport.format(report.id);

        var params = {
            url: url,
            type: 'post',
            data: report,
            contentType: 'application/json',
            accept: 'application/json'
        };
        return self.authAjaxService.rawAjaxRequest(params);
    };

    ReportItemModel.prototype.getParameterConfiguration = function (reportId, callback, failCallback) {
        return this.reportService.getParameterConfiguration(reportId).then(callback, failCallback);
    };

    ReportItemModel.prototype.getReportURL = function (report) {
        return this.reportService.getReportURL(report);
    };

    return ReportItemModel;
});