/**
 * Created by justin on 1/26/15.
 */
define([
    'jquery',
    'modules/saleAnalytics/widgets/GraphColorService'
], function ($, GraphColorService) {

    function BarChart(plotData, tickLabels, configuration, plotImpl) {
        this.plotData = plotData;
        this.tickLabels = tickLabels;
        this.configuration = configuration;
        this.paintPlot = plotImpl;
        this.renderedElement = null;

        this.colorService = new GraphColorService();
        this.configuration.colors = this.colorService.$colors;
    }

    BarChart._isNotEmpty = function (e) {
        if (!e) {
            return false;
        }

        return e.isOption ? !e.isEmpty : e != null;
    };

    BarChart.prototype.getTickLabels = function () {
        return this.tickLabels.map(function (item, index) {
            return [index, item];
        });
    };

    BarChart.prototype.paint = function (element) {
        if (!this.configuration.xaxis.ticks)
            this.configuration.xaxis.ticks = this.getTickLabels();

        this.renderedElement = element;

        this.plotData = this.plotData.filter(BarChart._isNotEmpty);
        this.paintPlot(this.renderedElement, this.plotData, this.configuration);
    };

    BarChart.getChart = function(){
        if(!this.renderedElement || !this.plotData || !this.configuration) return null;
        return this.paintPlot(this.renderedElement, this.plotData, this.configuration);
    };

    BarChart.prototype.onHover = function (callback) {
        this.renderedElement.bind("plothover", callback);
    };

    BarChart.basic = function (plotData, tickLabels) {
        return BarChart.newInstance(plotData, tickLabels, {
            xaxis: {
                tickColor: 'transparent',
                rotateTicks: 25
            },
            yaxis: {
                tickColor: '#ddd',
                ticksLength: 10
            },
            grid: {
                hoverable: true,
                tickColor: "#ccc",
                borderWidth: 0,
                borderColor: 'rgba(0,0,0,0.2)',
                margin: {
                    bottom: 40,
                    right: 40
                }
            },
            series: {
                stack: false,
                lines: {
                    show: false,
                    fill: false,
                    steps: false
                },
                bars: {
                    show: true,
                    barWidth: 0.5,
                    align: 'center',
                    fillColor: null
                },
                highlightColor: 'rgba(0,0,0,0.8)'
            },
            legend: {
                show: true,
                labelBoxBorderColor: '#ccc',
                position: 'ne',
                noColumns: 1
            }
        });
    };

    BarChart.newInstance = function (plotData, tickLabels, cfg, plotImpl) {
        return new BarChart(plotData, tickLabels, cfg, plotImpl || $.plot || function () {
            });
    };

    return BarChart;
});