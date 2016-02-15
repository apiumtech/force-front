/* global google */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/eventBus/WidgetEventBus',
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'shared/services/GoogleChartService',
    'modules/saleAnalytics/widgets/GraphColorService',
    'shared/services/SimpleTemplateParser',
    'shared/services/TranslatorService',
    'jquery'
], function(WidgetBaseView, WidgetEventBus, BarChartWidgetPresenter, BaseWidgetEventBus, EventBus, GoogleChartService, GraphColorService, SimpleTemplateParser, TranslatorService, $){
    'use strict';

    function BarChartWidgetView(scope, element, presenter) {
        presenter = presenter || new BarChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        var self = this;
        self.colorService = new GraphColorService();
        self.widgetEventBus = EventBus.getInstance();
        self.chartService = GoogleChartService.newInstance();
        self.templateParser = SimpleTemplateParser.newInstance();
        self.translator = TranslatorService.newInstance();
        self.configureEvents();
    }


    BarChartWidgetView.inherits(WidgetBaseView, {
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
        var eventChannel = self.eventChannel;

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        eventChannel.onExpandingWidget(function(){
            setTimeout(self.paintChart.bind(self), 250);
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


    BarChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.data = responseData.data.params.bars;
        self.tickLabels = responseData.data.params.axis.x;
        self.cycleLabels = responseData.data.params.axis.cycle;
        self.$scope.filters = responseData.data.params.filters;
        self.$scope.selectedFilter = self.$scope.selectedFilter || responseData.data.params.filters[0];
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

        if (!data || data === null || !Array.isArray(data)) {
            return;
        }

        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn('string', '');
        self.data.forEach(function(serie){
            dataTable.addColumn('number', serie.label);
            dataTable.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
        });
        dataTable.addColumn({type:'string', role:'annotation'});


        var originalTableTemplateString = function(){
            return '<table id="barChartCalloutTable" style="margin:-5px; width:300px; padding:10px; background-color:white; border: 1px solid #DDDDDD;">'+
                '<tbody>'+
                    '<tr id="HeaderBgColor1" style="height:35px;background-color:{HeaderBgColor1};">'+
                        '<td colspan="2" style="padding-left:20px; vertical-align:middle; color:#FFFFFF; font-size:15px; font-weight:400;">'+
                            '{Agrupacion}'+
                        '</td>'+
                    '</tr>'+
                    '<tr id="HeaderBgColor2" style="height:30px;background-color:{HeaderBgColor2};">'+
                        '<td colspan="2" style="padding-left:20px; vertical-align:middle; color:#FFFFFF;">'+
                            '<span style="font-size:13px;">{ActivityType}: {ActivityCount}</span>'+
                            '<span style="font-size:15px; font-weight:400;">({ActivityPercentage}%)</span>'+
                        '</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td style="width:250px; height:40px; vertical-align:middle; padding-left:20px; color:#212121; font-size:13px; font-weight:400;">'+ self.translator.translate('label_user') +'</td>'+
                        '<td style="width:50px;  height:40px; vertical-align:middle; text-align:center; color:#212121; font-size:13px; font-weight:400;">'+ self.translator.translate('label_total') +'</td>'+
                    '</tr>'+
                    '{Rows}'+
                '</tbody>'+
            '</table>';
        };

        var createTooltip = function(tick, serie, index){
            var total = serie.data[index][1].Count || "?";
            var percent = serie.data[index][1].Y;
            var drillDown = serie.data[index][1].DrillDown || [];
            if(drillDown.length===0) {
                drillDown = [{Name:'-',Count:'-',RowBgColor:'#F8F8F8'}, {Name:'',Count:'',RowBgColor:'#FFFFFF'}];
            }
            var row =   '<tr style="background-color:{RowBgColor}">'+
                            '<td style="width:225px; height:20px; vertical-align:middle; padding-left:20px; color:#54585A; font-size:12px;">{Name}</td>'+
                            '<td style="width:75px;  height:20px; vertical-align:middle; text-align:center; color:#54585A; font-size:12px;">{Count}</td>'+
                        '</tr>';
            var rows = [];
            var odd = false;
            drillDown.forEach(function(user){
                rows.push(
                    self.templateParser.parseTemplate( row, {
                        Name: user.Name,
                        Count: user.Count,
                        RowBgColor: odd ? '#FFFFFF' : '#F8F8F8'
                    })
                );
                odd = !odd;
            });
            var tableData = {
                Agrupacion: tick,
                ActivityType: serie.label,
                ActivityCount: total,
                ActivityPercentage: percent.toFixed(1),
                HeaderBgColor1: serie.color,
                HeaderBgColor2: serie.color,
                Rows: rows.join("")
            };
            var str = self.templateParser.parseTemplate(originalTableTemplateString(), tableData);
            return str;
        };

        self.data.forEach(function(serie){
            serie.color = self.colorService.getNextColor();
        });
        self.colorService.initialize();

        var index = 0;
        var rows = [];
        self.tickLabels.forEach(function(tick){
            var row = [];
            row.push(tick);
            self.data.forEach(function(serie){
                row.push( serie.data[index][1].Y  );
                row.push( createTooltip(tick, serie, index) );
            });
            row.push(self.cycleLabels[index]);
            rows.push(row);
            index++;
        });
        dataTable.addRows(rows);

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
            tooltip: {
                isHtml: true,
                trigger: 'selection'
            },
            legend: legend,
            width: '100%',
            height: '100%',
            chartArea: chartArea
        };



        chartService.drawChart(self.chart, self.chartData, self.chartOptions);
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