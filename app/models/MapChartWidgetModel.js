/**
 * Created by justin on 1/26/15.
 */

app.registerModel(function (container) {
    var WidgetBase = container.getService('services/WidgetBase');

    function MapChartWidgetModel() {
        WidgetBase.call(this);
    }

    MapChartWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    MapChartWidgetModel.prototype.changeFilterTab = function (tabName) {
        this.addQuery("selectedFilter", tabName);
    };

    MapChartWidgetModel.newInstance = function () {
        return Some(new MapChartWidgetModel());
    };

    return MapChartWidgetModel;
});