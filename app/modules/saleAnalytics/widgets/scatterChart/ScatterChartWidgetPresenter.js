/**
 * Created by justin on 2/2/15.
 */

define([
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetModel',
    'config'
], function (ScatterChartWidgetModel, config) {
  "use strict";

    function ScatterChartWidgetPresenter(model) {
        this.model = model || new ScatterChartWidgetModel();
    }

    ScatterChartWidgetPresenter.inherits(Object, {
    });

    ScatterChartWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            model = self.model;

        model._reload($view.generateTooltip.bind($view))
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    ScatterChartWidgetPresenter.prototype.showError = function (error) {

    };

    ScatterChartWidgetPresenter.prototype.show = function (view) {
        var self = this;
        self.$view = view;
        var model = self.model;

        view.event.onReloading = function () {
            //model.setFetchEndPoint(config.api[view.widget.dataEndpoint]);
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

    return ScatterChartWidgetPresenter;
});
