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
            period: ""
        };

        this.addDateFilter(moment().subtract(Configuration.defaultDateSubtraction, 'days').toDate(), moment().toDate());
    }

    TableWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    TableWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance().getOrElse(throwInstantiateException(AuthAjaxService));
        return Some(new TableWidgetModel(ajaxService));
    };

    return TableWidgetModel;
});