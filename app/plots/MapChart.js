/**
 * Created by Justin on 2/11/2015.
 */

app.registerService(function (container) {
    var GoogleMapService = container.getService("services/GoogleMapService");

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

        this.map = new this.mapService.Map(canvas, mapOptions || {
            center: this.getLatLng(41.23, 2.11),
            zoom: 7,
            mapTypeId: this.mapService.MapTypeId.ROADMAP
        });
    };

    MapChart.prototype.decorateHeatMapData = function (data) {
        var maxActivityRecord = _.max(data, function (record) {
            record.Activity = parseFloat(record.Activity.replace(",", "."));
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

        var latlngbounds = new this.mapService.LatLngBounds();
        var decoratedData = self.decorateHeatMapData(data);
        decoratedData.forEach(function (c) {
            var coord = self.getLatLng.call(self, parseFloat(c.Latitude), parseFloat(c.Longitude)),
                coordWeight = {
                    location: coord,
                    weight: c.Activity
                };
            heatMapData.push(coordWeight);
            latlngbounds.extend(coord);
        });

        self.heatMap = new this.mapService.visualization.HeatmapLayer({
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

            var marker = new self.mapService.Marker({
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

        self.markers = [];
        if (self.markerClusterer) {
            self.markerClusterer.clearMarkers();
        }

        var sizeIcon = new self.mapService.Size(44, 54);
        var sizeIconBG = new self.mapService.Size(44, 54);
        var Anchor = new self.mapService.Point(19, 24);
        var AnchorBG = new self.mapService.Point(22, 27);
        var latlngbounds = new self.mapService.LatLngBounds();
        data.forEach(function (r) {
            var image = r.ImageB64;
            if (image) {
                image = "";
            }
            else
                image = defaultImageUrl;

            var markerIcon = new self.mapService.MarkerImage(image, sizeIcon, null, Anchor, sizeIcon);
            var markerBG = new self.mapService.MarkerImage('https://fmassets.s3-eu-west-1.amazonaws.com/pre/2122/img/gmaps-ico-small.png', sizeIconBG, null, AnchorBG, sizeIconBG);
            var coordinate = self.getLatLng(parseFloat(r.Latitude), parseFloat(r.Longitude));
            latlngbounds.extend(coordinate);

            var iconMarker = new self.mapService.Marker({
                position: coordinate,
                flat: true
            });

            iconMarker.setIcon(markerIcon);
            self.markers.push(iconMarker);
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
        return new this.mapService.LatLng(lat, lng);
    };

    MapChart.newInstance = function (mapService) {
        mapService = mapService || GoogleMapService.newInstance().getOrElse(throwInstantiateException(GoogleMapService));
        return Some(new MapChart(mapService));
    };

    return MapChart;
});