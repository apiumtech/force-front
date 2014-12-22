/**
 * Created by justin on 12/22/14.
 */

app.registerPresenter(function (container) {
    var ReloadWidgetChannel = container.getService('services/bus/ReloadWidgetChannel');

    function IntensityFirstWidgetPresenter(reloadWidgetChannel) {
        this.reloadWidgetChannel = reloadWidgetChannel;
    }

    IntensityFirstWidgetPresenter.prototype.showError = function (error) {
        alert(error.message);
    };

    IntensityFirstWidgetPresenter.prototype.show = function (view, model) {
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

    IntensityFirstWidgetPresenter.newInstance = function (reloadWidgetChannel) {
        var _reloadWidgetChannel = reloadWidgetChannel || ReloadWidgetChannel.newInstance().getOrElse(throwException("Cannot instantiate ReloadWidgetChannel"));
        return Some(new IntensityFirstWidgetPresenter(_reloadWidgetChannel));
    };

    return IntensityFirstWidgetPresenter;
});