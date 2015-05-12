/**
 * Created by justin on 12/22/14.
 */

app.registerPresenter(function (container) {
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');

    function TableWidgetPresenter() {
    }

    TableWidgetPresenter.prototype = Object.create(Object.prototype, {
    });

    TableWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            $model = self.$model;

        $model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    TableWidgetPresenter.prototype.showError = function (error) {
        console.log(error);
    };

    TableWidgetPresenter.prototype.show = function (view, model) {
        var self = this;
        self.$view = view;
        self.$model = model;

        view.event.onReloading = function () {
            view.data = {};
            self._executeLoadWidget();
        };

        view.event.onDateFilterApplied = function (filterValue) {
            model.addDateFilter(filterValue.dateStart, filterValue.dateEnd);
            view.sendReloadCommandToChannel();
        };

        view.event.onUsersFilterApplied = function (filterValue) {
            model.addUserFilter(filterValue);
            view.sendReloadCommandToChannel();
        };
    };

    TableWidgetPresenter.newInstance = function () {
        return new TableWidgetPresenter();
    };

    return TableWidgetPresenter;
});