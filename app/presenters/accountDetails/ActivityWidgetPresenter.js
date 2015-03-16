/**
 * Created by Justin on 3/16/2015.
 */

app.registerPresenter(function () {
    function ActivityWidgetPresenter() {

    }

    ActivityWidgetPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;

        view.event.onLoadActivity = function (accountId, pageIndex) {
            model.loadActivity(accountId, pageIndex)
                .then(view.onActivityLoaded.bind(view), view.showError.bind(view));
        };
    };

    ActivityWidgetPresenter.newInstance = function () {
        return Some(new ActivityWidgetPresenter());
    };

    return ActivityWidgetPresenter;
});