/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBase',
    'shared/services/ajax/AuthAjaxService'
], function (WidgetBase, AuthAjaxService) {

    function PieChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);
        this.currentFilter = 'allActivities';
        this.filters = [{
            name: "Total Activities",
            key: "allActivities"
        }, {
            name: "Visits",
            key: "visits"
        }];
    }

    PieChartWidgetModel.inherits(WidgetBase, {});

    PieChartWidgetModel.prototype.getUrl = function () {
        return this.fetchPoint.format(this.currentFilter);
    };

    PieChartWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    PieChartWidgetModel.prototype._reload = function () {
        return this._baseReload()
            .then(this.decorateServerData.bind(this));
    };

    PieChartWidgetModel.prototype.changeQueryFilter = function (filter) {
        if (this.filters.map(function (filterValue) {
                return filterValue.key;
            }).indexOf(filter) === -1) {
            this.currentFilter = this.filters[0].key;
        } else {
            this.currentFilter = filter;
        }
    };

    PieChartWidgetModel.prototype.decorateServerData = function (data) {
        var responseData = {
            data: {
                params: {
                    params: [],
                    filters: this.filters
                }
            }
        };

        var labels = data.Labels[0];

        var series = data.Series[0];
        series.Points.forEach(function (point, index) {
            var decorated = {
                label: labels[index],
                data: point.Y
            };
            responseData.data.params.params.push(decorated);
        });

        return responseData;
    };

    PieChartWidgetModel.newInstance = function (ajaxService) {
        return new PieChartWidgetModel(ajaxService || AuthAjaxService.newInstance());
    };

    return PieChartWidgetModel;
});