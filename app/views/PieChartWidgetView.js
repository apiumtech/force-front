/**
 * Created by justin on 1/26/15.
 */

app.registerView(function (container) {
    var WidgetBaseView = container.getView("views/WidgetBaseView");
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
    var PieChartWidgetModel = container.getModel('models/PieChartWidgetModel');
    var PieChartWidgetPresenter = container.getPresenter('presenters/PieChartWidgetPresenter');

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
        selectedTab: {
            get: function () {
                return this.$scope.selectedTab;
            },
            set: function (value) {
                this.$scope.selectedTab = value;
            }
        }
    });

    PieChartWidgetView.prototype.configureEvents = function () {
        var self = this;
        self.isAssigned = false;

        self.fn.assignWidget = function (outerScopeWidget) {
            self.widget = outerScopeWidget;
            self.event.onReloadWidgetStart();
        };

        self.fn.changeTab = function (newTab) {
            self.selectedTab = newTab;
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
        self.selectedTab = self.selectedTab || responseData.data.params.filters[0];

        self.refreshChart();
        self.event.onReloadWidgetDone();
    };

    PieChartWidgetView.prototype.refreshChart = function () {
        var self = this,
            data = self.data;

        if (!data || data === null || !isArray(data)) return;

        self.paintChart(self.element.find('.chart-place-holder'));
    };

    PieChartWidgetView.prototype.paintChart = function (element) {
        var plot = PieChart.basic(this.data).getOrElse(throwException("invalid plot!"));
        plot.paint($(element));
    };

    PieChartWidgetView.prototype.onMoveWidgetSuccess = function (data) {
        console.log("Widget moved to new position");
    };

    PieChartWidgetView.prototype.onMoveWidgetError = function (error) {
        this.showError(error);
    };

    PieChartWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || PieChartWidgetModel.newInstance().getOrElse(throwInstantiateException(PieChartWidgetModel));
        var presenter = $presenter || PieChartWidgetPresenter.newInstance().getOrElse(throwInstantiateException(PieChartWidgetPresenter));

        var view = new PieChartWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return PieChartWidgetView;
});