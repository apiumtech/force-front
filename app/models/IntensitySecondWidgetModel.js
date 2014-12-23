/**
 * Created by justin on 12/17/14.
 */

app.registerModel(function (container) {
    var WidgetBase = container.getService('services/WidgetBase');
    var Q = container.getFunction('q');

    function IntensitySecondWidgetModel() {
        WidgetBase.call(this);
        this.widgetType = 'intensity';
        this.widgetName = '2';
    }

    IntensitySecondWidgetModel.prototype = Object.create(WidgetBase.prototype);

    IntensitySecondWidgetModel.newInstance = function () {
        return Some(new IntensitySecondWidgetModel());
    };

    return IntensitySecondWidgetModel;
});