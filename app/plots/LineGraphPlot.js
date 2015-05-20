/**
 * Created by kevin on 1/13/15.
 */
define([
    'jquery'
], function ($) {
    function LineGraphPlot(label, data, hidden, filled, color) {
        this.label = label;
        this.plotData = data;
        this.hidden = hidden || false;
        this.filled = filled || false;
        this.color = color || null;
    }

    LineGraphPlot.prototype.rename = function (label) {
        return new LineGraphPlot(label, this.plotData, this.hidden, this.filled);
    };

    LineGraphPlot.prototype.hide = function () {
        return new LineGraphPlot(this.label, this.plotData, true, this.filled);
    };

    LineGraphPlot.prototype.show = function () {
        return new LineGraphPlot(this.label, this.plotData, false, this.filled);
    };

    LineGraphPlot.prototype.fill = function () {
        return new LineGraphPlot(this.label, this.plotData, this.hidden, true);
    };

    LineGraphPlot.prototype.empty = function () {
        return new LineGraphPlot(this.label, this.plotData, this.hidden, false);
    };

    LineGraphPlot.prototype.data = function (data) {
        return new LineGraphPlot(this.label, data || [], this.hidden, this.filled);
    };

    LineGraphPlot.prototype.digest = function () {
        var result = {};
        if (this.label.isOption) {
            if (!this.label.isEmpty) {
                result.label = this.label;
            }
        } else {
            result.label = this.label;
        }

        result.data = this.plotData.map(function (e, i) {
            return [i, e]
        });

        if (this.color) {
            result.color = this.color;
        }

        result.lines = {show: !this.hidden, fill: this.filled, lineWidth: 2, zero: !this.filled};
        result.points = {show: !this.hidden, radius: 3, fillColor: '#fff'};
        result.shadowSize = 0;
        return result;
    };

    LineGraphPlot.newInstance = function (label, data, hidden, filled, color) {
        return new LineGraphPlot(label || None(), data || [], hidden || false, filled || false, color);
    };

    return LineGraphPlot;
});