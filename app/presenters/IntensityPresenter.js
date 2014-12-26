/**
 * Created by justin on 12/17/14.
 */
app.registerPresenter(function (container) {
    function IntensityPresenter() {

    }

    IntensityPresenter.prototype.show = function ($view, $model) {
        var view = $view,
            model = $model;

        view.event.onLoaded = function () {
            model.getWidgets()
                .then(view.onWidgetsLoaded.bind(view), view.onWidgetsLoadFail.bind(view));
        };
    };

    IntensityPresenter.newInstance = function () {
        return Some(new IntensityPresenter());
    };

    return IntensityPresenter;
});