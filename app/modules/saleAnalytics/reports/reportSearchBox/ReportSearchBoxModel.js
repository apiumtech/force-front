define([
    'shared/services/ajax/AuthAjaxService',
    'modules/saleAnalytics/reports/ReportService',
    'q'
], function (AjaxService, ReportService, Q) {
    'use strict';

    function ReportSearchBoxModel(ajaxService, reportService) {
        this.authAjaxService = ajaxService || new AjaxService();
        this.reportService = reportService || new ReportService();
    }

    ReportSearchBoxModel.prototype.search = function(query){
      //return this.reportService.searchReport(query);
      return Q.fcall(function () {
          return [];
      });
    };

    return ReportSearchBoxModel;
});
