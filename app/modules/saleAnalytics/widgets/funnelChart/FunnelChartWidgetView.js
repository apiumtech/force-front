define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/eventBus/WidgetEventBus',
    'modules/saleAnalytics/widgets/funnelChart/FunnelChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'shared/services/GoogleChartService',
    'modules/saleAnalytics/widgets/GraphColorService'
], function(WidgetBaseView, WidgetEventBus, FunnelChartWidgetPresenter, BaseWidgetEventBus, EventBus, GoogleChartService, GraphColorService){
    'use strict';

    function FunnelChartWidgetView(scope, element, presenter) {
        presenter = presenter || new FunnelChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        var self = this;
        self.colorService = new GraphColorService();
        self.widgetEventBus = EventBus.getInstance();
        self.chartService = GoogleChartService.newInstance();
        self.configureEvents();
    }


    FunnelChartWidgetView.inherits(WidgetBaseView, {
        eventChannel: {
            get: function () {
                return this.$scope.eventChannel || (this.$scope.eventChannel = BaseWidgetEventBus.newInstance());
            },
            set: function (value) {
                this.$scope.eventChannel = value;
            }
        }
    });


    FunnelChartWidgetView.prototype.configureEvents = function () {
        var self = this;
        var eventChannel = self.eventChannel;

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        eventChannel.onExpandingWidget(function(){
            setTimeout(self.paintChart.bind(self), 250);
        });

        self.fn.assignWidget = function (outerScopeWidget) {
            self.widget = outerScopeWidget;
            self.event.onReloadWidgetStart();
        };

        self.fn.refreshChart = function () {
            self.paintChart();
        };

        self.resizeHandling();
    };


    FunnelChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.data = responseData;
        self.paintChart();
    };


    FunnelChartWidgetView.prototype.reDraw = function () {
        this.paintChart();
    };


    FunnelChartWidgetView.prototype.paintChart = function () {
        var self = this;
        var data = self.data;
        var chartService = self.chartService;
        var element = self.element.find('.chart-place-holder');

        if (!data || !data.Series || !Array.isArray(data.Series) || data.Series.length===0) {
            return;
        }

        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn('string', 'The Label');
        dataTable.addColumn('number', 'Transparent');
        dataTable.addColumn('number', 'Value');
        dataTable.addColumn({'type': 'string', 'role': 'style'});
        dataTable.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});

        var createTooltip = function(label, percent, originalPoint){
            return '<div style="padding:10px;"><strong>'+ label +'</strong><br />'+
                    originalPoint +' ('+ percent.toFixed(1) +'%)</div>';
        };

        var points = self.data.Series[0].Points.map(function(item){
            return item.Y;
        });
        points = points.sort(function (a, b) {
            return parseFloat(a) - parseFloat(b);
        });
        points.reverse();
        var largestPoint = points[0];
        var percentUnit = largestPoint / 100;

        var columns = [];
        var opacityIncrement = 100/points.length;
        points.forEach(function(originalPoint, index){
            var col = [];
            var label = self.data.Labels[0][index];
            col.push(label);
            var percent = originalPoint / percentUnit;
            col.push(50 - percent/2);
            col.push(percent);
            var opacity = (100-index*opacityIncrement)/100;
            col.push('opacity: '+ opacity );
            col.push( createTooltip(label, percent, originalPoint) );
            columns.push(col);
        });
        dataTable.addRows(columns);

        self.chartData = dataTable;

        var chartArea = self.$scope.chartArea || {
                left: "10%",
                top: "10%",
                height: "80%",
                width: "80%"
            };
        self.chart = chartService.createChart(element[0], 'hbar');

        self.chartOptions = {
            title: self.widgetName,
            colors: ["transparent",self.colorService.$colors.slice()[0]],
            isStacked: true,
            hAxis: {
                minValue: 0,
                maxValue: 100,
                ticks: []
            },
            bar: {
                groupWidth: '100%'
            },
            tooltip: {
                isHtml: true
            },
            legend: { position: "none" },
            width: '100%',
            height: '100%',
            chartArea: chartArea
        };



        chartService.drawChart(self.chart, self.chartData, self.chartOptions);
    };


    FunnelChartWidgetView.prototype.extractFilters = function () {
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


    FunnelChartWidgetView.prototype.onMoveWidgetSuccess = function (data) {
    };


    FunnelChartWidgetView.prototype.onMoveWidgetError = function (error) {
        this.showError(error);
    };


    FunnelChartWidgetView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {
        var view = new FunnelChartWidgetView($scope, $element);
        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return FunnelChartWidgetView;
});