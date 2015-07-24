/**
 * Created by justin on 2/2/15.
 */
define([
    'jquery',
    'modules/saleAnalytics/widgets/GraphColorService'
], function ($, GraphColorService) {
    function SingleLineChart(plotData, tickLabels, configuration, plotImpl) {
        this.plotData = plotData;
        this.tickLabels = tickLabels;
        this.configuration = configuration;
        this.paintPlot = plotImpl;
        this.renderedElement = null;

        this.colorService = new GraphColorService();
        this.configuration.colors = this.colorService.$colors;
    }

    SingleLineChart._isNotEmpty = function (e) {
        if (!e) {
            return false;
        }

        return e.isOption ? !e.isEmpty : e != null;
    };

    SingleLineChart._asPlot = function (e) {
        if (!e) {
            throw new Error("e is null");
        }

        return e.isOption ? e.getOrElse(throwException(new Error("could not get plot"))) : e;
    };

    SingleLineChart.prototype.paint = function (element) {
        this.renderedElement = element;
        this.plotData = this.plotData.map(function (e) {
            return e.digest(element);
        }).filter(SingleLineChart._isNotEmpty);
        this.paintPlot(this.renderedElement, this.plotData, this.configuration);
    };

    SingleLineChart.getChart = function(){

        if(!this.renderedElement || !this.plotData || !this.configuration) return null;

        return this.paintPlot(this.renderedElement, this.plotData.map(function (e) {
            return e.digest(element);
        }).filter(SingleLineChart._isNotEmpty), this.configuration);

    };

    SingleLineChart.prototype.onHover = function (callback) {
        this.renderedElement.bind("plothover", callback);
    };

    SingleLineChart.basic = function (plotData, tickLabels) {
        if (plotData.length > 1)
            throw new Error("Single Line chart only accepts single data field");

        return SingleLineChart.newInstance(plotData, tickLabels, {
            xaxis: {
                tickColor: '#ddd',
                tickSize: 2,
                rotateTicks: 25
            },
            yaxis: {
                tickColor: '#ddd',
                tickSize: 20
            },
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#ccc",
                borderWidth: 1,
                borderColor: '#ddd',
                margin: {
                    bottom: 40,
                    right: 40
                }
            },
            legend: {
                labelBoxBorderColor: '#ddd',
                margin: 5,
                noColumns: 1,
                show: true
            }
        });
    };

    SingleLineChart.newInstance = function (plotData, tickLabels, cfg, plotImpl) {
        var plotArray = plotData.filter(SingleLineChart._isNotEmpty).map(SingleLineChart._asPlot);
        if (plotArray.length == 0) {
            return None();
        }
        return new SingleLineChart(plotArray, tickLabels, cfg, plotImpl || $.plot || function () {
        });
    };

    return SingleLineChart;
});