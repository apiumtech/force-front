/**
 * Created by justin on 12/22/14.
 */

app.registerPresenter(function (container) {
    var ReloadWidgetChannel = container.getService('services/bus/ReloadWidgetChannel');
    var widgetName = "intensityWidgetA";

    function IntensityFirstWidgetPresenter(reloadWidgetChannel) {
        this.reloadWidgetChannel = reloadWidgetChannel;
    }

    IntensityFirstWidgetPresenter.prototype.showError = function (error) {
        console.log(error);
        alert("An error has occurred. Please check the log");
    };

    IntensityFirstWidgetPresenter.prototype.show = function (view, model) {
        var self = this,
            channel = this.reloadWidgetChannel,
            $view = view,
            $model = model;

        channel.listen(function (event) {
            if (event.reloadWidget) {
                $model.reloadWidget()
                    .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
            }
        });

        view.event.onReloadWidgetStart = function () {
            self.reloadWidgetChannel.sendReloadSignal();
        };


        view.event.onReloadWidgetDone = function (errMsg) {
            self.reloadWidgetChannel.sendReloadCompleteSignal(errMsg);
        };
    };

    IntensityFirstWidgetPresenter.newInstance = function (reloadWidgetChannel) {
        var _reloadWidgetChannel = reloadWidgetChannel || ReloadWidgetChannel.newInstance(widgetName).getOrElse(throwException("Cannot instantiate ReloadWidgetChannel"));
        return Some(new IntensityFirstWidgetPresenter(_reloadWidgetChannel));
    };

    return IntensityFirstWidgetPresenter;
});