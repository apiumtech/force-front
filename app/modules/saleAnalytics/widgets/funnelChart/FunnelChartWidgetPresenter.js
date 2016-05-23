define([
    'modules/saleAnalytics/widgets/funnelChart/FunnelChartWidgetModel',
    'config'
], function (FunnelChartWidgetModel, config) {
  "use strict";

    function FunnelChartWidgetPresenter(model) {
        this.model = model || new FunnelChartWidgetModel();
    }

    FunnelChartWidgetPresenter.inherits(Object, {
    });

    FunnelChartWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this;
        var $view = self.$view;
        var model = self.model;

        model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    FunnelChartWidgetPresenter.prototype.showError = function (error) {
    };

    FunnelChartWidgetPresenter.prototype.show = function (view) {
        var self = this;
        self.$view = view;
        var model = this.model;

        view.event.onReloading = function () {
            //model.setFetchEndPoint(config.api[view.widget.dataEndpoint]);
            model.setFetchEndPoint(view.widget.dataEndpoint);
            view.data = {};
            self._executeLoadWidget();
        };

        view.event.onTabChanged = function () {
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

    FunnelChartWidgetPresenter.newInstance = function (model) {
        return new FunnelChartWidgetPresenter(model);
    };

    return FunnelChartWidgetPresenter;
});
