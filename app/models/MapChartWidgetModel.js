/**
 * Created by justin on 1/26/15.
 */

app.registerModel(function (container) {
    var AuthAjaxService = container.getService('services/ajax/AuthAjaxService');
    var WidgetBase = container.getService('services/WidgetBase');
    var Configuration = container.getService('Configuration');
    var moment = container.getFunction("moment");

    function MapChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);
        this.currentFilter = 'checkins';
        this.filters = [{
            name: 'Users',
            key: 'users'
        }, {
            name: 'Check-ins',
            key: 'checkins'
        }];
        this.queries = {
            users: "",
            period: ""
        };

        this.addDateFilter(moment().subtract(Configuration.defaultDateSubtraction, 'days').toDate(), moment().toDate());
    }

    MapChartWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    MapChartWidgetModel.prototype.getUrl = function(){
        return Configuration.api.geographicalWidgetDistributionDataApi.format(this.currentFilter);
    };

    MapChartWidgetModel.prototype.__baseReload = WidgetBase.prototype._reload;
    MapChartWidgetModel.prototype._reload = function(){
        return this.__baseReload().then(this.decorateServerData.bind(this));
    };

    MapChartWidgetModel.prototype.decorateServerData = function (serverData) {
    };

    MapChartWidgetModel.prototype.changeFilterTab = function (tabName) {
        this.currentFilter = tabName;
    };

    MapChartWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance().getOrElse(throwInstantiateException(AuthAjaxService));
        return Some(new MapChartWidgetModel(ajaxService));
    };

    return MapChartWidgetModel;
});