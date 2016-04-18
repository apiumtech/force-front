/* global MarkerClusterer, google */

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
        return zoom;// || 7;
    };

    MapChart.prototype.getSavedMapCenter = function () {
        var center = this.storageService.retrieve('mapCenter', true);
        return center;// || this.mapService.getLatLng(41.23, 2.11);
    };

    MapChart.prototype.createMap = function (mapCanvasId, mapOptions) {
        var self = this;
        var canvas = mapCanvasId;
        if (canvas instanceof String){
            canvas = document.getElementById(mapCanvasId);
        }

        /*this.map = this.mapService.createMap(
            canvas,
            mapOptions || {
                center: this.mapService.getLatLng(41.23, 2.11),
                zoom: 7
            }
        );*/

        // Saved center, zoom
        mapOptions = mapOptions || {};
        mapOptions.minZoom = 2;
        mapOptions.center = self.getSavedMapCenter();
        mapOptions.zoom = self.getSavedMapZoom();
        mapOptions.scrollwheel = false;

        self.map = self.mapService.createMap(
            canvas,
            mapOptions
        );

        var changeHandler = function() {
            self.storageService.store('mapZoom', self.map.getZoom(), true);
            self.storageService.store('mapCenter', self.map.getCenter(), true);
        };
        self.map.addListener('center_changed', changeHandler);
        self.map.addListener('zoom_changed', changeHandler);
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

        if( !self.getSavedMapCenter() ){
            self.map.setCenter(latlngbounds.getCenter());
            self.map.fitBounds(latlngbounds);
        }
    };

    MapChart.prototype.createUserMap = function (data) {
        var self = this;

        if (self.markerClusterer) {
            self.markerClusterer.clearMarkers();
        }

        var latlngbounds = self.mapService.getLatLngBounds();

        var infowindow = null;
        var cssImgRules = '';
        self.markers = data.map(function (r) {
            var image = r.PhotoUrl;
            if (!image){
                image = defaultImageUrl;
            } else {
              cssImgRules += '.gm-style img[src="'+ image +'"]{ border-radius:16px!important; }';
            }

            var coordinate = self.mapService.getLatLng(parseFloat(r.Latitude), parseFloat(r.Longitude));
            latlngbounds.extend(coordinate);

            var marker = self.mapService.createMarker({
                position: coordinate,
                icon: self.mapService.getMarkerIcon(image),
                optimized: false
            });

            //var infoWindowTemplate = $("#userCalloutTemplate").html();
            var infoWindowTemplate = '<div id="userCalloutTemplate" style="width:250px;height:90px;">'+
                '<table style="width:100%;height:100%;">'+
                    '<tr>'+
                        '<td rowspan="2" style="width:70px;vertical-align:middle;text-align:center;">'+
                            '<img src="{PhotoUrl}" style="width:50px;height:50px;border-radius:25px;" />'+
                        '</td>'+
                        '<td style="width:180px;height:45px;vertical-align:bottom;color:#226EB4;font-size:15px;font-weight:400;">{FullName}</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td style="width:180px;height:45px;vertical-align:top;color:#636363;font-size:13px;">{Description}</td>'+
                    '</tr>'+
                '</table>'+
            '</div>';
            var infoWindowContent = self.templateParser.parseTemplate(infoWindowTemplate, r);


            marker.addListener('click', function() {
                if (infowindow) {
                    infowindow.close();
                }
                infowindow = new google.maps.InfoWindow({
                    content: infoWindowContent
                });
                infowindow.open(self.map, marker);
            });

            return marker;
        });

        // add the image rounding CSS rules in the page.
        $('head').append('<style type="text/css">'+ cssImgRules +'</style>');

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
        if( !self.getSavedMapCenter() ) {
            self.map.setCenter(latlngbounds.getCenter());
            self.map.fitBounds(latlngbounds);
        }
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

    MapChart.prototype.clearSavedZoomAndCenter = function () {
        var self = this;
        self.storageService.remove('mapZoom', true);
        self.storageService.remove('mapCenter', true);
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

                var CurrentActivity = record.Activity / maxActivity;//(record.Activity / maxActivity) * 100000 + 100000;

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
        var maxIntensity = 0;
        decoratedData.forEach(function (c) {
            /*if (Math.abs(c.Latitude) > 180 || Math.abs(c.Longitude) > 91) { // could be 90.45
              window.console.warn( "(Lat:"+ c.Latitude +", Lng"+ c.Longitude +")");
              return;
            }*/
            if (c.Latitude !== null && c.Latitude !== undefined && c.Latitude !== "0" && c.Longitude !== null && c.Longitude !== undefined && c.Longitude !== "0") {
              var coord = self.mapService.getLatLng(parseFloat(c.Latitude), parseFloat(c.Longitude));
              var coordWeight = {
                  location: coord,
                  weight: c.Activity
              };
              maxIntensity = Math.max(maxIntensity, c.Activity);
              heatMapData.push(coordWeight);
              latlngbounds.extend(coord);
            }
        });

        self.heatMap = self.mapService.createHeatMap({
            data: heatMapData,
            opacity: 0.8,
            maxIntensity: maxIntensity
        });
        self.heatMap.setMap(self.map);

        if( !self.getSavedMapCenter() ) {
            self.map.setCenter(latlngbounds.getCenter());
            self.map.fitBounds(latlngbounds);
        }
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
