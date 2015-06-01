/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetModel'
], function(MapChartWidgetModel){

    function MapChartWidgetPresenter(model) {
        this.model = model || new MapChartWidgetModel();
    }

    MapChartWidgetPresenter.inherits(Object, {
    });

    MapChartWidgetPresenter.prototype._executeLoadWidget = function () {
        var self = this,
            $view = self.$view,
            model = self.model;

        model.reloadWidget()
            .then($view.onReloadWidgetSuccess.bind($view), $view.onReloadWidgetError.bind($view));
    };

    MapChartWidgetPresenter.prototype.showError = function (error) {

    };

    MapChartWidgetPresenter.prototype.show = function (view) {
        var self = this;
        self.$view = view;
        var model = this.model;

        view.event.onReloading = function () {
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

    return MapChartWidgetPresenter;
});