/**
 * Created by Justin on 2/11/2015.
 */
define([], function () {
    'use strict';

    var google = window.google || {};
    google.maps = google.maps || {
            MapTypeId: {ROADMAP: ""},
            event: {
                addListener: function () {
                },
                addDomListener: function () {
                },
            },
            Map: function () {
                return {
                    setCenter: function () {
                    },
                    fitBounds: function () {
                    }
                };
            },
            LatLngBounds: function () {
                return {
                    getCenter: function () {
                    },
                    extend: function () {
                    }
                };
            },
            LatLng: function () {
            },
            visualization: {
                HeatmapLayer: function () {
                    return {
                        setMap: function () {
                        }
                    };
                }
            },
            MVCArray: function () {
            },
            OverlayView: function () {
                return {
                    setMap: function () {
                    }
                };
            },
            Marker: function () {
                return {
                    setMap: function () {
                    }
                };
            },
            Point: function () {
            },
            InfoWindow: function () {
            },
            Size: function () {
            },
            MarkerImage: function () {
            }
        };

    function GoogleMapService(googleMap) {
        this.googleMap = googleMap;
    }

    GoogleMapService.prototype.createMap = function (element, options) {
        return new this.googleMap.Map(element, options);
    };

    GoogleMapService.prototype.getZoom = function () {
        return new this.googleMap.getZoom();
    };

    GoogleMapService.prototype.getCenter = function () {
        return new this.googleMap.getCenter();
    };

    GoogleMapService.prototype.getLatLng = function (latitude, longitude) {
        return new this.googleMap.LatLng(latitude, longitude);
    };

    GoogleMapService.prototype.createHeatMap = function (option) {
        return new this.googleMap.visualization.HeatmapLayer(option);
    };

    GoogleMapService.prototype.getLatLngBounds = function () {
        return new this.googleMap.LatLngBounds();
    };

    GoogleMapService.prototype.createMarker = function (options) {
        return new this.googleMap.Marker(options);
    };

    GoogleMapService.prototype.createInfoWindow = function (contentString) {
        return new this.googleMap.InfoWindow({
            content: contentString
        });
    };

    GoogleMapService.prototype.bindClickEvent = function (target, callback) {
        this.googleMap.event.addListener(target, 'click', callback);
    };

    GoogleMapService.prototype.getMarkerIcon = function (imgUrl, imgWidth, imgHeight) {
        imgWidth = imgWidth || 32;
        imgHeight = imgHeight || 32;
        return {
            scaledSize: new this.googleMap.Size(imgWidth, imgHeight),
            url: imgUrl
        };
    };

    GoogleMapService.newInstance = function (googleMapService) {
        return new GoogleMapService(googleMapService || google.maps);
    };

    return GoogleMapService;
});