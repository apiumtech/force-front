define([
], function () {
  "use strict";

    return {
        register: function ($routeProvider, resolveRoute) {
            var modulePath = 'modules/saleAnalytics/';

            $routeProvider

                .when('/analytics/conversion', resolveRoute(modulePath + 'conversion/ConversionController', modulePath + 'conversion/index'))

                .when('/analytics/distribution', resolveRoute(modulePath + 'distribution/DistributionController', modulePath + 'distribution/index'))

                .when('/analytics/intensity', resolveRoute(modulePath + 'intensity/IntensityController', modulePath + 'intensity/index'))

                .when('/analytics/reports', resolveRoute(modulePath + 'reports/ReportController', modulePath + 'reports/index'))

                .when('/analytics/marketplace', resolveRoute(modulePath + 'marketplace/MarketplaceController', modulePath + 'marketplace/index'))
            ;
        }
    };
});
