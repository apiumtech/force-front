define([
    'shared/services/ajax/AuthAjaxService',
    'modules/saleAnalytics/reports/ReportFakeData',
    'config',
    'shared/services/ajax/CQRSUnwrapper',
    'q'
], function (AjaxService, ReportFakeData, Configuration, CQRSUnwrapper, Q) {
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
        var reportId = report.Id;
        var reportName = report.Name;
        var reportFormat = report.selectedReportType.toLowerCase().indexOf('doc') > -1 ? 'doc' :
          report.selectedReportType.toLowerCase().indexOf('xsl') > -1 || report.selectedReportType.toLowerCase().indexOf('xls') > -1 ? 'xls' :
          report.selectedReportType;
        var parameters = report.params.map(function(item){
            return {
                Key: item.Key,
                Value: item.Value
            };
        });
        parameters = JSON.stringify(parameters);

        var url = encodeURI(Configuration.api.getReportUrl.format(reportId, reportName, reportFormat, parameters));
        var params = {
            url: url,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json'
        };
        return CQRSUnwrapper.unwrapData(self.authAjaxService.rawAjaxRequest(params));
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


    ReportService.prototype.loadTablePreview = function (report) {
        var url = Configuration.api.tablePreview;
        var requestData = {
            idReport: report.Id,
            idCompany:0,
            idEnvironment:0,
            reportFormat:'',
            reportName:'',
            parameters:''
        };
        var params = {
            url: url,
            type: 'GET',
            headers: {
                'x-fm-requestData': JSON.stringify(requestData)
            },
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


        /*return Q.fcall(function () {
            return [];
        });*/
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
