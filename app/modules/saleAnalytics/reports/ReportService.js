define([
    'shared/services/ajax/AuthAjaxService',
    'modules/saleAnalytics/reports/ReportFakeData',
    'config',
    'shared/services/ajax/CQRSUnwrapper'
], function (AjaxService, ReportFakeData, Configuration, CQRSUnwrapper) {
    'use strict';

    function ReportService(ajaxService) {
        this.authAjaxService = ajaxService || new AjaxService();
    }

    ReportService.inherits(Object, {});

    ReportService.prototype.toggleFavouriteReport = function (reportId) {

        var url = Configuration.api.toggleFavouriteReport.format(reportId);

        var params = {
            url: url,
            type: 'put',
            contentType: 'application/json',
            dataType: 'json'
        };

        return this.authAjaxService.rawAjaxRequest(params);

    };

    ReportService.prototype.getReportURL = function (report) {
        var self = this;
        var url = Configuration.api.getReportUrl.format(report.Id);

        var params = {
            url: url,
            type: 'post',
            data: report.params,
            contentType: 'application/json',
            dataType: 'json'
        };
        return self.authAjaxService.rawAjaxRequest(params);
    };

    ReportService.prototype.getParameterConfiguration = function (reportId) {
        var url = Configuration.api.getReportParameters.format(reportId);

        var params = {
            url: url,
            type: 'get',
            contentType: 'application/json',
            dataType: 'json'
        };

        return CQRSUnwrapper.unwrapData(this.authAjaxService.rawAjaxRequest(params));
    };

    ReportService.prototype.loadPreviewImage = function (report) {
        var url = Configuration.api.previewReport.format(report.Id);

        var params = {
            url: url,
            type: 'post',
            data: report.params,
            contentType: 'application/json',
            dataType: 'json'
        };

        return this.authAjaxService.rawAjaxRequest(params);
    };

    ReportService.prototype.searchReport = function(query){
        var url = Configuration.api.searchReport.format(query);

        var params = {
            url: url,
            type: 'get',
            contentType: 'application/json',
            dataType: 'json'
        };

        return CQRSUnwrapper.unwrapData( this.authAjaxService.rawAjaxRequest(params) );//.then(this.decorateServerData.bind(this));
    };

    ReportService.prototype.getReportListOfValues = function(list){
        var url = Configuration.api.getReportListOfValues.format(list);

        var params = {
            url: url,
            type: 'get',
            contentType: 'application/json',
            dataType: 'json'
        };

        return this.authAjaxService.rawAjaxRequest(params);
    };

    ReportService.prototype.decorateServerData = function (serverData) {
        return serverData;
    };

    return ReportService;
});