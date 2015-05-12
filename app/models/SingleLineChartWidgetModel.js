/**
 * Created by justin on 2/2/15.
 */

app.registerModel(function (container) {
    var WidgetBase = container.getService('services/WidgetBase');

    function BarChartWidgetModel() {
        WidgetBase.call(this);
    }

    BarChartWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    BarChartWidgetModel.prototype.changeFilterTab = function (tabName) {
        this.addQuery("selectedFilter", tabName);
    };

    BarChartWidgetModel.newInstance = function () {
        return new BarChartWidgetModel();
    };

    return BarChartWidgetModel;
});