define([
    'modules/saleAnalytics/reports/ReportService'
], function (ReportService) {
    'use strict';

    function PreviewDialogModel(reportService) {
        this.reportService = reportService || new ReportService();
    }

    PreviewDialogModel.prototype.toggleFavouriteReport = function (reportId) {
        return this.reportService.toggleFavouriteReport(reportId);
    };

    PreviewDialogModel.prototype.getReportURL = function(report){
        return this.reportService.getReportURL(report);
    };

    PreviewDialogModel.prototype.loadPreviewImage = function(report){
        return this.reportService.loadPreviewImage(report);
    };

    PreviewDialogModel.prototype.loadTablePreview = function(report){
        return this.reportService.loadTablePreview(report);
    };

    return PreviewDialogModel;
});