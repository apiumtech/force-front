/**
 * Created by justin on 5/20/15.
 */


define([], function () {
    return {
        register: function ($routeProvider, resolveRoute) {
            var modulePath = 'modules/saleAnalytics/';

            $routeProvider

                .when('/analytics/conversion', resolveRoute(modulePath + 'conversion/ConversionController', modulePath + 'conversion/index'))

                .when('/analytics/distribution', resolveRoute(modulePath + 'distribution/DistributionController', modulePath + 'distribution/index'))

                .when('/analytics/intensity', resolveRoute(modulePath + 'intensity/IntensityController', modulePath + 'intensity/index'))

            ;
        }
    };
});