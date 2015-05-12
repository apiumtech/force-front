/**
 * Created by justin on 12/17/14.
 */

app.registerService(function (container) {
    var AjaxService = container.getService("services/AjaxService");
    var moment = container.getFunction("moment");
    var Configuration = container.getService('Configuration');

    function WidgetBase(ajaxService) {
        this.ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        this.fetchPoint = null;
        this.widgetId = null;
        this.queries = {
            period: ""
        };
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
        console.log(dateStart);
        console.log(dateEnd);
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

    WidgetBase.prototype.getUrl = function(){
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

        return this.ajaxService.rawAjaxRequest(request);
    };

    return WidgetBase;
});