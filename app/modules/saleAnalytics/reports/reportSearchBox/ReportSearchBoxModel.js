define([
    'shared/services/ajax/AuthAjaxService',
    'modules/saleAnalytics/reports/ReportService'
], function (AjaxService, ReportService) {
    'use strict';

    function ReportSearchBoxModel(ajaxService, reportService) {
        this.authAjaxService = ajaxService || new AjaxService();
        this.reportService = reportService || new ReportService();
    }

    ReportSearchBoxModel.prototype.search = function(query){
        return this.reportService.searchReport(query);
    };

    return ReportSearchBoxModel;
});
