/**
 * Created by Justin on 2/11/2015.
 */

app.registerService(function (container) {
    var GoogleMapService = container.getService("services/GoogleMapService");

    function MapChart(mapService) {
        this.mapService = mapService;
        this.map = null;
    }

    MapChart.prototype.createMap = function (mapCanvasId, mapOptions) {
        var canvas = mapCanvasId;
        if (canvas instanceof String)
            canvas = document.getElementById(mapCanvasId);

        return new this.mapService.Map(canvas, mapOptions || {
            center: this.getLatLng(41.23, 2.11),
            zoom: 7,
            mapTypeId: this.mapService.MapTypeId.ROADMAP
        });
    };

    MapChart.prototype.createHeatMap = function (data, targetMap) {
        var heatmapData = [];

        var latlngbounds = new this.mapService.LatLngBounds();
        data.forEach(function (c) {
            var coord = new this.getLatLng(parseFloat(c.Latitude), parseFloat(c.Longitude)),
                coordWeight = {
                    location: coord,
                    weight: c.Activity
                };
            heatmapData.push(coordWeight);
            latlngbounds.extend(coord);
        });

        var heatMap = new this.mapService.visualization.HeatmapLayer({
            data: heatmapData,
            dissipating: true,
            opacity: 1
        });
        heatMap.setMap(targetMap);
        targetMap.setCenter(latlngbounds.getCenter());
        targetMap.fitBounds(latlngbounds);
    };

    MapChart.prototype.createPointMap = function (data, targetMap) {

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