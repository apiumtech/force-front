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
        return this._baseReload();
    };

    TableWidgetModel.prototype.parseData = function (data, widgetOption) {
        if( widgetOption && widgetOption == "userExtraFieldsDecorator" ) {
            return this.userExtraFieldsDataParser(data);
        }

        return this.parseFlatStructure(data);
    };

    TableWidgetModel.prototype.userExtraFieldsDataParser = function (data) {
        var responseData = {
            columns: ["Id","Name"],
            data: []
        };

        if(data.length > 0) {
            data[0].extrafields.forEach(function (field) {
                responseData.columns.push(field.Name);
            });
        }

        data.forEach(function (row) {
            var $row = [row.Id, row.Name];
            row.extrafields.forEach(function (field) {
                $row.push(field.Value);
            });
            responseData.data.push($row);
        });

        return responseData;
    };

    TableWidgetModel.prototype.parseFlatStructure = function(data){
        var responseData = {
            data: {
                params: {
                    columns: [],
                    data: []
                }
            }
        };

        if (!data.length){
            throw new Error("No data received from server");
        }

        var calculateColumnAvailable = function(key){ return key !== 'Id' && key !== 'IdFm' && key !== 'PhotoUrl'; };
        var calculateColumnType = function(key){
            return  key === 'Name' ? 'profile' :
                    key === 'PhotoUrl' ? 'img' :
                    key === 'ActivityScore' ? 'float' :
                    key === 'SalesScore' ? 'float' :
                    key === 'SalesActivityRatio' ? 'float' :
                    key === 'Sales' ? 'float' :
                    key === 'Visits' ? 'int' :
                    key === 'Activities' ? 'int' :
                    key === 'ActivityScore' ? 'float' :
                    key === 'PhoneCallsTime' ? 'seconds' :
                    key === 'Emails' ? 'int' :
                    key === 'Orders' ? 'int' :
                    key === 'Quotes' ? 'int' : 'string';
        };

        Object.keys(data[0]).forEach(function (key) {
            //responseData.data.params.columns.push(key);
            responseData.data.params.columns.push({
                key: key,
                name: key,
                type: calculateColumnType(key),
                sortable: true,
                visible: true, // wether the column is visible at a particular moment.
                available: calculateColumnAvailable(key) // wether the column is even available to be shown.
            });
        });

        /*data.forEach(function (d) {
            var arrayElement = [];
            Object.keys(d).forEach(function (key) {
                arrayElement.push(d[key]);
            });
            responseData.data.params.data.push(arrayElement);
        });*/
        responseData.data.params.data = data;
        return responseData.data.params;
    };

    TableWidgetModel.prototype._baseBuildQueryString = WidgetBase.prototype.buildQueryString;
    TableWidgetModel.prototype.buildQueryString = function () {
        var queries = this._baseBuildQueryString();
        queries +=  "&table=tblUsuarios";
        return queries;
    };

    TableWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        return new TableWidgetModel(ajaxService);
    };

    return TableWidgetModel;
});