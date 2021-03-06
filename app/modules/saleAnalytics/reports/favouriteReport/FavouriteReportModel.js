define([
    'shared/services/ajax/AuthAjaxService',
    'config'
], function (AjaxService, Configuration) {
    'use strict';

    function FavouriteReportModel(ajaxService) {
        this.authAjaxService = ajaxService || new AjaxService();
    }

    FavouriteReportModel.prototype._getReports = function () {
        var self = this;
        var url = Configuration.api.getFavouriteReports;
        var params = {
            url: url,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return self.authAjaxService.rawAjaxRequest(params).then(self.decorateServerData.bind(self));
    };

    FavouriteReportModel.prototype.decorateServerData = function (data) {
        if (!data || !data instanceof Array || data.length <= 0) throw new Error("No data received from server");
        data.sort(function(a, b){
            if(a.Name > b.Name) return 1;
            if(a.Name < b.Name) return -1;
            return 0;
        });
        return data;
    };

    return FavouriteReportModel;
});