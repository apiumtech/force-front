/**
 * Created by justin on 12/22/14.
 */

app.registerPresenter(function (container) {
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');

    function SalesAnalyticsFilterPresenter() {
    }

    SalesAnalyticsFilterPresenter.prototype = Object.create(Object.prototype, {});

    SalesAnalyticsFilterPresenter.prototype.showError = function (error) {
        console.log(error);
    };

    SalesAnalyticsFilterPresenter.prototype.show = function (view, model) {
        var self = this;
        self.$view = view;
        self.$model = model;

        view.event.onFilterInitializing = function () {
            model.getUsers()
                .then(view.onUsersLoadedSuccess.bind(view), view.onUsersLoadedFail.bind(view));
        };
    };

    SalesAnalyticsFilterPresenter.newInstance = function () {
        return Some(new SalesAnalyticsFilterPresenter());
    };

    return SalesAnalyticsFilterPresenter;
});