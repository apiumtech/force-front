/**
 * Created by justin on 1/26/15.
 */

define([], function(){
    var WidgetBase = container.getService('services/WidgetBase');
    var AuthAjaxService = container.getService('services/ajax/AuthAjaxService');

    function PieChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);
    }

    PieChartWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    PieChartWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    PieChartWidgetModel.prototype._reload = function () {
        return this._baseReload()
            .then(this.decorateServerData.bind(this));
    };

    PieChartWidgetModel.prototype.changeQueryFilter = function (filter) {
        if (this.filters.map(function (filterValue) {
                return filterValue.key;
            }).indexOf(filter) == -1) {
            this.currentFilter = this.filters[0].key;
        }
        else
            this.currentFilter = filter;
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