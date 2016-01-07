/* globals google */

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
    'use strict';

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
        }
    });


    ScatterChartWidgetView.prototype.configureEvents = function () {
        var self = this;
        var eventChannel = self.eventChannel;

        eventChannel.onReloadCommandReceived(
            self.onReloadCommandReceived.bind(self)
        );

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
            self.paintChart();
        };

        self.fn.serieRollOver = function (fieldIndex) {
            self.chart.setSelection([{'row': fieldIndex }]);
        };

        self.resizeInterval = null;
        $(window).on('resize', self.onWindowResize.bind(self));
        self.$scope.$on('destroy', function () {
            $(window).unbind('resize', self.onWindowResize.bind(self));
        });
    };


    ScatterChartWidgetView.prototype.onExpandingWidget = function(){
        this.paintChart();
    };

    ScatterChartWidgetView.prototype.onWindowResize = function () {
        var self = this;
        clearTimeout(self.resizeInterval);
        self.resizeInterval = setTimeout(function () {
            self.paintChart();
        }, 250);
    };

    ScatterChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;
        self.data = responseData;
        self.paintChart();
    };


    ScatterChartWidgetView.prototype.reDraw = function(){
        this.paintChart();
    };


    ScatterChartWidgetView.prototype.paintChart = function () {
        var self = this;
        if(!self.data.Series) {
            return;
        }

        var element = self.element.find('.chart-place-holder');
        var chartService = self.chartService;
        self.chart = chartService.createChart(element[0], 'scatter');


        var generateTooltip = function(point) {
            return '<div style="padding:10px;"><strong>'+ point.Name +' '+ point.Surname +'</strong><br />'+
                        '<img src="'+ point.PhotoUrl +'" style="border:1px solid #CCC;width:100px;height:100px;"><br/>'+
                        point.Description +'<br />'+
                        self.axisXTitle +': <strong>'+ point.X +'</strong> '+
                        self.axisYTitle +': <strong>'+ point.Y +'</strong>'+
                    '</div>';
        };

        var dataTable = new google.visualization.DataTable();
        var points = self.data.Series[0].Points;
        dataTable.addColumn({type: 'number', name: 'x'});
        dataTable.addColumn({type: 'number', name: 'y'});
        dataTable.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
        dataTable.addColumn({'type': 'string', 'role': 'style'});

        var availableFields = [];
        var rows = [];
        self.colorService.initialize();
        points.forEach(function(point){
            var color = self.colorService.getNextColor();
            rows.push([
                point.X,
                point.Y,
                generateTooltip(point),
                color
            ]);
            availableFields.push({
                id: point.UserId,
                name: point.Name +' '+ point.Surname,
                color: color
            });
        });
        dataTable.addRows(rows);
        self.chartData = dataTable;
        self.$scope.availableFields = availableFields;

        self.chartOptions = {
            title: self.widgetName,
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
            legend: 'none',
            tooltip: {
                isHtml: true
            },
            width: '100%',
            height: '100%',
            chartArea: {
                left: "5%",
                top: "5%",
                height: "80%",
                width: "90%"
            }
        };
        chartService.drawChart(self.chart, self.chartData, self.chartOptions);
    };

    /*ScatterChartWidgetView.prototype.paintChart_old = function () {
        var self = this;
        if(!self.data.chartData){
            return;
        }
        var element = self.element.find('.chart-place-holder');
        var chartService = self.chartService;
        self.chartData = chartService.createDataTable(self.data);
        self.chart = chartService.createChart(element[0], 'scatter');

        self.$scope.availableFields = self.data.legends.map(function(item){
            item.isDisplaying = true;
            return item;
        });

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

            legend: 'none',
            width: '100%',
            height: '100%',
            chartArea: {
                left: "5%",
                top: "5%",
                height: "80%",
                width: "90%"
            }
        };
        chartService.drawChart(self.chart, self.chartData, self.chartOptions);
    };*/


    ScatterChartWidgetView.prototype.generateTooltip = function (element) {
        var toolTipTemplate = $('#popup_tooltip').html();
        return this.templateParser.parseTemplate(toolTipTemplate, element);
    };


    ScatterChartWidgetView.newInstance = function ($scope, $element, $chartService, $viewRepAspect, $logErrorAspect) {
        var view = new ScatterChartWidgetView($scope, $element);
        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ScatterChartWidgetView;
});