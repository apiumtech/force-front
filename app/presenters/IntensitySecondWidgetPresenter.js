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
        console.log(error);
        alert("An error has occurred. Please check the log");
    };

    IntensitySecondWidgetPresenter.prototype.show = function (view, model) {
        var self = this,
            channel = this.reloadWidgetChannel;

        channel.listen(function (event) {
            if (event.reloadWidget) {
                model.reloadWidget()
                    .then(view.onReloadWidgetSuccess.bind(view), view.onReloadWidgetError.bind(view));
            }
        });

        view.event.onReloadWidgetStart = function () {
            self.reloadWidgetChannel.sendReloadSignal();
        };

        view.event.onReloadWidgetDone = function (errMsg) {
            self.reloadWidgetChannel.sendReloadCompleteSignal(errMsg);
        };
    };

    IntensitySecondWidgetPresenter.newInstance = function (reloadWidgetChannel) {
        var _reloadWidgetChannel = reloadWidgetChannel || ReloadWidgetChannel.newInstance(widgetName).getOrElse(throwException("Cannot instantiate ReloadWidgetChannel"));
        return Some(new IntensitySecondWidgetPresenter(_reloadWidgetChannel));
    };

    return IntensitySecondWidgetPresenter;
});