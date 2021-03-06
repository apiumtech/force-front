define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/eventBus/WidgetEventBus',
    'modules/saleAnalytics/widgets/funnelChart/FunnelChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'shared/services/GoogleChartService',
    'modules/saleAnalytics/widgets/GraphColorService',
    'shared/services/TranslatorService',
    'd3-funnel',
    'numbro'
], function(WidgetBaseView, WidgetEventBus, FunnelChartWidgetPresenter, BaseWidgetEventBus, EventBus, GoogleChartService, GraphColorService, TranslatorService, D3Funnel, numbro) {
    'use strict';

    var decimalsFormat = function(decimals, optionalDecimals){
        var format = '0,0';
        if(optionalDecimals===true) {
            format += '[.]';
        } else {
            format += '.';
        }
        decimals = decimals===undefined ? 2 : decimals;
        while(decimals>0) {
            format += '0';
            decimals--;
        }
        return format;
    };

    function FunnelChartWidgetView(scope, element, presenter) {
        presenter = presenter || new FunnelChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        var self = this;
        self.colorService = new GraphColorService();
        self.widgetEventBus = EventBus.getInstance();
        self.chartService = GoogleChartService.newInstance();
        self.translator = TranslatorService.newInstance();
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
        // D3 Funnel: https://github.com/jakezatecky/d3-funnel
        var self = this;

        try{
          if(self.widget.endPoint === '/api/queries/stats/dashboard/conversion/opportunityFunnelConversionByUsersAndPeriod'){
            self._paintOpportunityFunnel();
          } else {
            self._paintCustomerFunnel();
          }
        }catch(err){
          // window.console.error('funnel chart error', err);
        }
    };

    FunnelChartWidgetView.prototype._paintOpportunityFunnel = function(){
        var self = this;

        var amounts = {};

        var labels0 = self.data.Labels[0];
        var labels1 = self.data.Labels[1];
        var labels = labels0 && labels0.length > 0 ?
                        labels0 :
                        labels1 && labels1.length > 0 ? labels1 : // hack while Javier fixes this issue.
                        [];

        if(labels.length === 0) {
            self.data.noData = true;
            return;
        }

        var data = self.data.Series[0].Points
            .filter(function(item){
                return item.IsLost === false;
            })
            .map(function(item, index){
                amounts[labels[index]] = item.Amount;
                return [labels[index], item.Y];
            });

        var options = {
            block: {
                dynamicHeight: false,
                fill: {
                    type: 'solid',
                    scale: self.colorService.$colors.slice()
                },
                minHeight: 20
            },
            label: {
                fill: '#333333',
                format: function(label, value){
                    var amount = amounts[label];
                    label = self.translator.translate(label) || label;
                    return label +': '+ numbro(value).format(decimalsFormat(0)) +' ('+ numbro(amount).format(decimalsFormat(0)) +')';
                }
            }
        };

        var chart = new D3Funnel('#wid-'+ self.widget.widgetId);
        chart.draw(data, options);


        // Paint Conversion Rates Table
        // COL 1
        var conversionRates = [];
        var nRows = data.length;
        for(var i=1; i<nRows; i++) {
            var prevRow = data[i-1];
            var currentRow = data[i];
            var value =  (currentRow[1]/prevRow[1]) * 100;
            var prevLabel = self.translator.translate(prevRow[0]) || prevRow[0];
            var currentLabel = self.translator.translate(currentRow[0]) || currentRow[0];
            conversionRates.push({
                label: prevLabel +" > "+ currentLabel,
                value: isNaN(value) ? '0' : numbro(value).format(decimalsFormat(1,true))
            });
        }
        self.data.conversionRates = conversionRates;

        // COL 2
        var primera = self.data.Series[0].Points[0];
        var ganadas = self.data.Series[0].Points[ self.data.Series[0].Points.length-2 ];
        var perdidas = self.data.Series[0].Points[ self.data.Series[0].Points.length-1 ];
        self.data.conversionRatesGanadas = {
            value: numbro( (ganadas.Y/primera.Y)*100 ).format(decimalsFormat(1,true)),
            label: self.translator.translate(labels[labels.length-2]) || labels[labels.length-2]
        };
        self.data.conversionRatesPerdidas = {
            value: numbro( (perdidas.Y/primera.Y)*100 ).format(decimalsFormat(1,true)),
            label: self.translator.translate(labels[labels.length-1]) || labels[labels.length-1]
        };
    };

    FunnelChartWidgetView.prototype._paintCustomerFunnel = function(){
        var self = this;

        var labels0 = self.data.Labels[0];
        var labels1 = self.data.Labels[1];
        var labels = labels0 && labels0.length > 0 ?
            labels0 :
            labels1 && labels1.length > 0 ? labels1 : // hack while Javier fixes this issue.
                [];

        if(labels.length === 0) {
            self.data.noData = true;
            return;
        }


        var data = self.data.Series[0].Points.map(function(item, index){
            return [labels[index], item.Y];
        });

        var largestPoint = data[0][1];
        var percentUnit = largestPoint / 100;

        var options = {
            block: {
                dynamicHeight: false,
                fill: {
                    type: 'solid',
                    scale: self.colorService.$colors.slice()
                },
                minHeight: 20
            },
            label: {
                fill: '#333333',
                format: function(label, value){
                    label = self.translator.translate(label) || label;
                    var percent = numbro(value/percentUnit).format(decimalsFormat(1,true));
                    return label + ': ' + value + ' ('+percent+'%)';
                }
            }
        };

        var chart = new D3Funnel('#wid-'+ self.widget.widgetId);
        chart.draw(data, options);


        // Paint Conversion Rates Table
        var conversionRates = [];
        var nRows = data.length;
        for(var i=1; i<nRows; i++) {
            var prevRow = data[i-1];
            var currentRow = data[i];
            var value = self._round( (currentRow[1]/prevRow[1])*100, 1 );
            conversionRates.push({
                label: prevRow[0] +" > "+ currentRow[0],
                value: isNaN(value) ? '0' : numbro(value).format(decimalsFormat(1,true))
            });
        }
        self.data.conversionRates = conversionRates;
    };

    // @see http://stackoverflow.com/a/21323330/779529
    FunnelChartWidgetView.prototype._round = function (value, exp) {
        if (typeof exp === 'undefined' || +exp === 0){
            return Math.round(value);
        }

        value = +value;
        exp = +exp;

        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
          return NaN;
        }

        // Shift
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
    };

    /*FunnelChartWidgetView.prototype.paintChart_old = function () {
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
        var largestPoint = points[0];
        var percentUnit = largestPoint / 100;

        var rows = [];
        var conversionRateRows = [];
        var opacityIncrement = 100/points.length;
        var labels = self.data.Labels[0].length > 0 ? self.data.Labels[0] : self.data.Labels[1];// hack while Javier fixes this issue.
        points.forEach(function(originalPoint, index){
            var row = [];
            var label = labels[index];
            row.push(label);
            var percent = originalPoint / percentUnit;
            row.push(50 - percent/2);
            row.push(percent);
            var opacity = (100-index*opacityIncrement)/100;
            row.push('opacity: '+ opacity );
            row.push( createTooltip(label, percent, originalPoint) );
            rows.push(row);
            conversionRateRows.push({label: label, value: originalPoint});
        });
        dataTable.addRows(rows);

        self.chartData = dataTable;

        var chartArea = self.$scope.chartArea || {
                left: "20%",
                top: "10%",
                height: "80%",
                width: "70%"
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


        // Paint Conversion Rates Table
        var conversionRates = [];
        var nRows = conversionRateRows.length;
        for(var i=1; i<nRows; i++) {
            var prevRow = conversionRateRows[i-1];
            var currentRow = conversionRateRows[i];
            conversionRates.push({
                label: prevRow.label +" > "+ currentRow.label,
                value: Number((currentRow.value / prevRow.value)*100).toFixed(1)
            });
        }
        this.data.conversionRates = conversionRates;
    };*/


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
