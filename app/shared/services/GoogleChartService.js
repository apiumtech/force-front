/**
 * Created by Justin on 2/11/2015.
 */
define([], function () {
    var google = window.google || {};
    google.visualization = google.visualization || {
            DataTable: function () {
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

    function GoogleChartService(googleMap) {
        this.googleMap = googleMap;
    }

    GoogleChartService.newInstance = function (googleChartService) {
        return new GoogleChartService(googleChartService || google.visualization);
    };

    return GoogleChartService;
});