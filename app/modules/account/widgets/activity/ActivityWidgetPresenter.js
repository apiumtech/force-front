/**
 * Created by Justin on 3/16/2015.
 */

define([], function () {
    function ActivityWidgetPresenter() {

    }

    ActivityWidgetPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;

        view.event.onLoadActivity = function (accountId, pageIndex) {
            model.loadActivity(accountId, pageIndex)
                .then(view.onActivityLoaded.bind(view), view.showError.bind(view));
        };

        view.event.onActivityFollowToggled = function (activityId) {
            model.toggleFollow(activityId)
                .then(view.followToggled.bind(view), view.showError.bind(view));
        };
    };

    ActivityWidgetPresenter.newInstance = function () {
        return new ActivityWidgetPresenter();
    };

    return ActivityWidgetPresenter;
});