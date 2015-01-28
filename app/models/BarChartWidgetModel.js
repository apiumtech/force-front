/**
 * Created by justin on 1/26/15.
 */

app.registerModel(function (container) {
    var WidgetBase = container.getService('services/WidgetBase');

    function BarChartWidgetModel() {
        WidgetBase.call(this);
    }

    BarChartWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    BarChartWidgetModel.prototype.changeFilterTab = function (tabName) {
        this.addQuery("selectedTab", tabName);
    };

    BarChartWidgetModel.newInstance = function () {
        return Some(new BarChartWidgetModel());
    };

    return BarChartWidgetModel;
});