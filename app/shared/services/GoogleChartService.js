/**
 * Created by Justin on 2/11/2015.
 */
define([], function () {
    var google = window.google || {};
    google.visualization = google.visualization || {
            DataTable: function () {
                return {
                    addColumn: function(){},
                    addRows: function(){}
                }
            },
            ScatterChart: function () {
                return {
                    draw: function () {
                    }
                }
            },
            events: {
                addListener: function () {
                }
            }
        };

    function GoogleChartService(googleChart) {
        this.googleChart = googleChart;
    }

    GoogleChartService.prototype.createChart = function (element, chartName) {
        switch (chartName) {
            case 'scatter':
                return new this.googleChart.ScatterChart(element);
            default:
                throw new Error('This chart is not supported at the moment');
        }
    };

    GoogleChartService.prototype.createDataTable = function(data){
        var dataTable = new this.googleChart.DataTable();

        data.columns.forEach(function(c){
            if(c.name)
                dataTable.addColumn(c.type, c.name);
            else
                dataTable.addColumn(c);
        });

        dataTable.addRows(data.rows);
        return dataTable;
    };

    GoogleChartService.prototype.drawChart = function (chart, data, options) {
        chart.draw(data, options);
    };

    GoogleChartService.newInstance = function (googleChartService) {
        if (!googleChartService) {
            google.setOnLoadCallback(function () {
            });
            googleChartService = google.visualization;
        }
        return new GoogleChartService(googleChartService);
    };

    return GoogleChartService;
});