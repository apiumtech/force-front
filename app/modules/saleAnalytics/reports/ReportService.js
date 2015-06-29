define([
    'shared/services/ajax/AjaxService',
    'modules/saleAnalytics/reports/ReportFakeData',
    'config'
], function (AjaxService, ReportFakeData, Configuration) {
    'use strict';

    function ReportService(ajaxService) {
        this.ajaxService = ajaxService || new AjaxService();
    }

    ReportService.inherits(Object, {});

    ReportService.prototype.toggleFavouriteReport = function (reportId) {

        var url = Configuration.api.toggleFavouriteReport.format(reportId);
        console.log("toggle fav report url",url);
        var params = {
            url: url,
            type: 'put',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params);

    };

    ReportService.prototype.getReportURL = function (report) {
        var self = this;
        var url = Configuration.api.getReportUrl.format(report.id);
        console.log("get report url url",url, report.params);
        var params = {
            url: url,
            type: 'post',
            data: report.params,
            contentType: 'application/json',
            accept: 'application/json'
        };
        return self.ajaxService.rawAjaxRequest(params);
    };

    ReportService.prototype.getParameterConfiguration = function (reportId) {
        var url = Configuration.api.getReportParameters.format(reportId);
        console.log("report params url",url);
        var params = {
            url: url,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params);
    };

    ReportService.prototype.loadPreviewImage = function (report) {
        var url = Configuration.api.previewReport.format(report.id);
        console.log("preview report url",url);
        var params = {
            url: url,
            type: 'post',
            data: report.params,
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params);
    };

    ReportService.prototype.searchReport = function(query){
        var url = Configuration.api.searchReport.format(query);
        console.log("search report url",url);
        var params = {
            url: url,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params).then(this.decorateServerData.bind(this));
    };

    ReportService.prototype.decorateServerData = function (serverData) {
        return serverData;
    };

    return ReportService;
});