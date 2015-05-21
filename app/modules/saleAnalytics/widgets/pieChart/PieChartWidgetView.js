/**
 * Created by apium on 5/12/15.
 */
define([], function(){
    var WidgetBaseView = container.getView("views/widgets/WidgetBaseView");
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
    var PieChartWidgetPresenter = container.getPresenter('presenters/widgets/PieChartWidgetPresenter');

    var BaseWidgetEventBus = container.getService('services/bus/BaseWidgetEventBus');

    var PieChart = container.getService('plots/PieChart');

    function PieChartWidgetView(scope, element, model, presenter) {
        WidgetBaseView.call(this, scope, element, model, presenter);
        var self = this;
        self.configureEvents();
    }

    PieChartWidgetView.prototype = Object.create(WidgetBaseView.prototype, {
        tabs: {
            get: function () {
                return this.$scope.tabs;
            },
            set: function (value) {
                this.$scope.tabs = value;
            }
        },
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

    PieChartWidgetView.prototype.configureEvents = function () {
        var self = this;
        self.isAssigned = false;
        var eventChannel = self.eventChannel,
            scope = self.$scope;

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        self.fn.assignWidget = function (outerScopeWidget) {
            self.widget = outerScopeWidget;
            self.event.onReloadWidgetStart();
        };

        self.fn.changeFilter = function (newTab) {
            self.selectedFilter = newTab;
            self.event.onTabChanged();
        };

        self.fn.refreshChart = function () {
            self.refreshChart();
        };
    };

    PieChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.data = responseData.data.params.params;
        self.tabs = responseData.data.params.filters;
        self.selectedFilter = self.selectedFilter || responseData.data.params.filters[0].key;

        self.refreshChart();
    };

    PieChartWidgetView.prototype.refreshChart = function () {
        var self = this,
            data = self.data;

        if (!data || data === null || !isArray(data)) return;

        self.paintChart(self.element.find('.chart-place-holder'));
    };

    PieChartWidgetView.prototype.paintChart = function (element) {
        var plot = PieChart.basic(this.data);
        plot.paint($(element));
    };

    PieChartWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || PieChartWidgetModel.newInstance();
        var presenter = $presenter || PieChartWidgetPresenter.newInstance();

        var view = new PieChartWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return PieChartWidgetView;
});