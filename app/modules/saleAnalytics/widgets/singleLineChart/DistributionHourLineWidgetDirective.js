/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetController'
], function(app, DistributionHourLineWidgetController){

    function DistributionHourLineWidgetDirective($rootScope) {
        return {
            restrict: "EAC",
            controller: DistributionHourLineWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/singleLineChart/distributionHourLineWidget.html?v='+ $rootScope.cacheBuster
        };
    }

    app.register.directive('distributionHourLineWidget', ['$rootScope', DistributionHourLineWidgetDirective]);

    return DistributionHourLineWidgetDirective;
});