/**
 * Created by justin on 12/22/14.
 */

define([
    'modules/saleAnalytics/widgets/tableChart/TableWidgetModel',
    'config'
], function (TableWidgetModel, config) {
    'use strict';

    function TableWidgetPresenter(model) {
        this.model = model || new TableWidgetModel();
    }

    TableWidgetPresenter.inherits(Object, {});

    TableWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            model = self.model;

        model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    TableWidgetPresenter.prototype.showError = function (error) {

    };

    TableWidgetPresenter.prototype.show = function (view) {
        var self = this;
        self.$view = view;
        var model = self.model;

        view.event.onReloading = function () {
            model.setFetchEndPoint(config.api[view.widget.dataEndpoint]);
            //view.data = {};
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

        view.event.parseData = model.parseData.bind(model);
    };

    return TableWidgetPresenter;
});
