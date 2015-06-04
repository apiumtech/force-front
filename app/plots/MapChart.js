/**
 * Created by Justin on 2/11/2015.
 */

define([
    'jquery',
    'shared/services/GoogleMapService'
], function ($, GoogleMapService) {

    var defaultImageUrl = "https://fmassets.s3-eu-west-1.amazonaws.com/pro/2122/img/default.png";

    function MapChart(mapService) {
        var self = this;
        this.mapService = mapService;
        self.map = null;
        self.heatMap = null;
        self.markerClusterer = null;
        self.markers = [];
    }

    MapChart.prototype.createMap = function (mapCanvasId, mapOptions) {
        var canvas = mapCanvasId;
        if (canvas instanceof String)
            canvas = document.getElementById(mapCanvasId);

        this.map = this.mapService.createMap(canvas, mapOptions || {
                center: this.mapService.getLatLng(41.23, 2.11),
                zoom: 7
            });
    };

    MapChart.prototype.decorateHeatMapData = function (data) {
        var maxActivityRecord = _.max(data, function (record) {

            return record.Activity;
        });

        var maxActivity = maxActivityRecord.Activity;

        var result = [];

        data.forEach(function (record) {
            if (record.Latitude != null && record.Latitude != undefined && record.Latitude != "0" &&
                record.Longitude != null && record.Longitude != undefined && record.Longitude != "0") {

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
            if (Math.abs(c.Latitude) > 180 || Math.abs(c.Longitude) > 90)
                return;

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

    MapChart.prototype.createPointMap = function (data) {
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
    };

    MapChart.prototype.createUserMap = function (data) {
        var self = this;

        if (self.markerClusterer) {
            self.markerClusterer.clearMarkers();
        }

        var latlngbounds = self.mapService.getLatLngBounds();

        self.markers = data.map(function (r) {
            var image = r.ImageB64;
            if (!image)
                image = defaultImageUrl;

            var coordinate = self.mapService.getLatLng(parseFloat(r.Latitude), parseFloat(r.Longitude));
            latlngbounds.extend(coordinate);

            var iconMarker = self.mapService.createMarker({
                position: coordinate,
                icon: self.mapService.getMarkerIcon(image),
                flat: true
            });

            return iconMarker;
        });

        self.markerCluster = new MarkerClusterer(self.map, self.markers, {
            maxZoom: 15,
            gridSize: 50
        });
        self.map.setCenter(latlngbounds.getCenter());
        self.map.fitBounds(latlngbounds);
    };

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