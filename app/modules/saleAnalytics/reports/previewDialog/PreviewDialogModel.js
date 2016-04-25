define([
    'modules/saleAnalytics/reports/ReportService',
    'q'
], function (ReportService, Q) {
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
        return this.reportService
                .loadTablePreview(report)
                .then(function(data) {
                    data = data.data;
                    if (data[0].hasOwnProperty('Properties')) {
                        data = data.map(function (item) {
                            return item.Properties;
                        });
                    }
                    return data;
                })
                .catch(function(err){
                    return err;
                });
    };

    return PreviewDialogModel;
});