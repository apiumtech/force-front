/**
 * Created by justin on 12/22/14.
 */

app.registerPresenter(function (container) {
    var ReloadWidgetChannel = container.getService('services/bus/ReloadWidgetChannel');
    var widgetName = "intensityWidgetA";

    function GraphWidgetPresenter(reloadWidgetChannel) {
        this.reloadWidgetChannel = reloadWidgetChannel;
    }

    GraphWidgetPresenter.prototype.showError = function (error) {
        console.log(error);
        alert("An error has occurred. Please check the log");
    };

    GraphWidgetPresenter.prototype.show = function (view, model) {
        var self = this,
            channel = this.reloadWidgetChannel,
            $view = view,
            $model = model;

        function executeLoadWidget() {
            $model.reloadWidget()
                .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
        }

        channel.listen(function (event) {
            if (event.reloadWidget) {
                executeLoadWidget();
            }
        });

        view.event.onReloadWidgetStart = function () {
            executeLoadWidget();
        };

        view.event.onReloadWidgetDone = function (errMsg) {
            self.reloadWidgetChannel.sendReloadCompleteSignal(errMsg);
        };
    };

    GraphWidgetPresenter.newInstance = function (reloadWidgetChannel) {
            var _reloadWidgetChannel = reloadWidgetChannel || ReloadWidgetChannel.newInstance(widgetName).getOrElse(throwException("Cannot instantiate ReloadWidgetChannel"));
        return Some(new GraphWidgetPresenter(_reloadWidgetChannel));
    };

    return GraphWidgetPresenter;
});