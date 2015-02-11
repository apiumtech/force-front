/**
 * Created by Justin on 2/11/2015.
 */
app.registerService(function (container) {

    var google = window.google || {};
    google.maps = google.maps || {
        MapTypeId: {ROADMAP: ""},
        Map: function () {
            return {
                setCenter: function () {
                },
                fitBounds: function () {
                }
            }
        },
        LatLngBounds: function () {
            return {
                getCenter: function () {
                },
                extend: function () {
                }
            }
        },
        LatLng: function () {
        },
        visualization: {
            HeatmapLayer: function () {
                return {
                    setMap: function () {
                    }
                }
            }
        },
        MVCArray: function () {
        },
        OverlayView: function () {
            return {
                setMap: function () {
                }
            }
        },
        Marker: function () {
            return {
                setMap: function () {
                }
            }
        },
        Point: function () {
        },
        Size: function () {
        },
        MarkerImage: function () {
        }
    };

    return {
        newInstance: function () {
            return Some(google.maps);
        }
    }
});