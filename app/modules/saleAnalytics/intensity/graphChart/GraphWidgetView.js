/**
 * Created by justin on 12/22/14.
 */
define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/intensity/graphChart/GraphWidgetModel',
    'modules/saleAnalytics/intensity/graphChart/GraphWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'plots/Plot',
    'plots/LineGraphPlot',
    'jquery'
], function (WidgetBaseView, GraphWidgetModel, GraphWidgetPresenter, BaseWidgetEventBus, Plot, LineGraphPlot, $) {
    'use strict';

    var LINE = 'line', FILLED = 'filled';

    function GraphWidgetView(scope, element, model, presenter) {
        WidgetBaseView.call(this, scope, element, model, presenter);
        scope.filters = [];
        scope.selectedFilter = "visits";
        scope.selectedRangeOption = "hour";
        scope.currentChartType = LINE;
        var self = this;

        self.configureEvents();
    }

    GraphWidgetView.prototype = Object.create(WidgetBaseView.prototype, {
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

    GraphWidgetView.prototype.configureEvents = function () {
        var self = this;
        self.isAssigned = false;
        var eventChannel = self.eventChannel,
            scope = self.$scope;

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

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
            self.availableFields.forEach(function (field) {
                if (field.name === fieldName) {
                    field.isDisplaying = !field.isDisplaying;
                }
            });

            self.refreshChart();
        };

        self.fn.refreshChart = function () {
            self.refreshChart();
        };
    };

    GraphWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        var self = this;
        self.data = data.data.params;
        self.extractFilters();
        self.extractDisplayFields();
        self.refreshChart();
    };

    GraphWidgetView.prototype.refreshChart = function () {
        var self = this,
            scope = self.$scope,
            data = self.data;

        if (!data.fields || !data.fields.length) return;

        var chartFields = [];

        data.fields.forEach(function (field) {
            var lineGraph = self.getLineGraph(field, scope.availableFields, scope.currentChartType);
            chartFields.push(lineGraph);
        });

        self.paintChart($(self.element).find('.chart-place-holder'), chartFields, data.axis);
    };

    GraphWidgetView.prototype.paintChart = function (element, chartFields, axisData) {
        var plot = Plot.basic(axisData.x, chartFields, this.$scope.currentChartType === FILLED);
        plot.paint($(element));
        plot.onHover(this.onChartHover.bind(this));
    };

    var previousPoint = null;
    GraphWidgetView.prototype.onChartHover = function (event, pos, chartItem) {
        function showTooltip(x, y, contents) {
            $('<div id="tooltip" class="flot-tooltip">' + contents + '</div>').css({
                top: y - 45,
                left: x - 55
            }).appendTo("body").fadeIn(200);
        }

        if (chartItem) {
            if (previousPoint !== chartItem.dataIndex) {
                previousPoint = chartItem.dataIndex;
                $("#tooltip").remove();
                var y = chartItem.datapoint[1].toFixed(2);

                var content = chartItem.series.label + " " + y;
                showTooltip(chartItem.pageX, chartItem.pageY, content);
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
        event.preventDefault();
    };

    GraphWidgetView.prototype.getLineGraph = function (fieldData, availableFields, chartType) {
        var fieldStatus = _.find(availableFields, function (field) {
            return field.name === fieldData.name;
        });

        var hidden = !fieldStatus.isDisplaying;
        if (hidden) return null;

        var filled = chartType === 'filled';

        var lineGraph = GraphWidgetView.getLineGraphInstance(fieldData, hidden, filled);
        return lineGraph;
    };

    GraphWidgetView.prototype.extractFilters = function () {
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

    GraphWidgetView.prototype.extractDisplayFields = function () {
        var self = this;
        var fieldsToMerge = self.availableFields;

        var newFields = self.data.fields.map(function (item) {
            return {
                name: item.name,
                isDisplaying: true
            };
        });

        newFields.forEach(function (field) {
            var isExisting = _.find(fieldsToMerge, function (c) {
                return c.name == field.name
            });

            if (undefined === isExisting)
                fieldsToMerge.push(field);
        });

        self.availableFields = fieldsToMerge;
    };

    GraphWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || GraphWidgetModel.newInstance();
        var presenter = $presenter || GraphWidgetPresenter.newInstance();

        var view = new GraphWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    GraphWidgetView.getLineGraphInstance = function (field, hidden, filled) {
        return LineGraphPlot.newInstance(field.name, field.data, hidden, filled);
    };

    return GraphWidgetView;
});