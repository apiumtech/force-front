/**
 * Created by justin on 12/22/14.
 */
define([], function () {
    'use strict';

    function GraphChartWidgetPresenter(widgetEventChannel) {
        this.widgetEventChannel = widgetEventChannel;
    }

    GraphChartWidgetPresenter.prototype = Object.create(Object.prototype, {});

    GraphChartWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            $model = self.$model;

        $model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    GraphChartWidgetPresenter.prototype.showError = function (error) {

    };

    GraphChartWidgetPresenter.prototype.show = function (view, model) {
        var self = this;
        self.$view = view;
        self.$model = model;

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

        view.event.onFilterRangeChanged = function () {
            model.addQuery('grouping', view.$scope.selectedRangeOption);
            view.sendReloadCommandToChannel();
        };
    };

    GraphChartWidgetPresenter.newInstance = function () {
        return new GraphChartWidgetPresenter();
    };

    return GraphChartWidgetPresenter;
});