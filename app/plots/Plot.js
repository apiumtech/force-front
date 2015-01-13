/**
 * Created by kevin on 1/13/15.
 */
app.registerService(function () {
    function Plot(labels, plots, configuration, plotImpl) {
        this.labels = labels;
        this.plots = plots;
        this.configuration = configuration;
        this.paintPlot = plotImpl;
    }

    function _isNotEmpty(e) {
        return e.isOption ? !e.isEmpty : e != null;
    }

    function _asPlot(e) {
        return e.isOption ? e.getOrElse(throwException("could not get plot")) : e;
    }

    function _asLabel(e, index) {
        if (e.isOption) { // is a framework option
            return [index, e.getOrElse(throwException(e))];
        } else if (e.slice) {
            return [index, e];
        }
    }

    Plot.prototype.paint = function (element) {
        this.configuration.xaxis = this.configuration.xaxis || {};
        this.configuration.xaxis.ticks = this.labels;

        this.paintPlot(element, this.plots.map(function (e) { return e.digest(element); }).filter(_isNotEmpty), this.configuration);
        $(element).bind("plothover", function (event, pos, item) {
            if (item) {
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);

                alert("hola: " + y);
            }
        });
    };

    Plot.basic = function (labels, plots) {
        return Plot.newInstance(labels || [], plots, {
            xaxis: {  tickColor: '#ddd', tickSize: 10 },
            yaxis: {  tickColor: '#ddd', tickSize: 10 },
            grid: {
                backgroundColor: "#fff",
                hoverable: true,
                clickable: true,
                tickColor: "#ccc",
                borderWidth: 1,
                borderColor: '#ddd'
            },
            legend: {
                labelBoxBorderColor: '#ddd',
                margin: 0,
                show: true
            }
        });
    };

    Plot.newInstance = function (labels, plots, cfg, plotImpl) {
        var labelArray = labels.map(_asLabel);
        var plotArray = plots.filter(_isNotEmpty).map(_asPlot);
        if (plotArray.length == 0) {
            return None();
        }

        return Some(new Plot(labelArray, plotArray, cfg, plotImpl || $.plot || function () {}));
    };

    return { basic: Plot.basic, newInstance: Plot.newInstance };
});