/* global google */

define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/graphChart/GraphChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'jquery',
    'moment',
    'config',
    'modules/saleAnalytics/widgets/GraphColorService',
    'shared/services/GoogleChartService',
    'underscore'
], function (WidgetBaseView, GraphWidgetPresenter, BaseWidgetEventBus, WidgetEventBus, $, moment, config, GraphColorService, GoogleChartService, _) {
    'use strict';

    var LINE = 'line';
    var FILLED = 'filled';
    var FILLED100 = 'filled100';


    function GraphChartWidgetView(scope, element, presenter) {
        presenter = presenter || new GraphWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);

        scope.filters = [];
        scope.selectedFilter = "visits";
        scope.selectedRangeOption = "week";
        scope.currentChartType = LINE;

        var self = this;
        self.colorService = new GraphColorService();
        self.widgetEventBus = WidgetEventBus.getInstance();
        self.chartService = GoogleChartService.newInstance();
        self.data.noData = false;

        self.mainFilterFromDate = moment().subtract(config.defaultDateSubtraction, 'days').toDate();
        self.mainFilterToDate = new Date();

        self.configureEvents();
    }

    GraphChartWidgetView.inherits(WidgetBaseView, {
        availableFields: {
            get: function () {
                return this.$scope.availableFields || (this.$scope.availableFields = []);
            },
            set: function (value) {
                this.$scope.availableFields = value;
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


    GraphChartWidgetView.prototype.configureEvents = function () {
        var self = this;
        var eventChannel = self.eventChannel;

        eventChannel.onReloadCommandReceived(
            self.onReloadCommandReceived.bind(self)
        );

        eventChannel.onExpandingWidget(function(){
            setTimeout(self.paintChart.bind(self), 250);
        });

        self.fn.changeFilterRange = function (value) {
            self.$scope.selectedRangeOption = value;
            self.event.onFilterRangeChanged();
        };

        self.fn.changeFilter = function (selectedFilter) {
            self.availableFields = [];
            self.selectedFilter = selectedFilter;
            self.event.onFilterChanged();
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

        self.fn.toggleDisplayField = function (fieldName) {
            var isTheLastOneToBeChecked = function() {
                var count = 0;
                self.availableFields.forEach(function (field) {
                    if( field.isDisplaying ) {
                        count++;
                    }
                });
                return count === 1;
            };
            var shouldToggle = true;
            self.availableFields.forEach(function (field) {
                if (field.name === fieldName) {
                    if( isTheLastOneToBeChecked() && field.isDisplaying ){
                        shouldToggle = false;
                    } else {
                        field.isDisplaying = !field.isDisplaying;
                    }
                }
            });
            self.paintChart();
            return shouldToggle;
        };

        self.fn.refreshChart = function () {
            self.paintChart();
        };

        self.fn.init = function () {
            setTimeout( function(){
                $('[data-toggle=tooltip]').tooltip();
            }, 2000 );
        };

        self.filterChannel.onDateFilterApplySignalReceived(function(filterValue){
            self.mainFilterFromDate = filterValue.dateStart;
            self.mainFilterToDate = filterValue.dateEnd;
        });


        self.resizeHandling();
    };


    GraphChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;

        var element = self.element.find('.chart-place-holder');
        element.empty();

        if(self.data.serverError){
            return;
        }

        self.data.noData = false;
        var deepData = responseData.data.params;

        if( !deepData || !deepData.axis || !deepData.fields ||
            deepData.axis.length === 0 || deepData.fields.length === 0 ) {
            self.data.noData = true;
            return;
        }

        self.data = _({}).extend(self.data, responseData.data.params);
        self.extractFilters();
        self.extractDisplayFields();
        self.paintChart();
    };


    GraphChartWidgetView.prototype.reDraw = function () {
        this.paintChart();
    };


    GraphChartWidgetView.prototype.paintChart = function () {
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
            var lineGraph = self.getLineGraph(field, scope.availableFields, scope.currentChartType);
            chartFields.push(lineGraph);
        });

        var axisData = data.axis;

        var chartService = self.chartService;
        var dataTable = new google.visualization.DataTable();

        var dateFormat = (self.$scope.selectedRangeOption === 'hour' ? 'timeofday' : 'date');
        var isHours = function(){
            return dateFormat === 'timeofday';
        };

        dataTable.addColumn(dateFormat, '');
        chartFields.forEach(function (serie) {
            if(serie !== null && !serie.hidden) {
                dataTable.addColumn('number', serie.label);
                dataTable.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
            }
        });

        var emptyDate = new Date(null);
        var createTooltipForSerie = function(serie, date, plotData) {
            var label = serie.label;
            var dateOption = self.$scope.selectedRangeOption;
            var formattedDate;

            if(self.selectedFilter === "phoneCallsTime") {
                formattedDate = self._secondsToHours(plotData, emptyDate);
            } else {
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
            }

            return '<div style="padding:10px;"><strong>'+ formattedDate +'</strong><br />'+ label +': <strong>'+ plotData +'</strong></div>';
        };

        var columns = [];
        var index = 0;
        axisData.x.forEach(function(date_str){
            var date = (isHours() ? [parseInt(date_str,10),0,0] : new Date(Date.parse(date_str)));
            var col = [date];
            chartFields.forEach(function (serie) {
                if(serie !== null && !serie.hidden) {
                    var plotData = serie.plotData[index];
                    col.push( plotData );
                    col.push( createTooltipForSerie(serie, date, plotData) );
                }
            });
            columns.push(col);
            index = columns.length-1;
        });
        dataTable.addRows(columns);

        self.chartData = dataTable;
        self.chartOptions = {
            title: self.widgetName,
            colors: self.colorService.$colors.slice(),
            legend: { position: 'top', alignment: 'end' },
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
        if(self.selectedFilter === "phoneCallsTime") {
            self.chartOptions.vAxis.ticks = self.getVaxisPhoneCallsTicks(chartFields);
        } else if(self.selectedFilter === "activityScores" && scope.currentChartType === LINE) {
            self.chartOptions.vAxis.ticks = [1,2,3,4,5,6,7,8,9,10];
        } else {
            if(isHours() || scope.currentChartType === LINE) {
                self.chartOptions.vAxis.ticks = self.getVaxisTicks(chartFields);
            } else if(scope.currentChartType === FILLED){
                self.chartOptions.vAxis.ticks = self.getVaxisTicksFilled(chartFields);
            }
        }

        var computedFormat = self.$scope.selectedRangeOption === 'month' ? 'MMM yy' :
            self.$scope.selectedRangeOption === 'week' ? 'd/M/yy' :
            self.$scope.selectedRangeOption === 'date' ? 'd/M/yy' :
            self.$scope.selectedRangeOption === 'hour' ? 'HH:mm' : 'd/M/yy';

        // For d3 time intervals
        // @see http://stackoverflow.com/a/23957607/779529
        self.chartOptions.hAxis = {
            format: computedFormat,
            gridlines: {
                count: 8 /* max number of ticks */
            },
            minValue: self.mainFilterFromDate,
            maxValue: self.mainFilterToDate
        };


        if( isHours() ){
            self.chartOptions.bar = {groupWidth: "75%"};
            var hourTicks = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map( function(n){
                return {f:("0"+ n + "h").substr(-3), v:[n,0,0]};
            });
            self.chartOptions.hAxis = {ticks: hourTicks};
            self.chart = chartService.createChart(element[0], 'bar');
        } else {
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
        }

        chartService.drawChart(self.chart, self.chartData, self.chartOptions);
    };


    // -----------------
    //
    //  vAxis ticks
    //
    // -----------------

    // Rounded number ticks
    GraphChartWidgetView.prototype.getVaxisTicks = function(chartFields){
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
    GraphChartWidgetView.prototype.getVaxisTicksFilled = function(chartFields){
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

    // hh:mm:ss ticks
    GraphChartWidgetView.prototype.getVaxisPhoneCallsTicks = function(chartFields) {
        var self = this;
        var ticks = self.getVaxisTicks(chartFields);
        var date = new Date(null);
        ticks = ticks.map(function(seconds){
            return {
                v: seconds,
                f: self._secondsToHours(seconds, date)
            };
        });
        return ticks;
    };
    GraphChartWidgetView.prototype._secondsToHours = function(seconds, date) {
        date = date || new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().substr(11, 8);
    };


    GraphChartWidgetView.prototype.getLineGraph = function (fieldData, availableFields) {
        var fieldStatus = _.find(availableFields, function (field) {
            return field.name === fieldData.name;
        });
        var hidden = !fieldStatus.isDisplaying;
        if (hidden) {
            return null;
        }
        return {
            label: fieldData.name,
            plotData: fieldData.data,
            hidden: false
        };
    };



    GraphChartWidgetView.prototype.extractFilters = function () {
        var self = this;
        self.$scope.filters = self.data.filters;
        var filterList = self.$scope.filters,
            currentSelectedFilter = self.$scope.selectedFilter;

        var filterKeys = filterList.map(function (filter) {
            return filter.key;
        });

        self.$scope.selectedFilter =
            currentSelectedFilter && filterKeys.indexOf(currentSelectedFilter) !== -1 ?
                currentSelectedFilter :
                self.$scope.filters[0].key;
    };


    GraphChartWidgetView.prototype.extractDisplayFields = function () {
        var self = this;
        self.availableFields = self.data.fields.map(function (item) {
            return {
                name: item.name,
                isDisplaying: true
            };
        });
    };


    GraphChartWidgetView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {
        var view = new GraphChartWidgetView($scope, $element);
        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return GraphChartWidgetView;
});