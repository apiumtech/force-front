define([
    'modules/saleAnalytics/reports/ReportService'
], function (ReportService) {
    'use strict';

    function PreviewDialogModel(reportService) {
        this.reportService = reportService || new ReportService();
    }

    PreviewDialogModel.prototype.toggleFavouriteReport = function (reportId) {
        this.reportService.toggleFavouriteReport(reportId);
    };

    PreviewDialogModel.prototype.getReportURL = function(report, callback){
        this.reportService.getReportURL(report).then(callback);
    };

    return PreviewDialogModel;
});