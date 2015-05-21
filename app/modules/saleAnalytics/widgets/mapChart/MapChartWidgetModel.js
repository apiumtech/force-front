/**
 * Created by justin on 1/26/15.
 */

define([
    'shared/services/ajax/AuthAjaxService',
    'modules/saleAnalytics/widgets/WidgetBase',
    'config',
    'moment',
], function(AuthAjaxService, WidgetBase, Configuration, moment){

    function MapChartWidgetModel(ajaxService) {
        WidgetBase.call(this, ajaxService);

        this.currentFilter = 'checkins';
        this.filters = [{
            name: 'Users',
            key: 'users'
        }, {
            name: 'Check-ins',
            key: 'checkins'
        }];
        this.queries = {
            users: "",
            period: ""
        };

        this.addDateFilter(moment().subtract(Configuration.defaultDateSubtraction, 'days').toDate(), moment().toDate());
    }

    MapChartWidgetModel.prototype = Object.create(WidgetBase.prototype, {});

    MapChartWidgetModel.prototype.changeQueryFilter = function (filter) {
        if (this.filters.map(function (filterValue) {
                return filterValue.key;
            }).indexOf(filter) == -1) {
            this.currentFilter = this.filters[0].key;
        }
        else
            this.currentFilter = filter;
    };


    MapChartWidgetModel.prototype.getUrl = function () {
        return Configuration.api.geographicalWidgetDistributionDataApi.format(this.currentFilter);
    };

    MapChartWidgetModel.prototype.__baseReload = WidgetBase.prototype._reload;
    MapChartWidgetModel.prototype._reload = function () {
        var self = this;

        return self.__baseReload().then(self.decorateServerData.bind(self));
    };

    MapChartWidgetModel.prototype.decorateCheckins = function (serverData) {
        var responseData = {
            data: {
                params: [],
                filters: this.filters
            }
        };

        var outputArray = serverData.Series[0].Points.map(function (record) {
            return {
                Latitude: record.Y,
                Longitude: record.X,
                Activity: record.Checkins
            };
        });

        responseData.data.params = outputArray;

        return responseData;
    };

    MapChartWidgetModel.prototype.decorateUsers = function (serverData) {
        var responseData = {
            data: {
                params: [],
                filters: this.filters
            }
        };

        var outputArray = serverData.Series[0].Points.map(function (record) {
            return {
                Latitude: record.Y,
                Longitude: record.X,
                FullName: record.Name + " " + record.Surname
            };
        });

        responseData.data.params = outputArray;

        return responseData;
    };

    MapChartWidgetModel.prototype.decorateServerData = function (serverData) {
        var self = this;
        switch (self.currentFilter) {
            case 'checkins' :
                return self.decorateCheckins(serverData);
            case 'users' :
                return self.decorateUsers(serverData);
            default         :
                return serverData;
        }
    };

    MapChartWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        return new MapChartWidgetModel(ajaxService);
    };

    return MapChartWidgetModel;
})
;