/**
 * Created by justin on 02/11/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetView'
], function(app, MapChartWidgetView){

    function MapChartWidgetController($scope, $element) {
        MapChartWidgetController.configureView($scope, $element);
    }

    MapChartWidgetController.configureView = function ($scope, $element) {
        this.view = MapChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    //app.register.controller('MapChartWidgetController', ['$scope', '$element', MapChartWidgetController]);

    return MapChartWidgetController;
});