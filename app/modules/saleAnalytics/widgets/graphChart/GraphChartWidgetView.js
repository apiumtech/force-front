/**
 * Created by justin on 12/22/14.
 */
define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/graphChart/GraphChartWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/widgets/WidgetEventBus',
    'plots/Plot',
    'plots/LineGraphPlot',
    'jquery',
    'modules/saleAnalytics/widgets/GraphColorService',
    'shared/services/GoogleChartService'
], function (WidgetBaseView, GraphWidgetPresenter, BaseWidgetEventBus, WidgetEventBus, Plot, LineGraphPlot, $, GraphColorService, GoogleChartService) {
    'use strict';

    var LINE = 'line', FILLED = 'filled';

    function GraphChartWidgetView(scope, element, presenter) {
        presenter = presenter || new GraphWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        scope.filters = [];
        scope.selectedFilter = "visits";
        scope.selectedRangeOption = "hour";
        scope.currentChartType = LINE;
        var self = this;
        self.colorService = new GraphColorService();
        self.widgetEventBus = WidgetEventBus.getInstance();
        self.chartService = GoogleChartService.newInstance();
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
        self.isAssigned = false;
        var eventChannel = self.eventChannel;

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        eventChannel.onExpandingWidget(function(){
            setTimeout(self.reDraw.bind(self), 250);
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

        self.fn.switchToFilled = function () {
            self.$scope.currentChartType = FILLED;
            self.refreshChart();
        };

        self.fn.switchToLine = function () {
            self.$scope.currentChartType = LINE;
            self.refreshChart();
        };

        self.fn.toggleDisplayField = function (fieldName) {

            function isTheLastOneToBeChecked() {
                var count = 0;
                self.availableFields.forEach(function (field) {
                    if( field.isDisplaying ) {
                        count++;
                    }
                });
                return count == 1;
            }

            var shouldToggle = true;
            self.availableFields.forEach(function (field) {
                if (field.name === fieldName) {
                    if( isTheLastOneToBeChecked() && field.isDisplaying ){
                        shouldToggle = false;
                    } else {
                        field.isDisplaying = !field.isDisplaying;
                    }
                    return;
                }
            });

            self.refreshChart();

            return shouldToggle;
        };

        self.fn.refreshChart = function () {
            self.refreshChart();
        };

        self.fn.init = function () {
            setTimeout( function(){
                $('[data-toggle=tooltip]').tooltip();
            }, 2000 );
        };

        self.resizeHandling();
    };

    GraphChartWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        var self = this;
        self.data = data.data.params;
        self.extractFilters();
        self.extractDisplayFields();
        self.refreshChart();
    };

    GraphChartWidgetView.prototype.refreshChart = function () {
        var self = this,
            scope = self.$scope,
            data = self.data;

        if (!data.fields) return;
        if(!data.fields.length) data.fields = [];

        var chartFields = [];

        data.fields.forEach(function (field) {
            var lineGraph = self.getLineGraph(field, scope.availableFields, scope.currentChartType);
            chartFields.push(lineGraph);
        });

        this.colorService.initialize();

        self.paintChart($(self.element).find('.chart-place-holder'), chartFields, data.axis);
    };

    GraphChartWidgetView.prototype.reDraw = function(){
        //if(!Plot.getChart()) return;
        //Plot.getChart().draw();
        var self = this,
            scope = self.$scope,
            data = self.data;
        var chartFields = [];

        data.fields.forEach(function (field) {
            var lineGraph = self.getLineGraph(field, scope.availableFields, scope.currentChartType);
            chartFields.push(lineGraph);
        });
        self.paintChart($(self.element).find('.chart-place-holder'), chartFields, data.axis);
    };

    GraphChartWidgetView.prototype.paintChart = function (element, chartFields, axisData) {
        //var plot = Plot.basic(axisData.x, chartFields, this.$scope.currentChartType === FILLED);
        //plot.paint($(element));
        //plot.onHover(this.onChartHover.bind(this));

        var self = this;
        var scope = self.$scope;
        var data = self.data;
        var chartService = self.chartService;
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn('string', '---');
        chartFields.forEach(function (serie) {
            if(serie !== null && !serie.hidden) {
                dataTable.addColumn('number', serie.label);
            }
        });
        var columns = [];
        var index = 0;
        axisData.x.forEach(function(item){
            var col = [item];
            chartFields.forEach(function (serie) {
                if(serie !== null && !serie.hidden) {
                    col.push(serie.plotData[index]);
                }
            });
            columns.push(col);
            index = columns.length-1;
        });
        dataTable.addRows(columns);

        self.chartData = dataTable;
        self.chartOptions = {
            title: self.widgetName,
            colors: self.colorService.$colors.slice()
        };

        if(scope.currentChartType == "line") {
            self.chart = chartService.createChart(element[0], 'line');
        } else {
            self.chartOptions.isStacked = true;
            self.chart = chartService.createChart(element[0], 'area');
        }

        chartService.drawChart(self.chart, self.chartData, self.chartOptions);
    };

    var previousPoint = null;
    GraphChartWidgetView.prototype.onChartHover = function (event, pos, chartItem) {
        function showTooltip(x, y, contents) {
            $('<div id="tooltip" class="flot-tooltip">' + contents + '</div>').css({
                top: y + 10,
                left: x + 10,
                opacity: 0.8
            }).appendTo("body").fadeIn(200);
        }

        if (chartItem) {
            if (previousPoint !== chartItem.dataIndex) {
                previousPoint = chartItem.dataIndex;
                $("#tooltip").remove();
                var x = this.data.axis.x[chartItem.dataIndex];
                var y = chartItem.datapoint[1];

                var content = "<div>"+ chartItem.series.label +" - "+ x +"</div><div>"+ y +"</div>";
                showTooltip(chartItem.pageX, chartItem.pageY, content);
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
        event.preventDefault();
    };

    GraphChartWidgetView.prototype.getLineGraph = function (fieldData, availableFields, chartType) {
        var fieldStatus = _.find(availableFields, function (field) {
            return field.name === fieldData.name;
        });

        var hidden = !fieldStatus.isDisplaying;
        if (hidden) return null;

        var filled = chartType === 'filled';
        var color = this.colorService.getNextColor();

        var lineGraph = GraphChartWidgetView.getLineGraphInstance(fieldData, hidden, filled, color);
        return lineGraph;
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
        var fieldsToMerge = [];
            //fieldsToMerge = self.availableFields;

        var newFields = self.data.fields.map(function (item) {
            return {
                name: item.name,
                isDisplaying: true
            };
        });

        //newFields.forEach(function (field) {
        //    var isExisting = _.find(fieldsToMerge, function (c) {
        //        return c.name == field.name
        //    });
        //
        //    if (undefined === isExisting)
        //        fieldsToMerge.push(field);
        //});

        self.availableFields = newFields;
    };

    GraphChartWidgetView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {
        var view = new GraphChartWidgetView($scope, $element);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    GraphChartWidgetView.getLineGraphInstance = function (field, hidden, filled, color) {
        return LineGraphPlot.newInstance(field.name, field.data, hidden, filled, color);
    };

    return GraphChartWidgetView;
});