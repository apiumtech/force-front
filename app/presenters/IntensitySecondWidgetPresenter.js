/**
 * Created by justin on 12/22/14.
 */

app.registerPresenter(function (container) {
    var ReloadWidgetChannel = container.getService('services/bus/ReloadWidgetChannel');
    var widgetName = "intensityWidgetB";

    function IntensitySecondWidgetPresenter(reloadWidgetChannel) {
        this.reloadWidgetChannel = reloadWidgetChannel;
    }

    IntensitySecondWidgetPresenter.prototype.showError = function (error) {
        alert(error.message);
    };

    IntensitySecondWidgetPresenter.prototype.show = function (view, model) {
        var self = this,
            channel = this.reloadWidgetChannel;

        channel.listen(function (event) {
            if (event.reloadWidget) {
                model.onReloadWidgetRequested()
                    .then(view.onReloadWidgetSuccess.bind(view), view.onReloadWidgetError.bind(view));
            }
        });

        view.event.onReloadWidgetRequested = function () {
            self.reloadWidgetChannel.send({reloadWidget: true});
        };
        view.event.onReloadWidgetDone = function () {
            self.reloadWidgetChannel.send({reloadedComplete: true});
        };
    };

    IntensitySecondWidgetPresenter.newInstance = function (reloadWidgetChannel) {
        var _reloadWidgetChannel = reloadWidgetChannel || ReloadWidgetChannel.newInstance(widgetName).getOrElse(throwException("Cannot instantiate ReloadWidgetChannel"));
        return Some(new IntensitySecondWidgetPresenter(_reloadWidgetChannel));
    };

    return IntensitySecondWidgetPresenter;
});