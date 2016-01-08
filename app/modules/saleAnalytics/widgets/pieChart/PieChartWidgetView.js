/* global google */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'shared/services/GoogleChartService',
    'modules/saleAnalytics/widgets/GraphColorService',
    'jquery',
    'underscore',
    'moment',
    'config'
], function (WidgetBaseView, PieChartWidgetPresenter, BaseWidgetEventBus, WidgetEventBus, GoogleChartService, GraphColorService, $, _, moment, config) {
    'use strict';

    var LINE = 'line';
    var FILLED = 'filled';
    var FILLED100 = 'filled100';
    var PIE = 'pie';
    var TABLE = 'table';

    function PieChartWidgetView(scope, element, presenter) {
        presenter = presenter || new PieChartWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        scope.selectedRangeOption = "pie";
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
            //self.event.onFilterRangeChanged();
            self.event.onTimeChartRequested();
        };

        self.fn.switchToFilled100 = function () {
            self.$scope.currentChartType = FILLED100;
            self.$scope.selectedRangeOption = "week";
            self.event.onTimeChartRequested();
        };

        self.fn.switchToFilled = function () {
            self.$scope.currentChartType = FILLED;
            self.$scope.selectedRangeOption = "week";
            self.event.onTimeChartRequested();
        };

        self.fn.switchToLine = function () {
            self.$scope.currentChartType = LINE;
            self.$scope.selectedRangeOption = "week";
            self.event.onTimeChartRequested();
        };

        self.fn.switchToPie = function () {
            self.$scope.currentChartType = PIE;
            self.$scope.selectedRangeOption = "pie";
            self.event.onTimeChartRequested();
        };

        self.fn.switchToTable = function () {
            self.$scope.currentChartType = TABLE;
            self.$scope.selectedRangeOption = "week";
            self.event.onTimeChartRequested();
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

        self.fn.exportToCSV = function() {
            var csv_out = self._dataTableToCSV(self.currentDataTable);
            self._downloadCSV(csv_out);
        };

        self.fn.init = function () {
            setTimeout( function(){
                $('[data-toggle=tooltip]').tooltip();
            }, 2000 );
        };

        self.event.getFilters = function(){};

        self.resizeHandling();
    };


    PieChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;

        var element = self.element.find('.chart-place-holder');
        element.empty();

        if(self.data.serverError) {
            return;
        }
        self.data.noData = false;

        if(self.$scope.currentChartType === PIE) {
            self.onReloadWidgetSuccessPieChart(responseData);
        } else {
            self.onReloadWidgetSuccessLineAreaChart(responseData);
        }
    };

    PieChartWidgetView.prototype.fillFiltersCombo = function () {
        var self = this;
        self.tabs = self.event.getFilters();
        self.selectedFilter = self.selectedFilter || self.tabs[0].key;
    };

    PieChartWidgetView.prototype.onReloadWidgetSuccessPieChart = function (responseData) {
        var self = this;
        self.data = _({}).extend(self.data, responseData.data.params);
        //self.tabs = responseData.data.params.filters;
        //self.selectedFilter = self.selectedFilter || responseData.data.params.filters[0].key;
        self.fillFiltersCombo();
        self.paintChart();
    };

    PieChartWidgetView.prototype.onReloadWidgetSuccessLineAreaChart = function (responseData) {
        var self = this;
        var deepData = responseData.data.params;
        if( !deepData || !deepData.axis || !deepData.fields ||
            deepData.axis.length === 0 || deepData.fields.length === 0 ) {
            self.data.noData = true;
            return;
        }

        self.data = _({}).extend(self.data, responseData.data.params);
        //self.tabs = responseData.data.params.filters;
        //self.selectedFilter = self.selectedFilter || responseData.data.params.filters[0].key;
        self.paintChart();
    };

    PieChartWidgetView.prototype.onReloadWidgetError = function (error) {
        this.fillFiltersCombo();
        this.__base__.onReloadWidgetError.call(this, error);
    };


    PieChartWidgetView.prototype.reDraw = function(){
        this.paintChart();
    };


    // PAINT CHART PROXY
    PieChartWidgetView.prototype.paintChart = function () {
        var self = this;
        var scope = self.$scope;
        if(scope.currentChartType === PIE) {
            this.paintPieChart();
        } else if(scope.currentChartType === TABLE) {
            this.paintTableChart();
        } else {
            this.paintLineAreaChart();
        }
    };

    // PAINT LINE/AREA CHART
    PieChartWidgetView.prototype.paintLineAreaChart = function () {
        var self = this;
        var scope = self.$scope;
        var data = self.data;
        var element = $(self.element).find('.chart-place-holder');


        if (!data.fields) {
            return;
        }
        if(!data.fields.length) {
            data.fields = [];
        }
        self.colorService.initialize();


        var chartFields = [];
        data.fields.forEach(function (field) {
            chartFields.push({
                label: field.name,
                plotData: field.data
            });
        });

        var axisData = data.axis;

        var chartService = self.chartService;
        var dataTable = new google.visualization.DataTable();

        var dateFormat = 'date';

        dataTable.addColumn(dateFormat, '');
        chartFields.forEach(function (serie) {
            dataTable.addColumn('number', serie.label);
            dataTable.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
            dataTable.addColumn({'type': 'string', 'role': 'style'});
        });

        /*var createTooltipForSerie = function(serie, date, plotData) {
            var label = serie.label;
            var dateOption = self.$scope.selectedRangeOption;
            var formattedDate;

            if (dateOption === 'date') {
                formattedDate = moment(date).format(config.salesAnalytics.intensityActivityChartDateFormat);
            } else if (dateOption === 'week') {
                var firstDayOfWeek = moment(date).startOf('week').isoWeekday(1);
                var lastDayOfWeek = moment(date).startOf('week').isoWeekday(7);
                var format = config.salesAnalytics.intensityActivityChartWeekFormat;
                formattedDate = firstDayOfWeek.format(format) + " &RightArrow; " + lastDayOfWeek.format(format);
            } else if (dateOption === 'month') {
                formattedDate = moment(date).format(config.salesAnalytics.intensityActivityChartMonthFormat);
            } else {
                throw new Error("Unknown date option");
            }


            return '<div style="padding:10px;"><strong>'+ formattedDate +'</strong><br />'+ label +': <strong>'+ plotData +'</strong></div>';
        };*/


        // BEGIN TOOLTIP GENERATION

        var getTooltipDateRange = function(date) {
            var dateOption = self.$scope.selectedRangeOption;
            var formattedDate;
            if (dateOption === 'date') {
                formattedDate = moment(date).format(config.salesAnalytics.intensityActivityChartDateFormat);
            } else if (dateOption === 'week') {
                var firstDayOfWeek = moment(date).startOf('week').isoWeekday(1);
                var lastDayOfWeek = moment(date).startOf('week').isoWeekday(7);
                var format = config.salesAnalytics.intensityActivityChartWeekFormat;
                formattedDate = firstDayOfWeek.format(format) + " &RightArrow; " + lastDayOfWeek.format(format);
            } else if (dateOption === 'month') {
                formattedDate = moment(date).format(config.salesAnalytics.intensityActivityChartMonthFormat);
            } else if (dateOption === 'hour') {
                formattedDate = date[0] + ":00";
            } else {
                throw new Error("Unknown date option");
            }
            return formattedDate;
        };

        var computeTotalsForPercentage = function(plotDataIndex) {
            var total = 0;
            chartFields.forEach(function (currentSerie) {
                total += currentSerie.plotData[plotDataIndex];
            });
            return total;
        };

        var computePlotData = function(currentSerie, plotDataIndex, totalPlotData) {
            var plotData = currentSerie.plotData[plotDataIndex];
            if( scope.currentChartType === FILLED100 && plotData > 0 ) {
                plotData = Math.round((plotData / totalPlotData) * 100);
            }
            return plotData;
        };

        var getSomeSurroundingSeries = function(rolledOverSerie, howManyOnEachSide) {
            var rolledOverSerieIndex = chartFields.indexOf(rolledOverSerie);
            var fromIndex = Math.max(rolledOverSerieIndex-howManyOnEachSide, 0);
            var toIndex = Math.min(rolledOverSerieIndex+howManyOnEachSide, chartFields.length);
            return chartFields.slice(fromIndex, toIndex+1);
        };

        var createTooltipSerieItem = function(serie, plotData) {
            var isPercent = scope.currentChartType === FILLED100;
            if(self.selectedFilter === "phoneCallsTime" && !isPercent) {
                plotData = self._secondsToHHMMSS(plotData);
            }
            return serie.label +': '+ plotData + (isPercent ? '%' : '');
        };

        var createTooltipForSerie = function(rolledOverSerie, date, plotDataIndex) {
            var formattedDate = getTooltipDateRange(date);
            var tooltipContent = '<strong>'+ formattedDate +'</strong><hr/><ul style="margin:0;padding-left:15px;">';
            var totalPlotData = computeTotalsForPercentage(plotDataIndex);
            var surroundingSeries = getSomeSurroundingSeries(rolledOverSerie, 8);
            surroundingSeries.forEach(function (currentSerie) {
                var plotData = computePlotData(currentSerie, plotDataIndex, totalPlotData);
                var isRolledOverSerie = rolledOverSerie.label === currentSerie.label;
                var style = 'padding:2px;color:'+ currentSerie.color;
                tooltipContent += '<li style="'+ style +'">' +
                    (isRolledOverSerie ? '<strong>' : '') +
                    createTooltipSerieItem(currentSerie, plotData) +
                    (isRolledOverSerie ? '</strong>' : '') +
                    '</li>';
            });
            tooltipContent += '</ul>';
            return '<div style="padding:10px;">'+ tooltipContent +'</div>';
        };

        // END TOOLTIP GENERATION


        chartFields.forEach(function (serie) {
            var color = self.colorService.getNextColor();
            serie.color = color;
        });

        var rows = [];
        var rowIndex = 0;
        axisData.x.forEach(function(date_str){
            var date = new Date(Date.parse(date_str));
            var row = [date];
            chartFields.forEach(function (serie) {
                /*var field = _.find(self.availableFields, function (_field) {
                    return _field.name === serie.label;
                });
                field.color = serie.color;*/

                var plotData = serie.plotData[rowIndex];
                row.push( plotData );
                row.push( createTooltipForSerie(serie, date, rowIndex) );
                row.push( 'color: '+ serie.color );
            });
            rows.push(row);
            rowIndex = rows.length-1;
        });
        dataTable.addRows(rows);

        self.chartData = dataTable;
        self.chartOptions = {
            title: self.widgetName,
            legend: 'none',
            tooltip: {
                isHtml: true
            },
            pointSize: 5,
            width: '100%',
            height: '100%',
            chartArea: {
                left: "5%",
                top: "10%",
                height: "80%",
                width: "94%"
            }
        };

        // ---------------------------
        //  vAxis
        // ---------------------------

        self.chartOptions.vAxis = {};

        if(scope.currentChartType === LINE) {
            self.chartOptions.vAxis.ticks = self.getVaxisTicks(chartFields);
        } else if(scope.currentChartType === FILLED){
            self.chartOptions.vAxis.ticks = self.getVaxisTicksFilled(chartFields);
        }

        var computedFormat = self.$scope.selectedRangeOption === 'month' ? 'MMM yy' :
                             self.$scope.selectedRangeOption === 'week' ? 'd/M/yy' :
                             self.$scope.selectedRangeOption === 'date' ? 'd/M/yy' : 'd/M/yy';

        // For d3 time intervals
        // @see http://stackoverflow.com/a/23957607/779529
        self.chartOptions.hAxis = {
            format: computedFormat,
            gridlines: {
                count: 8 /* max number of ticks */
            }
        };

        if(scope.currentChartType === LINE) {
            self.chart = chartService.createChart(element[0], 'line');
        } else if(scope.currentChartType === FILLED) {
            self.chartOptions.isStacked = true;
            self.chart = chartService.createChart(element[0], 'area');
        } else if(scope.currentChartType === FILLED100) {
            self.chartOptions.isStacked = "percent";
            self.chart = chartService.createChart(element[0], 'area');
        } else {
            throw new Error("Unknown chart type '"+ scope.currentChartType +"'");
        }

        chartService.drawChart(self.chart, self.chartData, self.chartOptions);
    };

    // Rounded number ticks
    PieChartWidgetView.prototype.getVaxisTicks = function(chartFields){
        var totalMax = 1;
        var yAxisPoints;
        for( var i=0; i<chartFields.length; i++ ) {
            yAxisPoints = chartFields[i];
            for( var j=0; j<yAxisPoints.plotData.length; j++ ) {
                var plotValue = yAxisPoints.plotData[j];
                totalMax = Math.max(plotValue, totalMax);
            }
        }
        var ticks = [];
        var maxTicks = Math.min(5, totalMax);
        var incr = Math.ceil(totalMax / maxTicks);
        for( i=0; i<=totalMax; i+=incr ) {
            ticks.push(i);
        }
        return ticks;
    };

    // Addition ticks
    PieChartWidgetView.prototype.getVaxisTicksFilled = function(chartFields){
        var totalMax = 1;
        var points = [];
        var dataPoints = chartFields[0].plotData.length;
        for(var i=0; i<dataPoints; i++){
            points[i] = 0;
            for(var j=0; j<chartFields.length; j++) {
                var field = chartFields[j];
                var plotValue = field.plotData[i];
                points[i] = points[i] + plotValue;
                totalMax = Math.max(points[i], totalMax);
            }
        }
        var ticks = [];
        var maxTicks = Math.min(5, totalMax);
        var incr = Math.ceil(totalMax / maxTicks);
        for( i=0; i<=totalMax; i+=incr ) {
            ticks.push(i);
        }
        return ticks;
    };


    // PAINT PIE CHART
    PieChartWidgetView.prototype.paintPieChart = function () {
        var self = this;
        var chartService = self.chartService;
        var element = self.element.find('.chart-place-holder');
        var data = self.data.params;

        if (!data || data === null || !Array.isArray(data)) {
            return;
        }

        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn('string', '---');
        dataTable.addColumn('number', '---');
        var columns = [];
        data.forEach(function(item){
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


    // PAINT TABLE CHART
    PieChartWidgetView.prototype.paintTableChart = function () {
        var self = this;
        var chartService = self.chartService;
        var data = self.data;
        var element = $(self.element).find('.chart-place-holder');

        if (!data.fields) {
            return;
        }
        if(!data.fields.length) {
            data.fields = [];
        }

        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn('date', 'Date');

        data.fields.forEach(function(field) {
            dataTable.addColumn('number', field.name);
        });

        var rows = [];
        data.axis.x.forEach(function(d, index){
            var row = [new Date(d)];
            data.fields.forEach(function(field) {
                row.push(field.data[index]);
            });
            rows.push(row);
        });
        dataTable.addRows(rows);

        var chartData = dataTable;
        self.currentDataTable = dataTable;
        var chart = chartService.createChart(element[0], 'table');
        var chartOptions = {
            width: '100%',
            height: '100%',
            frozenColumns: 0
        };
        chartService.drawChart( chart, chartData, chartOptions );
    };


    /**
     * Convert an instance of google.visualization.DataTable to CSV
     * @param {google.visualization.DataTable} dataTable_arg DataTable to convert
     * @return {String} Converted CSV String
     */
    PieChartWidgetView.prototype._dataTableToCSV = function(dataTable_arg) {
        var dt_cols = dataTable_arg.getNumberOfColumns();
        var dt_rows = dataTable_arg.getNumberOfRows();

        var csv_cols = [];
        var csv_out;

        // Iterate columns
        for (var i=0; i<dt_cols; i++) {
            // Replace any commas in column labels
            csv_cols.push(dataTable_arg.getColumnLabel(i).replace(/;/g,""));
        }

        // Create column row of CSV
        csv_out = csv_cols.join(";")+"\r\n";

        // Iterate rows
        for (i=0; i<dt_rows; i++) {
            var raw_col = [];
            for (var j=0; j<dt_cols; j++) {
                // Replace any commas in row values
                raw_col.push(dataTable_arg.getFormattedValue(i, j, 'label').replace(/;/g,""));
            }
            // Add row to CSV text
            csv_out += raw_col.join(";")+"\r\n";
        }

        return csv_out;
    };

    PieChartWidgetView.prototype._downloadCSV = function(csv_out) {
        var blob = new Blob([csv_out], {type: 'text/csv;charset=utf-8'});
        var url  = window.URL || window.webkitURL;
        var link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        link.href = url.createObjectURL(blob);
        link.download = this.$scope.widget.widgetName.split(" ").join("_") +"-"+ this.$scope.selectedFilter +"-"+ this.$scope.selectedRangeOption + ".csv";

        var event = document.createEvent("MouseEvents");
        event.initEvent("click", true, false);
        link.dispatchEvent(event);
    };

    PieChartWidgetView.prototype.showError = function (err) {
        this.data.serverError = true;
        this.data.serverErrorTitle = "Error";
        this.data.serverErrorMessage = "Something went wrong";
    };


    PieChartWidgetView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {
        var view = new PieChartWidgetView($scope, $element);
        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return PieChartWidgetView;
});