/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetController'
], function(app, MapChartWidgetController){

    function MapChartWidgetDirective() {
        return {
            restrict: "EAC",
            controller: MapChartWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/mapChart/map.html'
        };
    }

    app.register.directive('mapChartWidget', [MapChartWidgetDirective]);

    return MapChartWidgetDirective;
});