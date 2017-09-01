/* globals google */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'modules/saleAnalytics/widgets/GraphColorService',
    'shared/services/GoogleChartService',
    'shared/services/TranslatorService'
], function (WidgetBaseView, SingleLineChartWidgetPresenter, BaseWidgetEventBus, WidgetEventBus, GraphColorService, GoogleChartService, TranslatorService) {
    'use strict';

    function SingleLineChartWidgetView(scope, element, presenter) {
        presenter = presenter || new SingleLineChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        var self = this;
        self.translator = TranslatorService.newInstance();
        self.colorService = new GraphColorService();
        self.widgetEventBus = WidgetEventBus.getInstance();
        self.chartService = GoogleChartService.newInstance();
        self.configureEvents();
    }


    SingleLineChartWidgetView.inherits(WidgetBaseView, {
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

        self.fn.changeFilter = function (selectedFilter) {
            self.$scope.selectedFilter = selectedFilter;
            self.event.onFilterChanged();
            self.applyWidgetDescription();
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
        self.$scope.filters = self.data.filters;
        var filterList = self.$scope.filters;
        var currentSelectedFilter = self.$scope.selectedFilter;

        self.$scope.selectedFilter =
            currentSelectedFilter && filterList.map(function (f) {
                return f.key;
            }).indexOf(currentSelectedFilter.key) !== -1 ?
                currentSelectedFilter :
                self.$scope.filters[0];
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
        dataTable.addColumn('timeofday', 'Hora');
        self.data.fields.forEach(function(serie){
            dataTable.addColumn('number', self.translator.translate(serie.name) || serie.name );
        });

        var columns = [];
        self.data.fields.forEach(function(serie){
            var horas = 0;
            serie.data.forEach(function(item) {
                columns.push([[horas++,0,0], item]);
            });
        });
        dataTable.addRows(columns);

        self.chartData = dataTable;
        self.chart = chartService.createChart(element[0], 'bar');
    
        var web3Config = window.sessionStorage.getItem('config'),
            timeFormat = "H'h'";
        if (web3Config) {
            web3Config = JSON.parse(web3Config);
            var format = web3Config.userData.dotNetLocaleDateFormat.split(' ');
            if (format.length === 3) {
                // the third element is to show AM/PM, but there we have tt, and for google charts
                // should be aa
                timeFormat = format[1].replace(':ss', '').replace(':SS', '') + ' aa';
            }
        }

        self.chartOptions = {
            title: self.widgetName,
            colors: self.colorService.$colors.slice(),
            hAxis: {
                format: timeFormat,
                viewWindow: {
                    min: [0, 0, 0],
                    max: [24, 0, 0]
                }
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
