/**
 * Created by justin on 1/26/15.
 */

app.registerModel(function (container) {
    var PieChartWidgetModel = container.getModel("models/PieChartWidgetModel");

    function SegmentPieChartWidgetModel() {
        PieChartWidgetModel.call(this);
    }

    SegmentPieChartWidgetModel.prototype = Object.create(PieChartWidgetModel.prototype, {});

    SegmentPieChartWidgetModel.newInstance = function () {
        return Some(new SegmentPieChartWidgetModel());
    };

    return SegmentPieChartWidgetModel;
});