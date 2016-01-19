/**
 * Created by justin on 1/26/15.
 */

define([
    'shared/services/ajax/AuthAjaxService',
    'modules/saleAnalytics/widgets/WidgetBase',
    'shared/services/TranslatorService',
    'config',
    'moment',
], function(AuthAjaxService, WidgetBase, TranslatorService, Configuration, moment){
    'use strict';

    function MapChartWidgetModel(ajaxService) {


        var self = this;
        self.translator = TranslatorService.newInstance();

        self.currentFilter = 'users';

        self.filters = [{
            name: self.translator.translate('tabDistribution.geographicalDistribution.dropDown.itemSalesTeam'),
            key: 'users'
        }, {
            name: self.translator.translate('tabDistribution.geographicalDistribution.dropDown.check-ins'),
            key: 'checkins'
        }];

        self.queries = {
            users: "",
            period: ""
        };

        WidgetBase.call(self, ajaxService);
    }

    MapChartWidgetModel.inherits(WidgetBase, {});

    MapChartWidgetModel.prototype.changeQueryFilter = function (filter) {
        if (this.filters.map(function (filterValue) {
                return filterValue.key;
            }).indexOf(filter) == -1) {
            this.currentFilter = this.filters[0].key;
        } else {
            this.currentFilter = filter;
        }
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
                Latitude: Math.max(Math.min(record.Y, 85), -85),
                Longitude: Math.max(Math.min(record.X, 180), -180),
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
                FullName: record.Name + " " + record.Surname,
                PhotoUrl: record.PhotoUrl,
                Description: record.Description
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