/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/mapChart/DistributionGeographicalWidgetController'
], function(app, GeographicalWidgetController){

    function DistributionGeographicalWidgetDirective() {
        return {
            restrict: "EAC",
            controller: GeographicalWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/mapChart/distributionGeographicalWidget.html'
        };
    }

    app.register.directive('distributionGeographicalWidget', [DistributionGeographicalWidgetDirective]);

    return DistributionGeographicalWidgetDirective;
});