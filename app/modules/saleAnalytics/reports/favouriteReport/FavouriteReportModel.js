define([
    'shared/services/ajax/FakeAjaxService',
    'modules/saleAnalytics/reports/ReportFakeData'
], function (AjaxService, ReportFakeData) {
    'use strict';

    function FavouriteReportModel(ajaxService) {
        this.ajaxService = ajaxService || new AjaxService();
    }

    FavouriteReportModel.prototype._getReports = function () {
        return this.ajaxService.rawAjaxRequest({
            result: ReportFakeData
        }).then(this.decorateServerData.bind(this));
    };

    FavouriteReportModel.prototype.decorateServerData = function (serverData) {
        return serverData;
    };

    return FavouriteReportModel;
});