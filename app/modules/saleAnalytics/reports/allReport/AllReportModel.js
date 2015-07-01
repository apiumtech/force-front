define([
    'shared/services/ajax/AuthAjaxService',
    'modules/saleAnalytics/widgets/WidgetBase',
    'modules/saleAnalytics/reports/ReportFakeData',
    'shared/services/ArrayHelper',
    'config',
    'moment'
], function (AjaxService, WidgetBase, ReportFakeData, ArrayHelper, Configuration, moment) {
    'use strict';

    function AllReportModel(ajaxService) {
        ajaxService = ajaxService || new AjaxService();
        WidgetBase.call(this, ajaxService);
        this.arrayHelper = ArrayHelper;
        this.queries = {
            user: "",
            permission: ""
        };

        this.addDateFilter(moment().subtract(Configuration.defaultDateSubtraction, 'days').toDate(), moment().toDate());
    }

    AllReportModel.inherits(WidgetBase, {});

    AllReportModel.prototype.reloadWidget = function () {
        return this._reload();
    };

    AllReportModel.prototype._reload = function () {
        var self = this;
        var url = Configuration.api.getAllReports;
        console.log("report url",url);
        var params = {
            url: url,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return self.ajaxService.rawAjaxRequest(params).then(self.decorateServerData.bind(self));
    };

    AllReportModel.prototype.decorateServerData = function (data) {
        console.log("server",data);
        if (!data || !data instanceof Array || data.length <= 0) throw new Error("No data received from server");
        return this.arrayHelper.makeTree(data, 'idParent', 'id', 'children', -1);
    };

    return AllReportModel;
});
