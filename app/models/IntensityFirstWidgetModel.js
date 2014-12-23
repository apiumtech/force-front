/**
 * Created by justin on 12/17/14.
 */

app.registerModel(function (container) {
    var WidgetBase = container.getService('services/WidgetBase');
    var Q = container.getFunction('q');

    function IntensityFirstWidgetModel() {
        WidgetBase.call(this);
        this.widgetType = 'intensity';
        this.widgetName = '1';
    }

    IntensityFirstWidgetModel.prototype = Object.create(WidgetBase.prototype);

    IntensityFirstWidgetModel.newInstance = function () {
        return Some(new IntensityFirstWidgetModel());
    };

    return IntensityFirstWidgetModel;
});