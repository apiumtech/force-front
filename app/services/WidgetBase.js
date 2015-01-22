/**
 * Created by justin on 12/17/14.
 */

app.registerService(function (container) {
    var AjaxService = container.getService("services/AjaxService");

    function WidgetBase(ajaxService) {
        this.ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        this.fetchPoint = '/api/widget';
        this.widgetId = '';
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

        $.each(this.queries, function (key, value) {
            if (queries !== "") queries += "&";
            queries += key + "=" + value;
        });

        return queries;
    };

    WidgetBase.prototype.addQuery = function (key, value) {
        if (!this.queries) this.queries = {};
        this.queries[key] = value;
    };

    WidgetBase.prototype.reloadWidget = function () {
        if (!this.widgetId) {
            throw new Error("Widget Id is not defined");
        }

        return this._reload();
    };

    WidgetBase.prototype._reload = function () {
        var url = this.fetchPoint + '/' + this.widgetId;

        if (this.queries && !isEmptyObject(this.queries)) {
            var queries = this.buildQueryString();
            url += "?" + queries;
        }

        var request = {
            url: url,
            type: 'get',
            contentType: 'application/json'
        };
        return this.ajaxService.ajax(request).then(this.normalizeServerInput, throwException("Could not normalize server input!"));
    };

    WidgetBase.prototype.moveWidget = function (oldIndex, newIndex) {
        if (!this.widgetId) {
            throw new Error("Widget Id is not defined");
        }

        return this._moveWidget(oldIndex, newIndex);
    };

    WidgetBase.prototype._moveWidget = function (oldIndex, newIndex) {
        console.log(oldIndex + " -> " + newIndex + ": " + this.widgetId);
        var request = {
            url: this.fetchPoint + '/' + this.widgetId + '/move',
            type: 'post',
            accept: 'application/json',
            contentType: 'application/json',
            data: {oldIndex: oldIndex, newIndex: newIndex}
        };

        return this.ajaxService.ajax(request);
    };

    return WidgetBase;
});