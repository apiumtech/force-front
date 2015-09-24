/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'plots/SingleLineChart',
    'plots/LineGraphPlot',
    'modules/saleAnalytics/widgets/GraphColorService',
    'shared/services/GoogleChartService'
], function (WidgetBaseView, SingleLineChartWidgetPresenter, BaseWidgetEventBus, WidgetEventBus, SingleLineChart, LineGraphPlot, GraphColorService, GoogleChartService) {

    function SingleLineChartWidgetView(scope, element, presenter) {
        presenter = presenter || new SingleLineChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        var self = this;
        self.colorService = new GraphColorService();
        self.singleLineChart = SingleLineChart;
        self.widgetEventBus = WidgetEventBus.getInstance();
        self.chartService = GoogleChartService.newInstance();
        self.configureEvents();
    }

    SingleLineChartWidgetView.inherits(WidgetBaseView, {
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

    SingleLineChartWidgetView.prototype.configureEvents = function () {
        var self = this;
        self.isAssigned = false;
        var eventChannel = self.eventChannel;

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        eventChannel.onExpandingWidget(function(){
            setTimeout(self.reDraw.bind(self), 250);
        });

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

        self.resizeHandling();
    };

    SingleLineChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.data = responseData.data.params;
        self.extractFilters();
        self.refreshChart();
    };

    SingleLineChartWidgetView.prototype.extractFilters = function () {
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

    SingleLineChartWidgetView.prototype.refreshChart = function () {
        var self = this,
            data = self.data;

        if (!data || data === null) return;

        var chartFields = [];

        data.fields.forEach(function (field) {
            var lineGraph = SingleLineChartWidgetView.getLineGraphInstance(field, self.colorService.getNextColor());
            chartFields.push(lineGraph);
        });

        this.colorService.initialize();

        self.paintChart(self.element.find('.chart-place-holder'), chartFields);
    };

    SingleLineChartWidgetView.prototype.reDraw = function(){
        var self = this;
        //if(!self.plot) return;
        //if(!SingleLineChart.getChart()) return;
        //SingleLineChart.getChart().draw();

        self.refreshChart();
    };

    SingleLineChartWidgetView.getLineGraphInstance = function (field, color) {
        return LineGraphPlot.newInstance(field.name, field.data, false, false, color);
    };

    SingleLineChartWidgetView.prototype.paintChart = function (element, chartFields) {
        //var self = this;
        //self.plot = SingleLineChart.basic(chartFields, []);
        //self.plot.paint($(element));
        //self.plot.onHover(this.onPlotHover.bind(this));

        var self = this;
        var chartService = self.chartService;

        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn('number', 'Hora');
        self.data.fields.forEach(function(serie){
            dataTable.addColumn('number', serie.name);
        });

        var columns = [];
        self.data.fields.forEach(function(serie){
            var horas = 0;
            serie.data.forEach(function(item) {
                columns.push([horas++, item]);
            });
        });
        dataTable.addRows(columns);

        self.chartData = dataTable;
        //self.chart = chartService.createChart(element[0], 'line');
        self.chart = chartService.createChart(element[0], 'bar');

        self.chartOptions = {
            title: self.widgetName,
            colors: self.colorService.$colors.slice(),
            hAxis: {
                minValue: 0,
                maxValue: 24,
                ticks: [{v:0,f:"0h"}, {v:4,f:"4h"}, {v:8,f:"8h"}, {v:12,f:"12h"}, {v:16,f:"16h"}, {v:20,f:"20h"}, {v:24,f:"24h"}]
            },
            legend: { position: 'top', alignment: 'end' },
            width: '100%',
            height: '100%',
            chartArea: {
                left: "8%",
                top: "10%",
                height: "80%",
                width: "86%"
            }
        };

        chartService.drawChart(self.chart, self.chartData, self.chartOptions);
    };

    var previousPoint = null;

    SingleLineChartWidgetView.prototype.onPlotHover = function (event, position, chartItem) {
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

    SingleLineChartWidgetView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {

        var view = new SingleLineChartWidgetView($scope, $element);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return SingleLineChartWidgetView;
});