/**
 * Created by justin on 02/11/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetView'
], function(app, MapChartWidgetView){

    function DistributionGeographicalWidgetController($scope, $element) {
        DistributionGeographicalWidgetController.configureView($scope, $element);
    }

    DistributionGeographicalWidgetController.configureView = function ($scope, $element) {
        this.view = MapChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('DistributionGeographicalWidgetController', ['$scope', '$element', DistributionGeographicalWidgetController]);

    return DistributionGeographicalWidgetController;
});