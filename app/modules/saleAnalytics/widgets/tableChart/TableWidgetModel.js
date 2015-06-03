/**
 * Created by justin on 12/17/14.
 */

define([
    'shared/services/ajax/AuthAjaxService',
    'modules/saleAnalytics/widgets/WidgetBase',
    'config',
    'moment',
    'q'
], function (AuthAjaxService, WidgetBase, Configuration, moment, Q) {
    'use strict';

    function TableWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);
        this.queries = {
            users: "",
            period: "",
            grouping: ""
        };

        this.addDateFilter(moment().subtract(Configuration.defaultDateSubtraction, 'days').toDate(), moment().toDate());
    }

    TableWidgetModel.inherits(WidgetBase, {});

    TableWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;
    TableWidgetModel.prototype._reload = function () {
        return this._baseReload().then(this.decorateServerData.bind(this));
    };

    TableWidgetModel.prototype.decorateServerData = function (data) {

        var responseData = {
            data: {
                params: {
                    columns: [],
                    data: []
                }
            }
        };
        if (!data.length) throw new Error("No data received from server");

        Object.keys(data[0]).forEach(function (key) {
            responseData.data.params.columns.push(key);
        });

        data.forEach(function (d) {
            var arrayElement = [];
            Object.keys(d).forEach(function (key) {
                arrayElement.push(d[key]);
            });
            responseData.data.params.data.push(arrayElement);
        });
        return responseData;
    };

    TableWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        return new TableWidgetModel(ajaxService);
    };

    return TableWidgetModel;
});