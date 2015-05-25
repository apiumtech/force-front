/**
 * Created by justin on 12/17/14.
 */

define([
    'shared/services/ajax/AuthAjaxService',
    'modules/saleAnalytics/widgets/WidgetBase',
    'config'
], function (AuthAjaxService, WidgetBase, Configuration) {

    function GraphChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);
        this.currentFilter = 'visits';
        this.filters = [{
            name: 'Visits',
            key: 'visits'
        }, {
            name: 'Time of phone calls',
            key: 'phoneCallsTime'
        }, {
            name: 'Emails',
            key: 'emails'
        }, {
            name: 'Activities',
            key: 'activities'
        }, {
            name: 'Activity Scores',
            key: 'activityScores'
        }, {
            name: 'Users',
            key: 'users'
        }, {
            name: 'Orders',
            key: 'orders'
        }, {
            name: 'Quotes',
            key: 'quotes'
        }];

        this.queries.grouping = "hour";
    }

    GraphChartWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    GraphChartWidgetModel.prototype.changeQueryFilter = function (filter) {
        console.log("Setting filter: ", filter);
        if (this.filters.map(function (filterValue) {
                return filterValue.key;
            }).indexOf(filter) == -1) {
            this.currentFilter = this.filters[0].key;
        }
        else
            this.currentFilter = filter;
    };

    GraphChartWidgetModel.prototype.getUrl = function () {
        return this.fetchPoint.format(this.currentFilter);
    };

    GraphChartWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    GraphChartWidgetModel.prototype._reload = function () {
        return this._baseReload()
            .then(this.decorateServerData.bind(this));
    };

    GraphChartWidgetModel.prototype.decorateServerData = function (data) {
        var responseData = {
            data: {
                params: {
                    axis: {
                        x: [],
                        y: ""
                    },
                    fields: [],
                    filters: this.filters
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

    GraphChartWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        return new GraphChartWidgetModel(ajaxService);
    };

    return GraphChartWidgetModel;
});