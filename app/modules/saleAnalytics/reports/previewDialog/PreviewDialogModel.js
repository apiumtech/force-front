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

    return PreviewDialogModel;
});