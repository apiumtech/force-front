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

    Plot._isNotEmpty = function (e) {
        if (!e) {
            return false;
        }

        return e.isOption ? !e.isEmpty : e != null;
    };

    Plot._asPlot = function (e) {
        if (!e) {
            throw new Error("e is null");
        }

        return e.isOption ? e.getOrElse(throwException(new Error("could not get plot"))) : e;
    };

    Plot._asLabel = function (e, index) {
        if (e === null || undefined === e) {
            throw new Error("e is null");
        }

        if (e.isOption) { // is a framework option
            return [index, e.getOrElse(throwException(new Error("invalid label")))];
        } else {
            return [index, e];
        }
    };

    Plot.prototype.paint = function (element) {
        this.configuration.xaxis = this.configuration.xaxis || {};
        this.configuration.xaxis.ticks = this.labels;

        this.paintPlot(element, this.plots.map(function (e) {
            return e.digest(element);
        }).filter(Plot._isNotEmpty), this.configuration);
        this.renderedElement = element;
    };

    Plot.prototype.onHover = function (callback) {
        this.renderedElement.bind("plothover", callback);
    };

    Plot.basic = function (labels, plots, isStacked) {
        return Plot.newInstance(labels || [], plots, {
            xaxis: {tickColor: '#ddd', tickSize: 10},
            yaxis: {tickColor: '#ddd', tickSize: 10},
            series: {
                stack: isStacked
            },
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
                margin: 10,
                noColumns: 1,
                show: true
            }
        });
    };

    Plot.newInstance = function (labels, plots, cfg, plotImpl) {
        var labelArray = labels.map(Plot._asLabel);
        var plotArray = plots.filter(Plot._isNotEmpty).map(Plot._asPlot);

        return new Plot(labelArray, plotArray, cfg, plotImpl || $.plot || function () {
        });
    };

    return Plot;
});