/**
 * Created by justin on 1/26/15.
 */

app.registerModel(function (container) {
    var PieChartWidgetModel = container.getModel("models/widgets/PieChartWidgetModel");

    function HourPieChartWidgetModel() {
        PieChartWidgetModel.call(this);
    }

    HourPieChartWidgetModel.prototype = Object.create(PieChartWidgetModel.prototype, {});

    HourPieChartWidgetModel.newInstance = function () {
        return new HourPieChartWidgetModel();
    };

    return HourPieChartWidgetModel;
});