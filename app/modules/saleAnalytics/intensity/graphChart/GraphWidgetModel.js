/**
 * Created by justin on 12/17/14.
 */

define([
    'shared/services/ajax/AuthAjaxService',
    'modules/saleAnalytics/widgets/WidgetBase',
    'config',
    'moment',
    'q'
], function (AuthAjaxService, WidgetBase, Configuration, moment, Q) {

    function GraphWidgetModel(ajaxService) {
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

    GraphWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    GraphWidgetModel.prototype.changeQueryFilter = function (filter) {
        console.log("Setting filter: ", filter);
        if (this.filters.map(function (filterValue) {
                return filterValue.key;
            }).indexOf(filter) == -1) {
            this.currentFilter = this.filters[0].key;
        }
        else
            this.currentFilter = filter;
    };

    GraphWidgetModel.prototype.getUrl = function () {
        return Configuration.api.graphWidgetIntensityDataApi.format(this.currentFilter);
    };

    GraphWidgetModel.prototype._baseReload = WidgetBase.prototype._reload;

    GraphWidgetModel.prototype._reload = function () {
        return this._baseReload()
            .then(this.decorateServerData.bind(this));
    };

    GraphWidgetModel.prototype.decorateServerData = function (data) {
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

    GraphWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        return new GraphWidgetModel(ajaxService);
    };

    return GraphWidgetModel;
});