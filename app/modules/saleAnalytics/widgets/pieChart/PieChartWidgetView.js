/* global google */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'shared/services/GoogleChartService',
    'modules/saleAnalytics/widgets/GraphColorService',
    'jquery'
], function (WidgetBaseView, PieChartWidgetPresenter, BaseWidgetEventBus, WidgetEventBus, GoogleChartService, GraphColorService, $) {
    'use strict';

    var LINE = 'line';
    var FILLED = 'filled';
    var FILLED100 = 'filled100';
    var PIE = 'pie';

    function PieChartWidgetView(scope, element, presenter) {
        presenter = presenter || new PieChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        scope.selectedRangeOption = "week";
        scope.currentChartType = PIE;

        var self = this;
        self.colorService = new GraphColorService();
        self.widgetEventBus = WidgetEventBus.getInstance();
        self.chartService = GoogleChartService.newInstance();
        self.data.noData = false;

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
        var eventChannel = self.eventChannel;

        eventChannel.onReloadCommandReceived(
            self.onReloadCommandReceived.bind(self)
        );

        eventChannel.onExpandingWidget(function(){
            setTimeout(self.reDraw.bind(self), 250);
        });

        self.fn.changeFilterRange = function (value) {
            self.$scope.selectedRangeOption = value;
            self.event.onFilterRangeChanged();
        };

        self.fn.switchToFilled100 = function () {
            self.$scope.currentChartType = FILLED100;
            self.paintChart();
        };

        self.fn.switchToFilled = function () {
            self.$scope.currentChartType = FILLED;
            self.paintChart();
        };

        self.fn.switchToLine = function () {
            self.$scope.currentChartType = LINE;
            self.paintChart();
        };

        self.fn.switchToPie = function () {
            self.$scope.currentChartType = PIE;
            self.paintChart();
        };

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

        self.fn.init = function () {
            setTimeout( function(){
                $('[data-toggle=tooltip]').tooltip();
            }, 2000 );
        };

        self.resizeHandling();
    };


    PieChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.data = responseData.data.params.params;
        self.tabs = responseData.data.params.filters;
        self.selectedFilter = self.selectedFilter || responseData.data.params.filters[0].key;
        self.paintChart();
    };


    PieChartWidgetView.prototype.reDraw = function(){
        this.paintChart();
    };


    PieChartWidgetView.prototype.paintChart = function () {
        var self = this;
        var scope = self.$scope;
        if(scope.currentChartType === PIE) {
            this.paintPieChart();
        } else {
            this.paintLineAreaChart();
        }
    };

    PieChartWidgetView.prototype.paintLineAreaChart = function () {

    };

    PieChartWidgetView.prototype.paintPieChart = function () {
        var self = this;
        var chartService = self.chartService;
        var element = self.element.find('.chart-place-holder');
        var data = self.data;

        if (!data || data === null || !Array.isArray(data)) {
            return;
        }

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
            colors: self.colorService.$colors.slice(),
            width: '100%',
            height: '100%',
            chartArea: {
                left: "5%",
                top: "5%",
                height: "90%",
                width: "90%"
            }
        };

        chartService.drawChart(self.chart, self.chartData, self.chartOptions);
    };


    PieChartWidgetView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {
        var view = new PieChartWidgetView($scope, $element);
        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return PieChartWidgetView;
});