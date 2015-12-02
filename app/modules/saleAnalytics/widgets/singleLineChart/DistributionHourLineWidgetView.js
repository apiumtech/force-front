/* globals google */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'modules/saleAnalytics/widgets/GraphColorService',
    'shared/services/GoogleChartService'
], function (WidgetBaseView, SingleLineChartWidgetPresenter, BaseWidgetEventBus, WidgetEventBus, GraphColorService, GoogleChartService) {
    'use strict';

    function SingleLineChartWidgetView(scope, element, presenter) {
        presenter = presenter || new SingleLineChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        var self = this;
        self.colorService = new GraphColorService();
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
        var eventChannel = self.eventChannel;

        eventChannel.onReloadCommandReceived(
            self.onReloadCommandReceived.bind(self)
        );

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
            self.paintChart();
        };

        self.resizeHandling();
    };


    SingleLineChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.data = responseData.data.params;
        self.extractFilters();
        self.paintChart();
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


    SingleLineChartWidgetView.prototype.reDraw = function(){
        this.paintChart();
    };


    SingleLineChartWidgetView.prototype.paintChart = function () {
        var self = this;
        var chartService = self.chartService;
        var element = self.element.find('.chart-place-holder');

        if (!self.data || !self.data.fields) {
            return;
        }

        self.colorService.initialize();
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


    SingleLineChartWidgetView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {
        var view = new SingleLineChartWidgetView($scope, $element);
        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return SingleLineChartWidgetView;
});