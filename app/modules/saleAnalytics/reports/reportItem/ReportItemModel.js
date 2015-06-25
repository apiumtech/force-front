define([
    'shared/services/ajax/FakeAjaxService',
    'modules/saleAnalytics/reports/ReportService'
], function (AjaxService, ReportService) {
    'use strict';

    function ReportItemModel(ajaxService, reportService) {
        this.ajaxService = ajaxService || new AjaxService();
        this.reportService = reportService || new ReportService();
    }

    ReportItemModel.prototype.toggleFavouriteReport = function (reportId) {
        return this.reportService.toggleFavouriteReport(reportId);
    };

    ReportItemModel.prototype.saveName = function (id, newName) {
        return this.ajaxService.rawAjaxRequest({
            result: {
                name: newName,
                id: id
            }
        });
    };

    ReportItemModel.prototype.saveDescription = function (id, newDescription) {
        return this.ajaxService.rawAjaxRequest({
            result: {
                description: newDescription,
                id: id
            }
        });
    };

    ReportItemModel.prototype.getParameterConfiguration = function (reportId, callback) {
        return this.reportService.getParameterConfiguration(reportId).then(callback);
    };

    ReportItemModel.prototype.getReportURL = function (report, callback) {
        return this.reportService.getReportURL(report).then(callback);
    };

    return ReportItemModel;
});