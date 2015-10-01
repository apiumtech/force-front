/**
 * Created by justin on 12/17/14.
 */

define([
    'shared/services/ajax/AuthAjaxService',
    'moment',
    'config'
], function (AjaxService, moment, Configuration) {

    function WidgetBase(ajaxService) {
        this.authAjaxService = ajaxService || AjaxService.newInstance();
        this.fetchPoint = null;
        this.widgetId = null;
        this.queries = {
            users: "",
            period: ""
        };
        this.addDateFilter(moment().subtract(Configuration.defaultDateSubtraction, 'days').toDate(), moment().toDate());
    }

    WidgetBase.prototype.buildQueryString = function () {
        var queries = "";

        for (var prop in this.queries) {
            if (queries !== "") queries += "&";
            queries += prop + "=" + this.queries[prop];
        }

        return queries;
    };

    WidgetBase.prototype.setFetchEndPoint = function (endpoint) {
        if (!endpoint) throw new Error("Input data cannot be null");
        this.fetchPoint = endpoint;
    };

    WidgetBase.prototype.addQuery = function (key, value) {
        this.queries[key] = value;
    };

    WidgetBase.prototype.addDateFilter = function (dateStart, dateEnd) {
        console.log( moment(dateStart).format('DD/MM/YYYY'), moment(dateEnd).format('DD/MM/YYYY') );
        this.addQuery("period", moment(dateStart).unix() + "," + moment(dateEnd).unix());
    };

    WidgetBase.prototype.addUserFilter = function (userIdsList) {
        this.addQuery("users", userIdsList);
    };

    WidgetBase.prototype.reloadWidget = function () {
        if (!this.getUrl()) {
            throw new Error("FetchPoint is not defined");
        }

        return this._reload();
    };

    WidgetBase.prototype.getUrl = function () {
        return this.fetchPoint;
    };

    WidgetBase.prototype._reload = function () {
        var url = this.getUrl();

        if (this.queries && !isEmptyObject(this.queries)) {
            var queries = this.buildQueryString();
            url += "?" + queries;
        }

        var request = {
            url: url,
            type: 'get',
            contentType: 'application/json'
        };

        return this.authAjaxService.rawAjaxRequest(request);
    };

    return WidgetBase;
});