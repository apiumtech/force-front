/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'shared/services/GoogleChartService',
    'shared/services/SimpleTemplateParser',
    'jquery'
], function (WidgetBaseView, ScatterChartWidgetPresenter, BaseWidgetEventBus, GoogleChartService, SimpleTemplateParser, $) {

    function ScatterChartWidgetView(scope, element, chartService, presenter) {
        presenter = presenter || new ScatterChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        var self = this;
        self.chartService = chartService || GoogleChartService.newInstance();
        self.templateParser = SimpleTemplateParser.newInstance();
        self.configureEvents();
        self.widgetName = '';
        self.axisXTitle = 'Sales';
        self.axisYTitle = 'Activity Scores';
        self.chart = null;
        self.chartData = null;
    }

    ScatterChartWidgetView.inherits(WidgetBaseView, {
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

    ScatterChartWidgetView.prototype.configureEvents = function () {
        var self = this;
        self.isAssigned = false;
        var eventChannel = self.eventChannel;

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

        $(window).on('resize', self.onWindowResize.bind(self));

        self.$scope.$on('destroy', function () {
            $(window).unbind('resize', self.onWindowResize.bind(self));
        });
    };

    ScatterChartWidgetView.prototype.onWindowResize = function () {
        // call refresh the chart
        var self = this;
        setTimeout(function () {
            self.refreshChart();
        }, 0);
    };

    ScatterChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.data = responseData.data;
        self.widgetName = responseData.name;
        self.refreshChart();
    };

    ScatterChartWidgetView.prototype.extractFilters = function () {
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

    ScatterChartWidgetView.prototype.refreshChart = function () {
        var self = this,
            data = self.data;

        if (data && (Object.getOwnPropertyNames(data) && Object.getOwnPropertyNames(data).length !== 0))
            self.paintChart(self.element.find('.chart-place-holder'), data);
    };


    ScatterChartWidgetView.prototype.generateTooltip = function (element) {
        var toolTipTemplate = $('#popup_tooltip').html();

        return this.templateParser.parseTemplate(toolTipTemplate, element);
    };

    ScatterChartWidgetView.prototype.updateChart = function (element) {


    };

    ScatterChartWidgetView.prototype.paintChart = function (element, data) {

        var self = this;

        var chartService = self.chartService;

        if (!self.chart || !self.chartData) {

            self.chartData = chartService.createDataTable(self.data);

            self.chart = chartService.createChart(element[0], 'scatter');
        }

        var options = {
            title: self.widgetName,
            selectionMode: 'none',
            aggregationTarget: 'category',
            tooltip: {isHtml: false, trigger: 'selection'},
            series: {
                0: {axis: self.axisXTitle},
                1: {axis: self.axisYTitle}
            },
            axes: {
                y: {
                    'sales': {label: self.axisXTitle},
                    'activity scores': {label: self.axisYTitle}
                }
            },

            hAxis: {title: self.axisYTitle},
            vAxis: {title: self.axisXTitle}
        };
        
        chartService.drawChart(self.chart, self.chartData, options);
    };

    var previousPoint = null;

    ScatterChartWidgetView.prototype.onPlotHover = function (event, position, chartItem) {
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

    ScatterChartWidgetView.newInstance = function ($scope, $element, $chartService, $viewRepAspect, $logErrorAspect) {

        var view = new ScatterChartWidgetView($scope, $element);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ScatterChartWidgetView;
});