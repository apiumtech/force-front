/**
 * Created by justin on 1/26/15.
 */
app.registerService(function () {
    function PieChart(plotData, configuration, plotImpl) {
        this.plotData = plotData;
        this.configuration = configuration;
        this.paintPlot = plotImpl;
    }

    PieChart._isNotEmpty = function (e) {
        if (!e) {
            return false;
        }

        return e.isOption ? !e.isEmpty : e != null;
    };

    PieChart.prototype.paint = function (element) {
        this.paintPlot(element, this.plotData.filter(PieChart._isNotEmpty), this.configuration)
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