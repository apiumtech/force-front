/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'shared/services/GoogleChartService',
    'shared/services/SimpleTemplateParser',
    'modules/saleAnalytics/widgets/GraphColorService',
    'jquery'
], function (WidgetBaseView, ScatterChartWidgetPresenter, BaseWidgetEventBus, WidgetEventBus, GoogleChartService, SimpleTemplateParser, GraphColorService, $) {

    function ScatterChartWidgetView(scope, element, chartService, presenter, widgetEventBus) {
        presenter = presenter || new ScatterChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        var self = this;
        self.widgetEventBus = widgetEventBus || WidgetEventBus.getInstance();
        self.chartService = chartService || GoogleChartService.newInstance();
        self.templateParser = SimpleTemplateParser.newInstance();
        self.widgetName = '';
        self.axisXTitle = 'Sales';
        self.axisYTitle = 'Activity Scores';
        self.chart = null;
        self.chartData = null;
        self.itemPerPage = 15;
        self.colorService = new GraphColorService();
        self.configureEvents();
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
        },
        legends: {
            get: function () {
                return this.$scope.legends;
            },
            set: function (value) {
                this.$scope.legends = value;
            }
        },
        currentLegends: {
            get: function () {
                return this.$scope.currentLegends;
            },
            set: function (value) {
                this.$scope.currentLegends = value;
            }
        },
        currentPage: {
            get: function () {
                return this.$scope.currentPage;
            },
            set: function (value) {
                this.$scope.currentPage = value;
            }
        }
    });

    ScatterChartWidgetView.prototype.configureEvents = function () {
        var self = this;
        self.isAssigned = false;
        var eventChannel = self.eventChannel;

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        eventChannel.onExpandingWidget(self.onWindowResize.bind(self));

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

        self.fn.pageCount = function () {
            return Math.ceil(self.legends.length / self.itemPerPage);
        };


        self.fn.setCurrentLegend = function(){
            if(!self.legends) return [];
            if(!self.currentPage) self.currentPage = 1;

            var begin = ((self.currentPage - 1) * self.itemPerPage),
                end = begin + self.itemPerPage;

            return self.legends.slice(begin, end);
        };

        self.fn.nextPage = function(){
            if(self.currentPage < self.fn.pageCount()) {
                self.currentPage++;
                self.currentLegends = self.fn.setCurrentLegend();
            }
        };

        self.fn.prevPage = function(){
            if(self.currentPage > 1) {
                self.currentPage--;
                self.currentLegends = self.fn.setCurrentLegend();
            }
        };

        self.resizeInterval = null;
        $(window).on('resize', self.onWindowResize.bind(self));
        self.$scope.$on('destroy', function () {
            $(window).unbind('resize', self.onWindowResize.bind(self));
        });
    };

    ScatterChartWidgetView.prototype.onExpandingWidget = function(){

    };

    ScatterChartWidgetView.prototype.onWindowResize = function () {
        // call refresh the chart
        var self = this;

        clearTimeout(self.resizeInterval);
        self.resizeInterval = setTimeout(function () {
            self.refreshChart();
        }, 250);
    };

    ScatterChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.data = responseData;
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

        if (data && data.chartData && (Object.getOwnPropertyNames(data.chartData) && Object.getOwnPropertyNames(data.chartData).length !== 0))
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

        if (data) self.data = data;

        var chartService = self.chartService;

        self.chartData = chartService.createDataTable(self.data);

        self.chart = chartService.createChart(element[0], 'scatter');

        self.legends = self.data.legends;

        self.currentLegends = self.fn.setCurrentLegend();

        self.chartOptions = {
            title: self.widgetName,
            selectionMode: 'none',
            aggregationTarget: 'category',
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
            hAxis: { title: self.axisYTitle, titleTextStyle: {italic: false}, gridlines: {color:'#DDD'}, baselineColor: '#54585a', minValue: 0, maxValue: 10, baseline: 5 },
            vAxis: { title: self.axisXTitle, titleTextStyle: {italic: false}, gridlines: {color:'#DDD'}, baselineColor: '#54585a', minValue: 0, maxValue: 10, baseline: 5 },

            colors: self.colorService.$colors.slice()
        };

        chartService.drawChart(self.chart, self.chartData, self.chartOptions);
    };

    ScatterChartWidgetView.prototype.reDraw = function(){
        var self = this;

        //if(!self.chart || !self.chartData || !self.chartOptions) return;
        //self.chartService.drawChart(self.chart, self.chartData, self.chartOptions);
    };

    var previousPoint = null;

    /*ScatterChartWidgetView.prototype.onPlotHover = function (event, position, chartItem) {
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
    };*/

    ScatterChartWidgetView.newInstance = function ($scope, $element, $chartService, $viewRepAspect, $logErrorAspect) {

        var view = new ScatterChartWidgetView($scope, $element);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ScatterChartWidgetView;
});