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
            result: ReportFakeData()
        }).then(this.decorateServerData.bind(this));
    };

    FavouriteReportModel.prototype.decorateServerData = function (data) {
        if (!data || !data instanceof Array || data.length <= 0) throw new Error("No data received from server");
        var returnData = data.filter(function(item){
            return item.type == "report";
        });
        return returnData;
    };

    return FavouriteReportModel;
});