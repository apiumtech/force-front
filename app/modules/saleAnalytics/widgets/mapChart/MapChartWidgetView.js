/**
 * Created by justin on 2/11/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/eventBus/WidgetEventBus',
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'modules/saleAnalytics/widgets/mapChart/MapChart',
    'shared/services/config/PermissionsService',
    'shared/services/TranslatorService',
    'shared/services/StorageService',
    'jquery'
], function(WidgetBaseView, WidgetEventBus, MapChartWidgetPresenter, BaseWidgetEventBus, EventBus, MapChart, PermissionsService, TranslatorService, StorageService, $) {
    'use strict';

    var HEAT_MAP = 'HEAT_MAP';
    var POINT_MAP = 'POINT_MAP';

    function MapChartWidgetView(scope, element, mapChart, presenter, permissionsService) {
        presenter = presenter || new MapChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);

        var self = this;
        self.widgetEventBus = EventBus.getInstance();
        self.mapChart = mapChart;
        self.permissionsService = permissionsService;
        self.translator = TranslatorService.newInstance();
        self.storageService = StorageService.newInstance();

        self.storageService.remove('mapZoom', true);
        self.storageService.remove('mapCenter', true);

        self.$scope.selectedFilter = {
            name: self.translator.translate('tabDistribution.geographicalDistribution.dropDown.itemSalesTeam'),
            key: 'users'
        };
        self.$scope.selectedMapType = HEAT_MAP;

        self.configureEvents();
    }


    MapChartWidgetView.inherits(WidgetBaseView, {
        eventChannel: {
            get: function () {
                return this.$scope.eventChannel || (this.$scope.eventChannel = BaseWidgetEventBus.newInstance());
            },
            set: function (value) {
                this.$scope.eventChannel = value;
            }
        }
    });


    MapChartWidgetView.prototype.configureEvents = function () {
        var self = this;

        var eventChannel = self.eventChannel;

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        eventChannel.onExpandingWidget(function(){
            setTimeout(self.reDraw.bind(self), 250);
        });

        self.fn.changeFilter = function (selectedFilter) {
            self.mapChart.clearSavedZoomAndCenter();
            self.$scope.selectedFilter = selectedFilter;
            self.event.onFilterChanged();
            self.applyWidgetDescription();
        };

        self.fn.refreshChart = function () {
            self.refreshChart();
        };

        self.fn.selectMapType = function (mapType) {
            self.$scope.selectedMapType = mapType;
            self.reDraw();
        };

        self.fn.canDisplayUsersInMap = self.canDisplayUsersInMap.bind(self);

        self.resizeHandling();
    };

    MapChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.$scope.filters = responseData.data.filters;
        self.refreshChart(responseData.data.params);
    };

    MapChartWidgetView.prototype.reDraw = function(){
        this.refreshChart(this.mapData);
    };

    MapChartWidgetView.prototype.refreshChart = function (data) {
        var self = this;
        if(data && data.length){
            self.mapData = data;
        }

        if(!self.mapData) {
            return;
        }

        self.paintChart(self.element.find('.chart-place-holder'));
        self.mapChart.clearHeatMap();
        self.mapChart.clearPointMap();

        if( self.$scope.selectedFilter.key === 'users' ) {
            self.mapChart.createUserMap(self.mapData);
        } else {
            if(self.$scope.selectedMapType === HEAT_MAP) {
                self.mapChart.applyHeatLayer(self.mapData);
            } else if(self.$scope.selectedMapType === POINT_MAP) {
                self.mapChart.createPointMap(self.mapData, self.$scope.selectedFilter.key);
            } else {
                throw new Error('Unknown map type');
            }
        }
    };

    MapChartWidgetView.prototype.canDisplayUsersInMap = function () {
        return this.permissionsService.getPermission("geotrackviewenabled.isEnabled", true) ;
    };

    MapChartWidgetView.prototype.paintChart = function (element) {
        this.mapChart.createMap($(element)[0], {minZoom:2});
    };

    MapChartWidgetView.newInstance = function ($scope, $element, $mapChart, permissionsService, $viewRepAspect, $logErrorAspect) {
        var mapChart = $mapChart || MapChart.newInstance();
        permissionsService = permissionsService || PermissionsService.newInstance();

        var view = new MapChartWidgetView($scope, $element, mapChart, undefined, permissionsService);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return MapChartWidgetView;
});