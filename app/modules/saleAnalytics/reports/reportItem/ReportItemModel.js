define([
    'shared/services/ajax/AjaxService',
    'modules/saleAnalytics/reports/ReportService',
    'config'
], function (AjaxService, ReportService, Configuration) {
    'use strict';

    function ReportItemModel(ajaxService, reportService) {
        this.ajaxService = ajaxService || new AjaxService();
        this.reportService = reportService || new ReportService();
    }

    ReportItemModel.prototype.toggleFavouriteReport = function (reportId) {
        return this.reportService.toggleFavouriteReport(reportId);
    };

    ReportItemModel.prototype.update = function (report) {
        var self = this;
        var url = Configuration.api.updateReport.format(report.id);
        console.log("update report url",url);
        var params = {
            url: url,
            type: 'post',
            data: report,
            contentType: 'application/json',
            accept: 'application/json'
        };
        return self.ajaxService.rawAjaxRequest(params);
    };

    ReportItemModel.prototype.getParameterConfiguration = function (reportId, callback) {
        return this.reportService.getParameterConfiguration(reportId).then(callback);
    };

    ReportItemModel.prototype.getReportURL = function (report, callback) {
        return this.reportService.getReportURL(report).then(callback);
    };

    return ReportItemModel;
});