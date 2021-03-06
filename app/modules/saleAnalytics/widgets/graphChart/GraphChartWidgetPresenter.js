/**
 * Created by justin on 12/22/14.
 */
define([
    'modules/saleAnalytics/widgets/graphChart/GraphChartWidgetModel',
    'config'
], function (GraphChartWidgetModel, config) {
    'use strict';

    function GraphChartWidgetPresenter(model) {
        this.model = model || new GraphChartWidgetModel();
    }

    GraphChartWidgetPresenter.inherits(Object, {});

    GraphChartWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            model = self.model;

        model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    GraphChartWidgetPresenter.prototype.showError = function (error) {

    };

    GraphChartWidgetPresenter.prototype.show = function (view) {
        var self = this;
        self.$view = view;
        var model = self.model;

        view.event.onReloading = function () {
            //model.setFetchEndPoint(config.api[view.widget.dataEndpoint]);
            model.setFetchEndPoint(view.widget.dataEndpoint);
            view.data.axis = undefined;
            view.data.fields = undefined;
            view.data.filters = undefined;
            self._executeLoadWidget();
        };

        view.event.onFilterChanged = function () {
            model.changeQueryFilter(view.$scope.selectedFilter.key);
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

        view.event.onFilterRangeChanged = function (dontSend) {
            model.addQuery('grouping', view.$scope.selectedRangeOption);
            if(!dontSend) {
                view.sendReloadCommandToChannel();
            }
        };
    };

    return GraphChartWidgetPresenter;
});
