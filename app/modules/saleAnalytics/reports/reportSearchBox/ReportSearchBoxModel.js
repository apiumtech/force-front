define([
    'shared/services/ajax/AjaxService',
    'modules/saleAnalytics/reports/ReportService'
], function (AjaxService, ReportService) {
    'use strict';

    function ReportSearchBoxModel(ajaxService, reportService) {
        this.ajaxService = ajaxService || new AjaxService();
        this.reportService = reportService || new ReportService();
    }

    ReportSearchBoxModel.prototype.search = function(query){
        return this.reportService.searchReport(query);
    };

    return ReportSearchBoxModel;
});
