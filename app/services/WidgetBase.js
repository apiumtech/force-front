/**
 * Created by justin on 12/17/14.
 */

app.registerService(function (container) {
    var AjaxService = container.getService("services/AjaxService");

    function WidgetBase(ajaxService) {
        this.ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        this.fetchPoint = null;
        this.widgetId = null;
        this.queries = {};
    }

    WidgetBase.prototype.normalizeServerInput = function (input) {
        var empty = function () {
            return {data: {params: {}}, success: false};
        };
        if (input == null || input.data == null || input.data.params == null || input.data.widgetId == null) {
            return empty();
        }

        if (typeof input.data.params === 'string')
            input.data.params = JSON.parse(input.data.params);

        return input;
    };

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
        this.addQuery("dateStart", dateStart.toISOString());
        this.addQuery("dateEnd", dateEnd.toISOString());
    };

    WidgetBase.prototype.reloadWidget = function () {
        if (!this.widgetId) {
            throw new Error("Widget Id is not defined");
        }
        if (!this.fetchPoint) {
            throw new Error("FetchPoint is not defined");
        }

        return this._reload();
    };

    WidgetBase.prototype._reload = function () {
        var url = this.fetchPoint;

        if (this.queries && !isEmptyObject(this.queries)) {
            var queries = this.buildQueryString();
            url += "?" + queries;
        }

        var request = {
            url: url,
            type: 'get',
            contentType: 'application/json'
        };
        return this.ajaxService.ajax(request)
            .then(this.normalizeServerInput, throwException("Could not normalize server input!"));
    };

    return WidgetBase;
});