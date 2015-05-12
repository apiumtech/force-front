/**
 * Created by justin on 1/26/15.
 */

app.registerModel(function (container) {
    var WidgetBase = container.getService('services/WidgetBase');

    function PieChartWidgetModel() {
        WidgetBase.call(this);
    }

    PieChartWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    PieChartWidgetModel.prototype.changeFilterTab = function (tabName) {
        this.addQuery("selectedFilter", tabName);
    };

    PieChartWidgetModel.newInstance = function () {
        return new PieChartWidgetModel();
    };

    return PieChartWidgetModel;
});