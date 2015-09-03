/**
 * Created by justin on 2/11/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/eventBus/WidgetEventBus',
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'plots/MapChart',
    'shared/services/config/PermissionsService'
], function(WidgetBaseView, WidgetEventBus, MapChartWidgetPresenter, BaseWidgetEventBus, EventBus, MapChart, PermissionsService){

    function MapChartWidgetView(scope, element, mapChart, presenter, permissionsService) {
        presenter = presenter || new MapChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        var self = this;
        self.widgetEventBus = EventBus.getInstance();
        self.mapChart = mapChart;
        self.permissionsService = permissionsService;
        self.selectedFilter = 'checkins';
        self.configureEvents();
    }

    MapChartWidgetView.inherits(WidgetBaseView, {
        selectedFilter: {
            get: function () {
                return this.$scope.selectedFilter;
            },
            set: function (value) {
                this.$scope.selectedFilter = value;
            }
        },
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
        self.isAssigned = false;

        var eventChannel = self.eventChannel;

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        eventChannel.onExpandingWidget(function(){
            setTimeout(self.reDraw.bind(self), 250);
        });

        self.fn.changeFilter = function (selectedFilter) {
            self.selectedFilter = selectedFilter;
            self.event.onFilterChanged();
        };

        self.fn.refreshChart = function () {
            self.refreshChart();
        };

        self.fn.canDisplayUsersInMap = self.canDisplayUsersInMap.bind(self);

        self.resizeHandling();
    };

    MapChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;

        self.refreshChart(responseData.data.params);
    };

    MapChartWidgetView.prototype.reDraw = function(){
        this.refreshChart(self.mapData);
    };

    MapChartWidgetView.prototype.refreshChart = function (data) {
        var self = this;
        if(data && data.length)
            self.mapData = data;

        if(!self.mapData) return;

        self.paintChart(self.element.find('.chart-place-holder'));
        self.mapChart.clearHeatMap();
        self.mapChart.clearPointMap();
        switch (self.selectedFilter) {
            case 'checkins':
                self.mapChart.applyHeatLayer(self.mapData);
                break;
            case 'users':
                self.mapChart.createUserMap(self.mapData);
                break;
            //case 'activity':
            //    self.mapChart.createPointMap(data);
            //    break;
            default:
                break;
        }
    };

    MapChartWidgetView.prototype.canDisplayUsersInMap = function () {
        return this.permissionsService.getPermission("geotrackviewenabled.isEnabled", true);
    };

    MapChartWidgetView.prototype.paintChart = function (element) {
        this.mapChart.createMap($(element)[0], {minZoom:2});
    };

    MapChartWidgetView.newInstance = function ($scope, $element, $mapChart, permissionsService, $viewRepAspect, $logErrorAspect) {
        var mapChart = $mapChart || MapChart.newInstance();
        var permissionsService = permissionsService || PermissionsService.newInstance();

        var view = new MapChartWidgetView($scope, $element, mapChart, undefined, permissionsService);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return MapChartWidgetView;
});