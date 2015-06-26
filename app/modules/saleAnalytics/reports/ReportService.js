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
        //TODO: implement when having server's contract
        return this.ajaxService.rawAjaxRequest({
            result: {
                url: "http://this.is/theURL/we/want/" + report.id

            }
        });
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

    ReportService.prototype.getPreviewReportPhotos = function (reportId) {
        //TODO: implement when having server's contract
    };

    ReportService.prototype.searchReport = function(query){
        var result = (query != 'empty') ? ReportFakeData() : [];
        return this.ajaxService.rawAjaxRequest({
            result: result
        }).then(this.decorateServerData.bind(this));
    };

    ReportService.prototype.decorateServerData = function (serverData) {
        return serverData;
    };

    return ReportService;
});