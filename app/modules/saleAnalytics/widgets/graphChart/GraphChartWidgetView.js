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
    'shared/services/TranslatorService',
    'underscore'
], function (WidgetBaseView, GraphWidgetPresenter, BaseWidgetEventBus, WidgetEventBus, $, moment, config, GraphColorService, GoogleChartService, TranslatorService, _) {
    'use strict';

    var LINE = 'line';
    var FILLED = 'filled';
    var FILLED100 = 'filled100';


    function GraphChartWidgetView(scope, element, presenter) {
        presenter = presenter || new GraphWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);

        var self = this;
        self.translator = TranslatorService.newInstance();
        scope.filters = [];
        scope.selectedFilter = {
            name: self.translator.translate('tabIntensity.activities.dropDown.itemVisits'),
            key: 'visits'
        };
        scope.selectedRangeOption = "week";
        scope.currentChartType = LINE;


        self.colorService = new GraphColorService();
        self.widgetEventBus = WidgetEventBus.getInstance();
        self.chartService = GoogleChartService.newInstance();
        self.data.noData = false;

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
            if(value==='hour') {
                self.fn.switchToLine();
            }
            self.event.onFilterRangeChanged();
        };

        self.fn.changeFilter = function (selectedFilter) {
            self.$scope.selectedRangeOption = 'week';
            self.event.onFilterRangeChanged(true);
            self.$scope.currentChartType = LINE;
            self.$scope.selectedFilter = selectedFilter;
            self.availableFields = [];
            self.event.onFilterChanged();
            self.applyWidgetDescription();
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
                // keep dropdown opened while selecting options #WAR-734
                $('#seriesToggleDropdown .dropdown-menu').on({
                    "click":function(e){
                        e.stopPropagation();
                    }
                });
            }, 2000 );
        };

        self.fn.calculateFieldName = function(field) {
          return self.translator.translate(field.name) || field.name;
        };

        self.filterChannel.onDateFilterApplySignalReceived(function(filterValue){
            //self.mainFilterFromDate = filterValue.dateStart;
            //self.mainFilterToDate = filterValue.dateEnd;
        });

        var columnsPerRow = 3;
        self.fn.serieRollOver = function(field, fieldIndex){
            self.chart.setSelection([{'column': 1 + fieldIndex * columnsPerRow }]);
        };


        self.resizeHandling();
    };


    GraphChartWidgetView.prototype.onReloadWidgetSuccess = function (responseData) {
        var self = this;

        var element = self.element.find('.chart-place-holder');
        element.empty();

        try {
            if(self.data.serverError){
                //return;
                throw new Error();
            }

            self.data.noData = false;
            var deepData = responseData.data.params;

            if( !deepData || !deepData.axis || !deepData.fields ||
                deepData.axis.length === 0 || deepData.fields.length === 0 ) {
                self.data.noData = true;
                //return;
                throw new Error();
            }

            self.data = _({}).extend(self.data, responseData.data.params);
            self.extractFilters();
            self.extractDisplayFields();
            self.paintChart();
        } catch(err) {
            self.data = self.data || {};
            self.data.filters = responseData.data.params.filters;
            self.extractFilters();
        }
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
                dataTable.addColumn({'type': 'string', 'role': 'style'});
            }
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
                if(!currentSerie.hidden) {
                    total += currentSerie.plotData[plotDataIndex];
                }
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
                    return !serie.hidden && serie.plotData[plotDataIndex] === plotData;
                });
            } else {
                var rolledOverSerieIndex = chartFields.indexOf(rolledOverSerie);
                var index;
                for(var i=rolledOverSerieIndex; i>=0; i--) {
                    index = i;
                    var serie = chartFields[i];
                    if(!serie.hidden && serie.plotData[plotDataIndex] > 0) {
                        break;
                    }
                }
                series = chartFields.slice(index, rolledOverSerieIndex+1).filter(function(serie){
                    return !serie.hidden;
                });
            }

            return series;
        };

        var createTooltipSerieItem = function(serie, plotData) {
            var isPercent = scope.currentChartType === FILLED100;
            if(self.$scope.selectedFilter.key === "phoneCallsTime" && !isPercent) {
                plotData = self._secondsToHHMMSS(plotData);
            }
            var label = self.translator.translate(serie.label) || serie.label;
            return label +': '+ plotData + (isPercent ? '%' : '');
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


        chartFields.forEach(function (serie) {
            var color = self.colorService.getNextColor();
            serie.color = color;
        });

        var rows = [];
        var rowIndex = 0;
        axisData.x.forEach(function(date_str){
            var date = ( isHours() ? [parseInt(date_str,10),0,0] : moment(date_str).toDate() );
            var row = [date];
            chartFields.forEach(function (serie) {
                var field = _.find(self.availableFields, function (field) {
                    return field.name === serie.label;
                });
                field.color = serie.color;

                if(serie !== null && !serie.hidden) {
                    var plotData = serie.plotData[rowIndex];
                    row.push( plotData );
                    row.push( createTooltipForSerie(serie, date, rowIndex) );
                    row.push( 'color: '+ serie.color );
                }
            });
            rows.push(row);
            rowIndex = rows.length;
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
                top: "5%",
                height: "80%",
                width: "94%"
            }
        };

        // ---------------------------
        //  vAxis
        // ---------------------------

        self.chartOptions.vAxis = {
            baseline: 0
        };

        if(self.$scope.selectedFilter.key === "phoneCallsTime") {
            if(isHours() || scope.currentChartType === LINE) {
                self.chartOptions.vAxis.ticks = self.getVaxisPhoneCallsTicks(chartFields);
            } else if(scope.currentChartType === FILLED){
                self.chartOptions.vAxis.ticks = self.getVaxisPhoneCallsTicksFilled(chartFields);
            }
        } else if(self.$scope.selectedFilter.key === "activityScores" && scope.currentChartType === LINE) {
            self.chartOptions.vAxis.ticks = [1,2,3,4,5,6,7,8,9,10];
        } else {
            if(isHours() || scope.currentChartType === LINE) {
                self.chartOptions.vAxis.ticks = self.getVaxisTicks(chartFields);
            } else if(scope.currentChartType === FILLED){
                self.chartOptions.vAxis.ticks = self.getVaxisTicksFilled(chartFields);
            }
        }
    
        var web3Config = window.sessionStorage.getItem('config'),
            userDateFormat = "d/M/yy",
            userTimeFormat = "HH:mm",
            is24Hours = true;
        if (web3Config) {
            web3Config = JSON.parse(web3Config);
            var web3Format = web3Config.userData.dotNetLocaleDateFormat.split(' ');
            userDateFormat = web3Format[0].replace('yyyy', 'yy');
            if (web3Format.length === 3) {
                // the third element is to show AM/PM, but there we have tt, and for google charts
                // should be aa
                userTimeFormat = "h a";
                is24Hours = false;
            }
        }
  
      // var computedFormat = self.$scope.selectedRangeOption === 'month' ? 'MMM yy' :
      //   self.$scope.selectedRangeOption === 'week' ? 'd/M/yy' :
      //     self.$scope.selectedRangeOption === 'date' ? 'd/M/yy' :
      //       self.$scope.selectedRangeOption === 'hour' ? 'HH:mm' : 'd/M/yy';
    
        var computedFormat = 'd/M/yy';
        switch (self.$scope.selectedRangeOption) {
            case 'month':
                computedFormat = 'MMM yy';
                break;
            case 'week':
            case 'date':
                computedFormat = userDateFormat;
                break;
            case 'hour':
                computedFormat = userTimeFormat;
                break;
        }

        // For d3 time intervals
        // @see http://stackoverflow.com/a/23957607/779529
        var minDate = moment(axisData.x[0]).toDate();
        var maxDate = moment(axisData.x[axisData.x.length-1]).toDate();

        if(axisData.x.length===1) {
            minDate.setDate(minDate.getDate()-1);
            maxDate.setDate(maxDate.getDate()+1);
        }

        self.chartOptions.hAxis = {
            format: computedFormat,
            gridlines: {
                count: Math.max( Math.min( axisData.x.length, 8), 2 ) /* max number of ticks */
            },
            minValue: minDate,
            maxValue: maxDate
        };

        if( isHours() ){
            self.chartOptions.bar = {groupWidth: "75%"};
            var hourTicks;
            if (is24Hours) {
                hourTicks = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map( function(n){
                    return {f:("0"+ n + "h").substr(-3), v:[n,0,0]};
                });
            }
            else {
                var hourAux = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
                var morning = ["0 a.m.", "1 a.m.", "2 a.m.", "3 a.m.", "4 a.m.", "5 a.m.", "6 a.m.", "7 a.m.", "8 a.m.", "9 a.m.", "10 a.m.", "11 a.m."];
                var afternoon = ["12 p.m.", "1 p.m.", "2 p.m.", "3 p.m.", "4 p.m.", "5 p.m.", "6 p.m.", "7 p.m.", "8 p.m.", "9 p.m.", "10 p.m.", "11 p.m."];
                hourTicks = morning.concat(afternoon).map( function(n, index){
                    return {f: n, v:[hourAux[index],0,0]};
                });
            }
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
        var serie;
        for( var i=0; i<chartFields.length; i++ ) {
            serie = chartFields[i];
            if(serie.hidden) {
                continue;
            }
            for( var j=0; j<serie.plotData.length; j++ ) {
                var plotValue = serie.plotData[j];
                totalMax = Math.max(plotValue, totalMax);
            }
        }
        return this._getVaxisTicksFromMax(totalMax);
    };

    // Addition ticks
    GraphChartWidgetView.prototype.getVaxisTicksFilled = function(chartFields){
        var totalMax = 1;
        var points = [];
        var dataPoints = chartFields[0].plotData.length;
        for(var i=0; i<dataPoints; i++){
            points[i] = 0;
            for(var j=0; j<chartFields.length; j++) {
                var serie = chartFields[j];
                if(serie.hidden) {
                    continue;
                }
                var plotValue = serie.plotData[i];
                points[i] = points[i] + plotValue;
                totalMax = Math.max(points[i], totalMax);
            }
        }
        return this._getVaxisTicksFromMax(totalMax);
    };

    GraphChartWidgetView.prototype._getVaxisTicksFromMax = function(totalMax){
        var ticks = [];
        var maxTicks = Math.min(5, totalMax);
        var increment = Math.ceil(totalMax / maxTicks);
        var len = Math.ceil(totalMax / increment);
        for( var i=0; i<=len; i++ ) {
            ticks.push(i*increment);
        }
        return ticks;
    };

    // hh:mm:ss ticks
    GraphChartWidgetView.prototype.getVaxisPhoneCallsTicks = function(chartFields) {
        var self = this;
        var totalMax = 1;
        var serie;
        var plotValue;
        for( var i=0; i<chartFields.length; i++ ) {
            serie = chartFields[i];
            if(serie.hidden) {
                continue;
            }
            for( var j=0; j<serie.plotData.length; j++ ) {
                plotValue = serie.plotData[j];
                totalMax = Math.max(plotValue, totalMax);
            }
        }
        return self._getVaxisPhoneCallsTicksFromMax(totalMax);
    };

    GraphChartWidgetView.prototype.getVaxisPhoneCallsTicksFilled = function(chartFields) {
        var self = this;
        var totalMax = 1;
        var points = [];
        var dataPoints = chartFields[0].plotData.length;
        for(var i=0; i<dataPoints; i++){
            points[i] = 0;
            for(var j=0; j<chartFields.length; j++) {
                var serie = chartFields[j];
                if(serie.hidden) {
                    continue;
                }
                var plotValue = serie.plotData[i];
                points[i] = points[i] + plotValue;
                totalMax = Math.max(points[i], totalMax);
            }
        }
        return self._getVaxisPhoneCallsTicksFromMax(totalMax);
    };

    GraphChartWidgetView.prototype._getVaxisPhoneCallsTicksFromMax = function(totalMax) {
        var self = this;
        var t = self._secondsDescomposition(totalMax);
        var increment;
        var skipMinutes = false;
        if(t.h > 1000) { increment = 3600 * 500; skipMinutes = true;
        } else if(t.h > 300) { increment = 3600 * 100; skipMinutes = true;
        } else if(t.h > 100) { increment = 3600 * 50; skipMinutes = true;
        } else if(t.h > 50) { increment = 3600 * 25; skipMinutes = true;
        } else if(t.h > 10) { increment = 3600 * 5; skipMinutes = true;
        } else if(t.h > 1) { increment = 3600; skipMinutes = true;
        } else if(t.h === 1) { increment = 60*30;
        } else if(t.m >  30) { increment = 60*20;
        } else if(t.m > 1 && t.m <  30) { increment = 60*10;
        } else { increment = totalMax / 5; }

        var ticks = [];
        var len = Math.ceil(totalMax/increment);
        for( var i=0; i<=len; i++ ) {
            ticks.push( increment * i );
        }

        ticks = ticks.map(function(seconds){
            return {
                v: seconds,
                f: seconds === 0 ? "0" :
                    totalMax < 60 ? self._secondsToHHMMSS(seconds) :
                        skipMinutes ? self._secondsDescomposition(seconds).h + "h" :
                            self._secondsToHM(seconds)
            };
        });
        return ticks;
    };


    GraphChartWidgetView.prototype._secondsToHHMMSS = function (secs) {
        var t = this._secondsDescomposition(secs);
        if (t.h < 10) {t.h = "0"+ t.h;}
        if (t.m < 10) {t.m = "0"+ t.m;}
        if (t.s < 10) {t.s = "0"+ t.s;}
        return  t.h + 'h ' +
                t.m + 'm ' +
                t.s + 's';
    };

    GraphChartWidgetView.prototype._secondsToHM = function (secs) {
        var t = this._secondsDescomposition(secs);
        return t.h + "h " +
               t.m + "m";
    };

    GraphChartWidgetView.prototype._secondsDescomposition = function (secs) {
        var sec_num = parseInt(secs, 10);
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        return {
            h: hours,
            m: minutes,
            s: seconds
        };
    };


    GraphChartWidgetView.prototype.getLineGraph = function (fieldData, availableFields) {
        var fieldStatus = _.find(availableFields, function (field) {
            return field.name === fieldData.name;
        });
        var hidden = !fieldStatus.isDisplaying;
        /*if (hidden) {
            return null;
        }*/
        return {
            label: fieldData.name,
            plotData: fieldData.data,
            hidden: hidden
        };
    };



    GraphChartWidgetView.prototype.extractFilters = function () {
        var self = this;
        self.$scope.filters = self.data.filters;
        var filterList = self.$scope.filters;
        var currentSelectedFilter = self.$scope.selectedFilter;

        var filterKeys = filterList.map(function (filter) {
            return filter.key;
        });

        self.$scope.selectedFilter = currentSelectedFilter && filterKeys.indexOf(currentSelectedFilter.key) !== -1 ?
                currentSelectedFilter :
                self.$scope.filters[0];
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
