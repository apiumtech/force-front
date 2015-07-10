/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/eventBus/WidgetEventBus',
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'plots/BarChart'
], function(WidgetBaseView, WidgetEventBus, BarChartWidgetPresenter, BaseWidgetEventBus, EventBus, BarChart){

    function BarChartWidgetView(scope, element, presenter) {
        presenter = presenter || new BarChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        var self = this;
        self.widgetEventBus = EventBus.getInstance();
        self.configureEvents();
    }

    BarChartWidgetView.inherits(WidgetBaseView, {
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
        tickLabels: {
            get: function () {
                return this.$scope.tickLabels;
            },
            set: function (value) {
                this.$scope.tickLabels = value;
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

    BarChartWidgetView.prototype.configureEvents = function () {
        var self = this;
        self.isAssigned = false;
        var eventChannel = self.eventChannel;

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        eventChannel.onExpandingWidget(self.refreshChart.bind(self));

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

    BarChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.data = responseData.data.params.bars;
        self.tickLabels = responseData.data.params.axis.x;
        self.tabs = responseData.data.params.filters;
        self.selectedFilter = self.selectedFilter || responseData.data.params.filters[0].key;

        self.refreshChart();
    };

    BarChartWidgetView.prototype.refreshChart = function () {
        var self = this,
            data = self.data;

        if (!data || data === null || !isArray(data)) return;

        self.paintChart(self.element.find('.chart-place-holder'));
    };

    BarChartWidgetView.prototype.paintChart = function (element) {
        var plot = BarChart.basic(this.data, this.tickLabels);
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

    BarChartWidgetView.prototype.extractFilters = function () {
        var self = this;
        self.filters = self.data.filters;
        var filterList = self.filters,
            currentSelectedFilter = self.selectedFilter;

        self.selectedFilter =
            currentSelectedFilter && filterList.map(function (f) {
                return f.key;
            }).indexOf(currentSelectedFilter) !== -1 ?
                currentSelectedFilter :
                self.filters[0].key;
    };

    BarChartWidgetView.prototype.onMoveWidgetSuccess = function (data) {

    };

    BarChartWidgetView.prototype.onMoveWidgetError = function (error) {
        this.showError(error);
    };

    BarChartWidgetView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {

        var view = new BarChartWidgetView($scope, $element);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return BarChartWidgetView;
});