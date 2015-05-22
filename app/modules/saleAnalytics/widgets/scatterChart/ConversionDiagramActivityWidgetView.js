/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/scatterChart/ConversionDiagramActivityWidgetPresenter',
    'modules/saleAnalytics/widgets/scatterChart/ConversionDiagramActivityWidgetModel',
    'modules/widgets/BaseWidgetEventBus'
], function (WidgetBaseView, SingleLineChartWidgetPresenter, SingleLineChartWidgetModel, BaseWidgetEventBus) {

    function ConversionDiagramActivityWidgetView(scope, element, model, presenter) {
        WidgetBaseView.call(this, scope, element, model, presenter);
        var self = this;
        self.configureEvents();
    }

    ConversionDiagramActivityWidgetView.prototype = Object.create(WidgetBaseView.prototype, {
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

    ConversionDiagramActivityWidgetView.prototype.configureEvents = function () {
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
            self.event.onFilterChanged();
        };

        self.fn.refreshChart = function () {
            self.refreshChart();
        };
    };

    ConversionDiagramActivityWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.data = responseData.data.params;
        self.extractFilters();
        self.refreshChart();
    };

    ConversionDiagramActivityWidgetView.prototype.extractFilters = function () {
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

    ConversionDiagramActivityWidgetView.prototype.refreshChart = function () {
        var self = this,
            data = self.data;

        if (!data || data === null) return;

        var chartFields = [];

        data.fields.forEach(function (field) {
            var lineGraph = ConversionDiagramActivityWidgetView.getLineGraphInstance(field);
            chartFields.push(lineGraph);
        });

        self.paintChart(self.element.find('.chart-place-holder'), chartFields);
    };

    ConversionDiagramActivityWidgetView.getLineGraphInstance = function (field) {
        return LineGraphPlot.newInstance(field.name, field.data, false, false);
    };

    ConversionDiagramActivityWidgetView.prototype.paintChart = function (element, chartFields) {
        var plot = SingleLineChart.basic(chartFields, []);
        plot.paint($(element));
        plot.onHover(this.onPlotHover.bind(this));
    };

    var previousPoint = null;

    ConversionDiagramActivityWidgetView.prototype.onPlotHover = function (event, position, chartItem) {
        function showTooltip(x, y, contents) {
            $('<div id="tooltip" class="flot-tooltip">' + contents + '</div>').css({
                top: y - 45,
                left: x - 55
            }).appendTo("body").fadeIn(200);
        }

        if (chartItem) {
            if (previousPoint !== chartItem.dataIndex) {
                previousPoint = chartItem.dataIndex;
                $("#tooltip").remove();
                var y = chartItem.datapoint[1].toFixed(2);

                var content = chartItem.series.label + " " + y;
                showTooltip(chartItem.pageX, chartItem.pageY, content);
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
        event.preventDefault();
    };

    ConversionDiagramActivityWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || SingleLineChartWidgetModel.newInstance();
        var presenter = $presenter || SingleLineChartWidgetPresenter.newInstance();

        var view = new ConversionDiagramActivityWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ConversionDiagramActivityWidgetView;
});