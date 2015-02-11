/**
 * Created by justin on 2/11/15.
 */

app.registerView(function (container) {
    var WidgetBaseView = container.getView("views/WidgetBaseView");
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
    var MapChartWidgetModel = container.getModel('models/MapChartWidgetModel');
    var MapChartWidgetPresenter = container.getPresenter('presenters/MapChartWidgetPresenter');

    var MapChart = container.getService("plots/MapChart");
    var defaultImageUrl = "https://fmassets.s3-eu-west-1.amazonaws.com/pro/2122/img/default.png";

    function MapChartWidgetView(scope, element, mapChart, model, presenter) {
        WidgetBaseView.call(this, scope, element, model, presenter);
        var self = this;
        self.mapChart = mapChart;
        self.filters = ['checkins', 'users', 'activity'];
        self.selectedFilter = 'checkins';
        self.map = null;
        self.configureEvents();
    }

    MapChartWidgetView.prototype = Object.create(WidgetBaseView.prototype, {
        filters: {
            get: function () {
                return this.$scope.filters;
            },
            set: function (value) {
                this.$scope.filters = value;
            }
        },
        selectedFilter: {
            get: function () {
                return this.$scope.selectedFilter;
            },
            set: function (value) {
                this.$scope.selectedFilter = value;
            }
        }
    });

    MapChartWidgetView.prototype.configureEvents = function () {
        var self = this;
        self.isAssigned = false;

        self.fn.assignWidget = function (outerScopeWidget) {
            self.widget = outerScopeWidget;
            self.event.onReloadWidgetStart();
        };

        self.fn.changeFilter = function () {
            console.log(self.selectedFilter);
            self.event.onFilterChanged();
        };

        self.fn.refreshChart = function () {
            self.refreshChart();
        };
    };

    MapChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.data = responseData.data.params.params;

        self.refreshChart();
        self.event.onReloadWidgetDone();
    };

    MapChartWidgetView.prototype.refreshChart = function () {
        var self = this,
            data = self.data;

        self.paintChart(self.element.find('.chart-place-holder'));
    };

    MapChartWidgetView.prototype.paintChart = function (element) {
        this.map = this.mapChart.createMap($(element)[0]);
    };

    MapChartWidgetView.newInstance = function ($scope, $element, $mapChart, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || MapChartWidgetModel.newInstance().getOrElse(throwInstantiateException(MapChartWidgetModel));
        var mapChart = $mapChart || MapChart.newInstance().getOrElse(throwInstantiateException(MapChart));
        var presenter = $presenter || MapChartWidgetPresenter.newInstance().getOrElse(throwInstantiateException(MapChartWidgetPresenter));

        var view = new MapChartWidgetView($scope, $element, mapChart, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return MapChartWidgetView;
});