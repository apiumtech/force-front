/**
 * Created by apium on 5/12/15.
 */
define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'plots/PieChart',
    'shared/services/GoogleChartService',
    'modules/saleAnalytics/widgets/GraphColorService'
], function (WidgetBaseView, PieChartWidgetPresenter, BaseWidgetEventBus, WidgetEventBus, PieChart, GoogleChartService, GraphColorService) {

    function PieChartWidgetView(scope, element, presenter) {
        presenter = presenter || new PieChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        var self = this;
        self.colorService = new GraphColorService();
        self.widgetEventBus = WidgetEventBus.getInstance();
        self.chartService = GoogleChartService.newInstance();
        self.configureEvents();
    }

    PieChartWidgetView.inherits(WidgetBaseView, {
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
            self.event.onTabChanged();
        };

        self.fn.refreshChart = function () {
            self.refreshChart();
        };

        self.resizeHandling();
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

    PieChartWidgetView.prototype.reDraw = function(){
        //if(PieChart.getChart())
        //PieChart.getChart().draw();
        var self = this;
        self.paintChart(self.element.find('.chart-place-holder'));
    };

    PieChartWidgetView.prototype.paintChart = function (element) {
        //var plot = PieChart.basic(this.data);
        //plot.paint($(element));

        var self = this;
        var chartService = self.chartService;

        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn('string', '---');
        dataTable.addColumn('number', '---');
        var columns = [];
        self.data.forEach(function(item){
            columns.push([item.label, item.data]);
        });
        dataTable.addRows(columns);

        self.chartData = dataTable;
        self.chart = chartService.createChart(element[0], 'pie');

        self.chartOptions = {
            title: self.widgetName,
            colors: self.colorService.$colors.slice()
        };

        chartService.drawChart(self.chart, self.chartData, self.chartOptions);
    };

    PieChartWidgetView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {

        var view = new PieChartWidgetView($scope, $element);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return PieChartWidgetView;
});