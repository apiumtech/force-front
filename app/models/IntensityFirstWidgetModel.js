/**
 * Created by justin on 12/17/14.
 */

app.registerModel(function (container) {
    var Q = container.getFunction('q');

    function IntensityFirstWidgetModel() {

    }

    IntensityFirstWidgetModel.prototype.reloadWidget = function() {
        return {
            success: true,
            newData: '/image/123.jpg'
        }
    };

    IntensityFirstWidgetModel.prototype.onReloadWidgetRequested = function () {
        return Q.fcall(this.reloadWidget.bind(this));
    };

    IntensityFirstWidgetModel.newInstance = function () {
        return Some(new IntensityFirstWidgetModel());
    };

    return IntensityFirstWidgetModel;
});