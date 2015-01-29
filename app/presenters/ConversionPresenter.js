/**
 * Created by justin on 12/17/14.
 */
app.registerPresenter(function (container) {
    function ConversionPresenter() {

    }

    ConversionPresenter.prototype.show = function ($view, $model) {
        var view = $view,
            model = $model;

        view.event.onLoaded = function () {
            model.getWidgets()
                .then(view.onWidgetsLoaded.bind(view), view.onWidgetsLoadFail.bind(view));
        };

        view.event.onWidgetDropped = function (element, widget) {
            view.updateWidgetSize(element, widget);
        };
    };

    ConversionPresenter.newInstance = function () {
        return Some(new ConversionPresenter());
    };

    return ConversionPresenter;
});