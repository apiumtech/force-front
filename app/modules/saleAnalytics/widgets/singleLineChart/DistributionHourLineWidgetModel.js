/**
 * Created by justin on 2/2/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBase',
    'shared/services/ajax/AuthAjaxService',
    'config'
], function (WidgetBase, AuthAjaxService, Configuration) {
    'use strict';

    function SingleLineChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);

        this.currentFilter = 'allActivities';
        this.filters = [{
            name: "Total Activities",
            key: "allActivities"
        }, {
            name: "Visits",
            key: "visits"
        }, {
            name: "Emails",
            key: "emails"
        }, {
            name: "Phone calls",
            key: "phoneCalls"
        }];
    }

    SingleLineChartWidgetModel.inherits(WidgetBase, {});

    SingleLineChartWidgetModel.prototype.changeQueryFilter = function (filter) {
        if (this.filters.map(function (filterValue) {
                return filterValue.key;
            }).indexOf(filter) === -1) {
            this.currentFilter = this.filters[0].key;
        }
        else{
            this.currentFilter = filter;
        }
    };

    SingleLineChartWidgetModel.prototype.changeFilterTab = function (tabName) {
        this.addQuery("selectedFilter", tabName);
    };

    SingleLineChartWidgetModel.prototype.getUrl = function () {
        return Configuration.api.hourWidgetDistributionDataApi.format(this.currentFilter);
    };

    SingleLineChartWidgetModel.prototype.decorateServerData = function (data) {
        var responseData = {
            data: {
                params: {
                    fields: [],
                    filters: this.filters
                }
            }
        };

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

    SingleLineChartWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    SingleLineChartWidgetModel.prototype._reload = function () {
        return this._baseReload()
            .then(this.decorateServerData.bind(this));
    };

    SingleLineChartWidgetModel.newInstance = function (ajaxService) {
        return new SingleLineChartWidgetModel(ajaxService || AuthAjaxService.newInstance());
    };

    return SingleLineChartWidgetModel;
});