/**
 * Created by justin on 2/2/15.
 */

define([
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetModel'
], function (DistributionHourLineWidgetModel) {

    function SingleLineChartWidgetPresenter(model) {
        this.model = model || new DistributionHourLineWidgetModel();
    }

    SingleLineChartWidgetPresenter.inherits(Object, {});

    SingleLineChartWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            model = self.model;

        model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    SingleLineChartWidgetPresenter.prototype.showError = function (error) {

    };

    SingleLineChartWidgetPresenter.prototype.show = function (view) {
        var self = this;
        self.$view = view;
        var model = self.model;

        view.event = view.event || {};

        view.event.onReloading = function () {
            model.setFetchEndPoint(view.widget.dataEndpoint);
            view.data = {};
            self._executeLoadWidget();
        };

        view.event.onFilterChanged = function () {
            model.changeQueryFilter(view.selectedFilter);
            view.sendReloadCommandToChannel();
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

    return SingleLineChartWidgetPresenter;
});