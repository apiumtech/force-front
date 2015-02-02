/**
 * Created by justin on 1/26/15.
 */

app.registerView(function (container) {
    var WidgetBaseView = container.getView("views/WidgetBaseView");
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
    var BarChartWidgetModel = container.getModel('models/BarChartWidgetModel');
    var BarChartWidgetPresenter = container.getPresenter('presenters/BarChartWidgetPresenter');

    var BarChart = container.getService('plots/BarChart');

    function BarChartWidgetView(scope, element, model, presenter) {
        WidgetBaseView.call(this, scope, element, model, presenter);
        var self = this;
        self.configureEvents();
    }

    BarChartWidgetView.prototype = Object.create(WidgetBaseView.prototype, {
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
        },
        tickLabels: {
            get: function () {
                return this.$scope.tickLabels;
            },
            set: function (value) {
                this.$scope.tickLabels = value;
            }
        }
    });

    BarChartWidgetView.prototype.configureEvents = function () {
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

    BarChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.data = responseData.data.params.bars;
        self.tickLabels = responseData.data.params.axis.x;
        self.tabs = responseData.data.params.filters;
        self.selectedTab = self.selectedTab || responseData.data.params.filters[0];

        self.refreshChart();
        self.event.onReloadWidgetDone();
    };

    BarChartWidgetView.prototype.refreshChart = function () {
        var self = this,
            data = self.data;

        if (!data || data === null || !isArray(data)) return;

        self.paintChart(self.element.find('.chart-place-holder'));
    };

    BarChartWidgetView.prototype.paintChart = function (element) {
        var plot = BarChart.basic(this.data, this.tickLabels).getOrElse(throwException("invalid plot!"));
        plot.paint($(element));
        plot.onHover(this.onPlotHover.bind(this));
    };

    var previousXValue = null;
    var previousYValue = null;

    BarChartWidgetView.prototype.onPlotHover = function (event, position, chartItem) {
        function showTooltip2(x, y, contents) {
            $('<div id="tooltip" class="flot-tooltip">' + contents + '</div>').css({
                top: y,
                left: x + 35
            }).appendTo("body").fadeIn(200);
        }

        if (chartItem) {
            var y = chartItem.datapoint[1] - chartItem.datapoint[2];

            if (previousXValue != chartItem.series.label || y != previousYValue) {
                previousXValue = chartItem.series.label;
                previousYValue = y;
                $("#tooltip").remove();

                showTooltip2(chartItem.pageX, chartItem.pageY, y + " " + chartItem.series.label);
            }
        } else {
            $("#tooltip").remove();
            previousXValue = null;
            previousYValue = null;
        }
    };

    BarChartWidgetView.prototype.onMoveWidgetSuccess = function (data) {
        console.log("Widget moved to new position");
    };

    BarChartWidgetView.prototype.onMoveWidgetError = function (error) {
        this.showError(error);
    };

    BarChartWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || BarChartWidgetModel.newInstance().getOrElse(throwInstantiateException(BarChartWidgetModel));
        var presenter = $presenter || BarChartWidgetPresenter.newInstance().getOrElse(throwInstantiateException(BarChartWidgetPresenter));

        var view = new BarChartWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return BarChartWidgetView;
});