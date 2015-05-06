/**
 * Created by justin on 12/17/14.
 */

app.registerModel(function (container) {
    var AuthAjaxService = container.getService('services/ajax/AuthAjaxService');
    var WidgetBase = container.getService('services/WidgetBase');
    var Configuration = container.getService('Configuration');
    var moment = container.getFunction("moment");

    function GraphWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);
        this.setFetchEndPoint(Configuration.api.graphWidgetIntensityDataApi);
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
        this.queries = {
            users: "",
            period: "",
            grouping: "hour"
        };

        this.addDateFilter(moment().subtract(Configuration.defaultDateSubtraction, 'days').toDate(), moment().toDate());
    }

    GraphWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    GraphWidgetModel.prototype.changeQueryFilter = function (filter) {
        if (this.filters.map(function (filterValue) {
                return filterValue.key;
            }).indexOf(filter) == -1) {
            this.currentFilter = 'visits';
        }
        else
            this.currentFilter = filter;
    };

    GraphWidgetModel.prototype.getUrl = function(){
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

        responseData.data.params.axis.x = data.Labels;

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
        ajaxService = ajaxService || AuthAjaxService.newInstance().getOrElse(throwInstantiateException(AuthAjaxService));
        return Some(new GraphWidgetModel(ajaxService));
    };

    return GraphWidgetModel;
});