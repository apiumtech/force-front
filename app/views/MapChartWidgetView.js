/**
 * Created by justin on 2/11/15.
 */

app.registerView(function (container) {
    var WidgetBaseView = container.getView("views/WidgetBaseView");
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
    var MapChartWidgetModel = container.getModel('models/widgets/MapChartWidgetModel');
    var MapChartWidgetPresenter = container.getPresenter('presenters/widgets/MapChartWidgetPresenter');

    var BaseWidgetEventBus = container.getService('services/bus/BaseWidgetEventBus');

    var MapChart = container.getService("plots/MapChart");

    function MapChartWidgetView(scope, element, mapChart, model, presenter) {
        WidgetBaseView.call(this, scope, element, model, presenter);
        var self = this;
        self.mapChart = mapChart;
        self.selectedFilter = 'checkins';
        self.configureEvents();
    }

    MapChartWidgetView.prototype = Object.create(WidgetBaseView.prototype, {
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

        var eventChannel = self.eventChannel,
            scope = self.$scope;

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        self.fn.changeFilter = function (selectedFilter) {
            self.selectedFilter = selectedFilter;
            self.event.onFilterChanged();
        };

        self.fn.refreshChart = function () {
            self.refreshChart();
        };
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
            case 'activity':
                self.mapChart.createPointMap(data);
                break;
            default:
                break;
        }
    };

    MapChartWidgetView.prototype.paintChart = function (element) {
        this.mapChart.createMap($(element)[0]);
    };

    MapChartWidgetView.newInstance = function ($scope, $element, $mapChart, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || MapChartWidgetModel.newInstance();
        var mapChart = $mapChart || MapChart.newInstance();
        var presenter = $presenter || MapChartWidgetPresenter.newInstance();

        var view = new MapChartWidgetView($scope, $element, mapChart, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return MapChartWidgetView;
});