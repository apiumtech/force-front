/**
 * Created by justin on 12/17/14.
 */
app.registerPresenter(function (container) {
    function DistributionPresenter() {

    }

    DistributionPresenter.prototype.show = function ($view, $model) {
        var view = $view,
            model = $model;

        view.event.onLoaded = function () {
            model.getWidgets()
                .then(view.onWidgetsLoaded.bind(view), view.onWidgetsLoadFail.bind(view));
        };

        view.event.onWidgetDropped = function (element, widget) {
            view.updateWidgetSize(element, widget);
        };

        view.event.onWidgetMoved = function (widget, newIndex) {
            model.moveWidget(widget, newIndex);
            model.updateWidgets()
                .then(view.onWidgetsUpdated.bind(view), view.onWidgetsUpdatedFail.bind(view));
        };
    };

    DistributionPresenter.newInstance = function () {
        return new DistributionPresenter();
    };

    return DistributionPresenter;
});