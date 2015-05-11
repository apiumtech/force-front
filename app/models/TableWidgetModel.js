/**
 * Created by justin on 12/17/14.
 */

app.registerModel(function (container) {
    var AuthAjaxService = container.getService('services/ajax/AuthAjaxService');
    var WidgetBase = container.getService('services/WidgetBase');
    var Configuration = container.getService('Configuration');
    var moment = container.getFunction("moment");
    var Q = container.getFunction('q');

    function TableWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);
        this.setFetchEndPoint(Configuration.api.rankingWidgetIntensityDataApi);
        this.queries = {
            users: "",
            period: "",
            grouping: ""
        };

        this.addDateFilter(moment().subtract(Configuration.defaultDateSubtraction, 'days').toDate(), moment().toDate());
    }

    TableWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

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
        ajaxService = ajaxService || AuthAjaxService.newInstance().getOrElse(throwInstantiateException(AuthAjaxService));
        return Some(new TableWidgetModel(ajaxService));
    };

    return TableWidgetModel;
});