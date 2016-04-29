/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetModel',
    'config'
], function (BarChartWidgetModel, config) {
  "use strict";

    function BarChartWidgetPresenter(model) {
        this.model = model || new BarChartWidgetModel();
    }

    BarChartWidgetPresenter.inherits(Object, {
    });

    BarChartWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this;
        var $view = self.$view;
        var model = self.model;

        model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    BarChartWidgetPresenter.prototype.showError = function (error) {

    };

    BarChartWidgetPresenter.prototype.show = function (view) {
        var self = this;
        self.$view = view;
        var model = this.model;

        view.event.onReloading = function () {
            model.setFetchEndPoint(config.api[view.widget.dataEndpoint]);
            view.data = {};
            self._executeLoadWidget();
        };

        view.event.onFilterChanged = function () {
            model.changeQueryFilter(view.$scope.selectedFilter);
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

    BarChartWidgetPresenter.newInstance = function (model) {
        return new BarChartWidgetPresenter(model);
    };

    return BarChartWidgetPresenter;
});
