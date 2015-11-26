/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBase',
    'shared/services/ajax/AuthAjaxService'
], function (WidgetBase, AuthAjaxService) {
    'use strict';

    function PieChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);
        this.currentFilter = 'activities';
        this.filters = [{
            name: "Total Activities",
            key: "activities"
        }, {
            name: "Visits",
            key: "visits"
        }, {
            name: "Accounts",
            key: "accounts"
        }, {
            name: "Opportunities",
            key: "opportunities"
        }];

        this.queries.grouping = "pie";
    }

    PieChartWidgetModel.inherits(WidgetBase, {});

    PieChartWidgetModel.prototype.changeQueryFilter = function (filter) {
        if (this.filters.map(function (filterValue) {
                return filterValue.key;
            }).indexOf(filter) === -1) {
            this.currentFilter = this.filters[0].key;
        } else {
            this.currentFilter = filter;
        }
    };

    PieChartWidgetModel.prototype.getFilters = function () {
        return this.filters.slice();
    };

    PieChartWidgetModel.prototype.getUrl = function () {
        return this.fetchPoint.format(this.currentFilter);
    };

    PieChartWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    PieChartWidgetModel.prototype._reload = function () {
        return this._baseReload()
            .then(this.decorateServerData.bind(this));
    };

    PieChartWidgetModel.prototype.decorateServerData = function (data) {
        var self = this;
        var responseData;
        if (self.queries.grouping === "pie") {// is pie chart
            responseData = self.decoratePieChartServerData(data);
        } else {
            responseData = self.decorateLineAreaChartServerData(data);
        }
        return responseData;
    };

    PieChartWidgetModel.prototype.decoratePieChartServerData = function (data) {
        var responseData = {
            data: {
                params: {
                    params: []
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

    PieChartWidgetModel.prototype.decorateLineAreaChartServerData = function (data) {
        var responseData = {
            data: {
                params: {
                    axis: {
                        x: [],
                        y: ""
                    },
                    fields: []
                }
            }
        };
        responseData.data.params.axis.x = data.Labels[0];
        data.Series.forEach(function (series) {
            var decorated = {
                name: series.Name,
                data: series.Points.map(function (point) {
                    return point.Y;
                })
            };
            responseData.data.params.fields.push(decorated);
        });
        return responseData;
    };


    PieChartWidgetModel.newInstance = function (ajaxService) {
        return new PieChartWidgetModel(ajaxService || AuthAjaxService.newInstance());
    };

    return PieChartWidgetModel;
});