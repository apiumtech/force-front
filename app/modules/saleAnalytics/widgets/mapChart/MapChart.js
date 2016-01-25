/* global MarkerClusterer */

define([
    'jquery',
    'shared/services/GoogleMapService',
    'shared/services/SimpleTemplateParser',
    'shared/services/StorageService',
    'underscore'
], function ($, GoogleMapService, SimpleTemplateParser, StorageService, _) {
    'use strict';

    var defaultImageUrl = "assets/img/default.png";
    var defaultPointImageUrl = "assets/img/chart.png";

    function MapChart(mapService) {
        var self = this;
        self.mapService = mapService;
        self.templateParser = SimpleTemplateParser.newInstance();
        self.storageService = StorageService.newInstance();
        self.map = null;
        self.heatMap = null;
        self.markerClusterer = null;
        self.markers = [];
    }


    // ------------------------
    //
    //  Create
    //
    // ------------------------

    MapChart.prototype.getSavedMapZoom = function () {
        var zoom = this.storageService.retrieve('mapZoom', true);
        return zoom || 7;
    };

    MapChart.prototype.getSavedMapCenter = function () {
        var center = this.storageService.retrieve('mapCenter', true);
        return center || this.mapService.getLatLng(41.23, 2.11);
    };

    MapChart.prototype.createMap = function (mapCanvasId, mapOptions) {
        var self = this;
        var canvas = mapCanvasId;
        if (canvas instanceof String){
            canvas = document.getElementById(mapCanvasId);
        }

        this.map = this.mapService.createMap(
            canvas,
            mapOptions || {
                center: this.mapService.getLatLng(41.23, 2.11),
                zoom: 7
            }
        );

        /*mapOptions = mapOptions || {};
        mapOptions.minZoom = 2;
        mapOptions.center = self.getSavedMapCenter();
        mapOptions.zoom = self.getSavedMapZoom();

        self.map = self.mapService.createMap(
            canvas,
            mapOptions
        );

        var changeHandler = function() {
            self.storageService.store('mapZoom', self.map.getZoom(), true);
            self.storageService.store('mapCenter', self.map.getCenter(), true);
        };
        self.map.addListener('center_changed', changeHandler);
        self.map.addListener('zoom_changed', changeHandler);*/
    };

    MapChart.prototype.createPointMap = function (data, selectedFilter) {
        var self = this;

        if (self.markerClusterer) {
            self.markerClusterer.clearMarkers();
        }

        var latlngbounds = self.mapService.getLatLngBounds();

        self.markers = data.map(function (r) {
            var image;
            var imgWidth;
            var imgHeight;
            switch (selectedFilter){
                case "checkins":
                    image = "assets/img/icon-map-company-checkin.png";
                    imgWidth = 44/1.5;
                    imgHeight = 54/1.5;
                    break;
                default:
                    image = defaultPointImageUrl;
            }
            var coordinate = self.mapService.getLatLng(parseFloat(r.Latitude), parseFloat(r.Longitude));
            latlngbounds.extend(coordinate);

            var marker = self.mapService.createMarker({
                position: coordinate,
                icon: self.mapService.getMarkerIcon(image, imgWidth, imgHeight),
                flat: true
            });

            /*var infoWindowTemplate = $("#checkinsCalloutTemplate").html();
            var infoWindowContent = self.templateParser.parseTemplate(infoWindowTemplate, r);
            var infowindow = new google.maps.InfoWindow({
                content: infoWindowContent
            });
            marker.addListener('click', function() {
                infowindow.open(self.map, marker);
            });*/

            return marker;
        });

        self.markerCluster = new MarkerClusterer(self.map, self.markers, {
            maxZoom: 10,
            gridSize: 50,
            styles: [
                {
                    textColor: 'white',
                    url: 'assets/img/icon-map-group.png',
                    height: 53,
                    width: 52
                },
                {
                    textColor: 'white',
                    url: 'assets/img/icon-map-group.png',
                    height: 53,
                    width: 52
                },
                {
                    textColor: 'white',
                    url: 'assets/img/icon-map-group.png',
                    height: 53,
                    width: 52
                }
            ]
        });
        self.map.setCenter(latlngbounds.getCenter());
        self.map.fitBounds(latlngbounds);
    };

    /*MapChart.prototype.createPointMap_ = function (data) {
        var self = this;
        this.markers = [];

        data.forEach(function (c) {
            var latLng = self.getLatLng(parseFloat(c.Latitude), parseFloat(c.Longitude));

            var marker = self.mapService.createMarker({
                position: latLng,
                title: ''
            });
            self.markers.push(marker);
        });
        self.markerClusterer = new MarkerClusterer(self.map, self.markers, {
            maxZoom: 15,
            gridSize: 50
        });
    };*/


    MapChart.prototype.createUserMap = function (data) {
        var self = this;

        if (self.markerClusterer) {
            self.markerClusterer.clearMarkers();
        }

        var latlngbounds = self.mapService.getLatLngBounds();

        self.markers = data.map(function (r) {
            var image = r.PhotoUrl;
            if (!image){
                image = defaultImageUrl;
            }

            var coordinate = self.mapService.getLatLng(parseFloat(r.Latitude), parseFloat(r.Longitude));
            latlngbounds.extend(coordinate);

            var marker = self.mapService.createMarker({
                position: coordinate,
                icon: self.mapService.getMarkerIcon(image),
                flat: true
            });

            var infoWindowTemplate = $("#userCalloutTemplate").html();
            var infoWindowContent = self.templateParser.parseTemplate(infoWindowTemplate, r);
            var infowindow = new google.maps.InfoWindow({
                content: infoWindowContent
            });
            marker.addListener('click', function() {
                infowindow.open(self.map, marker);
            });

            return marker;
        });

        self.markerCluster = new MarkerClusterer(self.map, self.markers, {
            maxZoom: 10,
            gridSize: 50,
            styles: [
                {
                    textColor: 'white',
                    url: 'assets/img/icon-map-group.png',
                    height: 53,
                    width: 52
                },
                {
                    textColor: 'white',
                    url: 'assets/img/icon-map-group.png',
                    height: 53,
                    width: 52
                },
                {
                    textColor: 'white',
                    url: 'assets/img/icon-map-group.png',
                    height: 53,
                    width: 52
                }
            ]
        });
        self.map.setCenter(latlngbounds.getCenter());
        self.map.fitBounds(latlngbounds);
    };


    // ------------------------
    //
    //  Clear
    //
    // ------------------------

    MapChart.prototype.clearHeatMap = function () {
        var self = this;
        if (self.heatMap) {
            self.heatMap.setMap(null);
            self.heatMap = null;
        }
    };

    MapChart.prototype.clearPointMap = function () {
        var self = this;

        self.markers = [];
        if (self.markerClusterer) {
            self.markerClusterer.clearMarkers();
        }
    };


    // ------------------------
    //
    //  Heat Map specific
    //
    // ------------------------

    MapChart.prototype.decorateHeatMapData = function (data) {
        var maxActivityRecord = _.max(data, function (record) {

            return record.Activity;
        });

        var maxActivity = maxActivityRecord.Activity;

        var result = [];

        data.forEach(function (record) {
            if (record.Latitude !== null && record.Latitude !== undefined && record.Latitude !== "0" &&
                record.Longitude !== null && record.Longitude !== undefined && record.Longitude !== "0") {

                var CurrentActivity = (record.Activity / maxActivity) * 100000 + 100000;

                var current = {
                    Longitude: record.Longitude,
                    Latitude: record.Latitude,
                    Activity: CurrentActivity
                };
                result.push(current);
            }
        });
        return result;
    };

    MapChart.prototype.applyHeatLayer = function (data) {
        var self = this;
        var heatMapData = [];

        var latlngbounds = self.mapService.getLatLngBounds();
        var decoratedData = self.decorateHeatMapData(data);
        decoratedData.forEach(function (c) {
            if (Math.abs(c.Latitude) > 180 || Math.abs(c.Longitude) > 90){
                return;
            }

            var coord = self.mapService.getLatLng(parseFloat(c.Latitude), parseFloat(c.Longitude)),
                coordWeight = {
                    location: coord,
                    weight: c.Activity
                };
            heatMapData.push(coordWeight);
            latlngbounds.extend(coord);
        });

        self.heatMap = self.mapService.createHeatMap({
            data: heatMapData,
            dissipating: true,
            opacity: 1
        });
        self.heatMap.setMap(self.map);
        self.map.setCenter(latlngbounds.getCenter());
        self.map.fitBounds(latlngbounds);
    };


    // ------------------------
    //
    //  Misc
    //
    // ------------------------

    MapChart.prototype.getLatLng = function (lat, lng) {
        if (Math.abs(lat) > 180 || Math.abs(lng) > 90) {
            return this.mapService.getLatLng(0, 0);
        }
        return this.mapService.getLatLng(lat, lng);
    };

    MapChart.newInstance = function (mapService) {
        mapService = mapService || GoogleMapService.newInstance();
        return new MapChart(mapService);
    };

    return MapChart;
});