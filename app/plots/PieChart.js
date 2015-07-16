/**
 * Created by justin on 1/26/15.
 */
define([
    'jquery',
    'modules/saleAnalytics/widgets/GraphColorService'
], function ($, GraphColorService) {
    function PieChart(plotData, configuration, plotImpl) {
        this.plotData = plotData;
        this.configuration = configuration;
        this.paintPlot = plotImpl;

        this.colorService = new GraphColorService();
        this.configuration.colors = this.colorService.$colors;
    }

    PieChart._isNotEmpty = function (e) {
        if (!e) {
            return false;
        }

        return e.isOption ? !e.isEmpty : e != null;
    };

    PieChart.prototype.paint = function (element) {
        this.element = element;
        this.plotData = this.plotData.filter(PieChart._isNotEmpty);
        this.paintPlot(this.element, this.plotData, this.configuration)
    };

    PieChart.getChart = function(){
        if(!this.element || !this.plotData || !this.configuration) return null;
        return this.paintPlot(this.element, this.plotData, this.configuration);
    };

    PieChart.basic = function (plotData) {
        return PieChart.newInstance(plotData, {
            series: {
                pie: {
                    innerRadius: .5,
                    show: true,
                    label: {
                        show: true
                    }
                }
            },
            legend: {
                show: true
            }
        });
    };

    PieChart.newInstance = function (plotData, cfg, plotImpl) {
        return new PieChart(plotData, cfg, plotImpl || $.plot || function () {
        });
    };

    return PieChart;
});