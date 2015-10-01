/**
 * Created by justin on 1/26/15.
 */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/eventBus/WidgetEventBus',
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'shared/services/GoogleChartService',
    'modules/saleAnalytics/widgets/GraphColorService'
], function(WidgetBaseView, WidgetEventBus, BarChartWidgetPresenter, BaseWidgetEventBus, EventBus, GoogleChartService, GraphColorService){

    function BarChartWidgetView(scope, element, presenter) {
        presenter = presenter || new BarChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        var self = this;
        self.colorService = new GraphColorService();
        self.widgetEventBus = EventBus.getInstance();
        self.chartService = GoogleChartService.newInstance();
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

        eventChannel.onExpandingWidget(function(){
            setTimeout(self.paintChart.bind(self), 250);
        });

        self.fn.assignWidget = function (outerScopeWidget) {
            self.widget = outerScopeWidget;
            self.event.onReloadWidgetStart();
        };

        self.fn.changeFilter = function (newTab) {
            self.selectedFilter = newTab;
            self.event.onTabChanged();
        };

        self.fn.refreshChart = function () {
            self.paintChart();
        };

        self.resizeHandling();
    };


    BarChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.data = responseData.data.params.bars;
        self.tickLabels = responseData.data.params.axis.x;
        self.tabs = responseData.data.params.filters;
        self.selectedFilter = self.selectedFilter || responseData.data.params.filters[0].key;
        self.paintChart();
    };


    BarChartWidgetView.prototype.reDraw = function () {
        this.paintChart();
    };


    BarChartWidgetView.prototype.paintChart = function () {
        var self = this;
        var data = self.data;
        var chartService = self.chartService;
        var element = self.element.find('.chart-place-holder');

        if (!data || data === null || !isArray(data)) {
            return;
        }

        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn('string', '');
        self.data.forEach(function(serie){
            dataTable.addColumn('number', serie.label);
        });

        var index = 0;
        var columns = [];
        self.tickLabels.forEach(function(tick){
            var col = [];
            col.push(tick);
            self.data.forEach(function(serie){
                col.push( serie.data[index][1]  );
            });
            columns.push(col);
            index++;
        });
        dataTable.addRows(columns);

        self.chartData = dataTable;
        var barType = self.$scope.horizontal === true ? 'hbar' : 'bar';
        var legend = self.$scope.legend || { position: 'top', alignment: 'end' };
        var chartArea = self.$scope.chartArea || {
                left: "25%",
                top: "10%",
                height: "80%",
                width: "65%"
            };
        self.chart = chartService.createChart(element[0], barType);

        self.chartOptions = {
            title: self.widgetName,
            colors: self.colorService.$colors.slice(),
            isStacked: self.$scope.stacked,
            hAxis: {
                minValue: 0,
                maxValue: 100,
                ticks: [0, 20, 40, 60, 80, 100]
            },
            legend: legend,
            width: '100%',
            height: '100%',
            chartArea: chartArea
        };



        chartService.drawChart(self.chart, self.chartData, self.chartOptions);
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