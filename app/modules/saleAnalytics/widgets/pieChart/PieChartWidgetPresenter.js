/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetModel'
], function(PieChartWidgetModel){
    'use strict';

    function PieChartWidgetPresenter(model) {
        this.model = model || new PieChartWidgetModel();
    }

    PieChartWidgetPresenter.inherits(Object, {
    });

    PieChartWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            model = self.model;

        model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    PieChartWidgetPresenter.prototype.showError = function (error) {

    };

    PieChartWidgetPresenter.prototype.show = function (view) {
        var self = this;
        self.$view = view;
        var model = self.model;

        view.event.onReloading = function () {
            model.setFetchEndPoint(view.widget.dataEndpoint);
            view.data.axis = undefined;
            view.data.fields = undefined;
            view.data.filters = undefined;
            view.data.params = undefined;
            self._executeLoadWidget();
        };

        view.event.onTimeChartRequested = function () {
            model.addQuery('grouping', view.$scope.selectedRangeOption);
            view.sendReloadCommandToChannel();
        };

        view.event.onTabChanged = function () {
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

        view.event.onReloadWidgetDone = function (errMsg) {
            self.widgetEventChannel.sendReloadCompleteSignal(errMsg);
        };

        view.event.getFilters = function(){
            return model.getFilters();
        };

        view.event.setWidget = function(widget){
            model.setWidget(widget);
        };
    };

    return PieChartWidgetPresenter;
});