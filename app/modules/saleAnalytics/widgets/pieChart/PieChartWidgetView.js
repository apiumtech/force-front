/* global google */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'shared/services/GoogleChartService',
    'modules/saleAnalytics/widgets/GraphColorService',
    'jquery',
    'readmore-js',
    'underscore',
    'moment',
    'config'
], function (WidgetBaseView, PieChartWidgetPresenter, BaseWidgetEventBus, WidgetEventBus, GoogleChartService, GraphColorService, $, readmore, _, moment, config) {
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
        eventChannel: {
            get: function () {
                return this.$scope.eventChannel || (this.$scope.eventChannel = BaseWidgetEventBus.newInstance());
            },
            set: function (value) {
                this.$scope.eventChannel = value;
            }
        }
    });

    PieChartWidgetView.prototype.___show = WidgetBaseView.prototype.show;
    PieChartWidgetView.prototype.show = function () {
        this.___show.call(this);
        this.event.createFilters(this.widget);
    };


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
            if(self.$scope.currentChartType === PIE) {
                self.$scope.selectedRangeOption = "week";
            }
            self.$scope.currentChartType = FILLED100;
            self.event.onTimeChartRequested();
        };

        self.fn.switchToFilled = function () {
            if(self.$scope.currentChartType === PIE) {
                self.$scope.selectedRangeOption = "week";
            }
            self.$scope.currentChartType = FILLED;
            self.event.onTimeChartRequested();
        };

        self.fn.switchToLine = function () {
            if(self.$scope.currentChartType === PIE) {
                self.$scope.selectedRangeOption = "week";
            }
            self.$scope.currentChartType = LINE;
            self.event.onTimeChartRequested();
        };

        self.fn.switchToPie = function () {
            self.$scope.currentChartType = PIE;
            self.$scope.selectedRangeOption = "pie";
            self.event.onTimeChartRequested();
        };

        self.fn.switchToTable = function () {
            if(self.$scope.currentChartType === PIE) {
                self.$scope.selectedRangeOption = "week";
            }
            self.$scope.currentChartType = TABLE;
            self.event.onTimeChartRequested();
        };


        self.fn.assignWidget = function (outerScopeWidget) {
            self.widget = outerScopeWidget;
            self.event.onReloadWidgetStart();
        };

        self.fn.changeFilter = function (newTab) {
            self.$scope.selectedFilter = newTab;
            self.event.onTabChanged();
            self.applyWidgetDescription();
        };

        self.fn.refreshChart = function () {
            self.paintChart();
        };

        self.fn.exportToCSV = function() {
            var csv_out = self._dataTableToCSV(self.currentDataTable);
            self._downloadCSV(csv_out);
        };

        self.fn.init = function () {
            self.event.createFilters = function(){};
        };

        var columnsPerRow = 3;
        self.fn.serieRollOver = function(field, fieldIndex){
            self.chart.setSelection([{'column': 1 + fieldIndex * columnsPerRow }]);
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
        self.$scope.filters = self.event.getFilters();
        self.$scope.selectedFilter = self.$scope.selectedFilter || self.$scope.filters[0];
    };

    PieChartWidgetView.prototype.onReloadWidgetSuccessPieChart = function (responseData) {
        var self = this;
        self.data = _({}).extend(self.data, responseData.data.params);
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

        var getSomeSurroundingSeries = function(rolledOverSerie, plotDataIndex) {
            var plotData = rolledOverSerie.plotData[plotDataIndex];
            var series = [];
            var isLine = scope.currentChartType === LINE;
            if(isLine) {
                series = chartFields.filter(function(serie){
                    return serie.plotData[plotDataIndex] === plotData;
                });
            } else {
                var rolledOverSerieIndex = chartFields.indexOf(rolledOverSerie);
                var index;
                for(var i=rolledOverSerieIndex; i>=0; i--) {
                    index = i;
                    if(chartFields[i].plotData[plotDataIndex] > 0) {
                        break;
                    }
                }
                series = chartFields.slice(index, rolledOverSerieIndex+1);
            }

            return series;
        };

        var createTooltipSerieItem = function(serie, plotData) {
            var isPercent = scope.currentChartType === FILLED100;
            if(self.$scope.selectedFilter.key === "phoneCallsTime" && !isPercent) {
                plotData = self._secondsToHHMMSS(plotData);
            }
            return serie.label +': '+ plotData + (isPercent ? '%' : '');
        };

        var createTooltipForSerie = function(rolledOverSerie, date, plotDataIndex) {
            var formattedDate = getTooltipDateRange(date);
            var tooltipContent = '<strong>'+ formattedDate +'</strong><hr/><ul style="margin:0;padding-left:15px;">';
            var totalPlotData = computeTotalsForPercentage(plotDataIndex);
            var surroundingSeries = getSomeSurroundingSeries(rolledOverSerie, plotDataIndex);
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


        scope.availableFields = [];
        chartFields.forEach(function (serie) {
            var color = self.colorService.getNextColor();
            serie.color = color;
            scope.availableFields.push({
                name: serie.label,
                color: color
            });
        });

        var rows = [];
        var rowIndex = 0;
        axisData.x.forEach(function(date_str){
            //var date = new Date(Date.parse(date_str));
            var date = moment(date_str).toDate();
            var row = [date];
            chartFields.forEach(function (serie) {
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
                left: "10%",
                top: "5%",
                height: "85%",
                width: "85%"
            }
        };

        // ---------------------------
        //  vAxis
        // ---------------------------

        self.chartOptions.vAxis = {
            baseline: 0
        };

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
        var minDate = moment(axisData.x[0]).toDate();
        var maxDate = moment(axisData.x[axisData.x.length-1]).toDate();

        if(axisData.x.length===1) {
            minDate.setDate(minDate.getDate() - 1);
            maxDate.setDate(maxDate.getDate() + 1);
        }

        self.chartOptions.hAxis = {
            format: computedFormat,
            gridlines: {
                count: Math.max( Math.min( axisData.x.length, 8), 2 ) /* max number of ticks */
            },
            minValue: minDate,
            maxValue: maxDate
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
    /*PieChartWidgetView.prototype.getVaxisTicks = function(chartFields){
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
    };*/

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
        return this._getVaxisTicksFromMax(totalMax);
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
        return this._getVaxisTicksFromMax(totalMax);
    };

    PieChartWidgetView.prototype._getVaxisTicksFromMax = function(totalMax){
        var ticks = [];
        var maxTicks = Math.min(5, totalMax);
        var increment = Math.ceil(totalMax / maxTicks);
        var len = Math.ceil(totalMax / increment);
        for( var i=0; i<=len; i++ ) {
            ticks.push(i*increment);
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
                left: "10%",
                top: "5%",
                height: "85%",
                width: "85%"
            },
            tooltip: { trigger: 'selection' },
            sliceVisibilityThreshold: 0
        };

        chartService.drawChart(self.chart, self.chartData, self.chartOptions);
        google.visualization.events.addListener(self.chart, 'onmouseover', function(e){
            self.chart.setSelection([{row:e.row, column:null}]);
        });
        google.visualization.events.addListener(self.chart, 'onmouseout', function(e){
            self.chart.setSelection([{}]);
        });
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
            var row = [moment(d).toDate()];
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
            frozenColumns: 1,
            cssClassNames: {
                headerCell: 'google-visualization-table-th text-center'
            }
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
        csv_out = csv_cols.join("\t")+"\r\n";

        // Iterate rows
        for (i=0; i<dt_rows; i++) {
            var raw_col = [];
            for (var j=0; j<dt_cols; j++) {
                // Replace any commas in row values
                raw_col.push(dataTable_arg.getFormattedValue(i, j, 'label').replace(/;/g,""));
            }
            // Add row to CSV text
            csv_out += raw_col.join("\t")+"\r\n";
        }

        return csv_out;
    };

    PieChartWidgetView.prototype._downloadCSV = function(csv_out) {
        var is_safari = /Version\/[\d\.]+.*Safari/.test(navigator.userAgent);
        if( is_safari ) {
            window.open('data:attachment/csv;charset=utf-8,' + encodeURI(csv_out));
        } else {
            var blob = new Blob([csv_out], {type: 'text/csv;charset=utf-8'});
            var url = window.URL || window.webkitURL;
            var link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
            link.href = url.createObjectURL(blob);
            link.download = this.$scope.widget.widgetName.split(" ").join("_") + "-" + this.$scope.selectedFilter.key + "-" + this.$scope.selectedRangeOption + ".csv";

            var event = document.createEvent("MouseEvents");
            event.initEvent("click", true, false);
            link.dispatchEvent(event);
        }
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