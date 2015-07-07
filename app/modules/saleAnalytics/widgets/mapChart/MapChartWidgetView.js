/**
 * Created by justin on 2/11/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/eventBus/WidgetEventBus',
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'plots/MapChart'
], function(WidgetBaseView, WidgetEventBus, MapChartWidgetPresenter, BaseWidgetEventBus, MapChart){

    function MapChartWidgetView(scope, element, mapChart, presenter) {
        presenter = presenter || new MapChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        var self = this;
        self.mapChart = mapChart;
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

        self.fn.changeFilter = function (selectedFilter) {
            self.selectedFilter = selectedFilter;
            self.event.onFilterChanged();
        };

        self.fn.refreshChart = function () {
            self.refreshChart();
        };

        self.fn.shouldShowOption = self.shouldShowOption.bind(self);
    };

    MapChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;

        self.refreshChart(responseData.data.params);
    };

    MapChartWidgetView.prototype.refreshChart = function (data) {
        var self = this;
        self.paintChart(self.element.find('.chart-place-holder'));
        self.mapChart.clearHeatMap();
        self.mapChart.clearPointMap();
        switch (self.selectedFilter) {
            case 'checkins':
                self.mapChart.applyHeatLayer(data);
                break;
            case 'users':
                self.mapChart.createUserMap(data);
                break;
            //case 'activity':
            //    self.mapChart.createPointMap(data);
            //    break;
            default:
                break;
        }
    };

    MapChartWidgetView.prototype.shouldShowOption = function (itemToCheck) {
        return this.widget.option.split("|").indexOf(itemToCheck) > -1;
    };

    MapChartWidgetView.prototype.paintChart = function (element) {
        this.mapChart.createMap($(element)[0], {minZoom:2});
    };

    MapChartWidgetView.newInstance = function ($scope, $element, $mapChart, $viewRepAspect, $logErrorAspect) {
        var mapChart = $mapChart || MapChart.newInstance();

        var view = new MapChartWidgetView($scope, $element, mapChart);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return MapChartWidgetView;
});