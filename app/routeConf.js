/**
 * Created by justin on 3/20/15.
 */
define([
    'app',
    'shared/services/RouteChangedEventHandlers',
    'shared/services/RouteChangedStorage',
    'jquery',
    // route configurations
    'modules/login/routes'
    , 'modules/saleAnalytics/routes'
    , 'modules/account/routes'
    , 'modules/agenda/routes'
    , 'modules/literals/routes'
    // ==more---routes---config---here==
], function (app, RouteChangedEventHandlers, RouteChangedStorage, $) {
    'use strict';

    var routeConfigurations = [];

    for (var i in arguments) {
        if (i > 3) {
            routeConfigurations.push(arguments[i]);
        }
    } // delete the first 4 dependencies from the injection

    app.config([
        '$routeProvider',
        'routeResolverSvcProvider',
        function ($routeProvider, routeResolverSvcProvider) {
            var route = routeResolverSvcProvider.route;

            for (var i in routeConfigurations) {
                var routeRegister = routeConfigurations[i];
                routeRegister.register($routeProvider, route.resolve);
            }

            $routeProvider
                .otherwise({
                    redirectTo: '/analytics/intensity'
                });
        }
    ]);

    app.run(['$rootScope', '$route', '$location', function ($rootScope, $route, $location) {
        var routeChangedEventHandlers = RouteChangedEventHandlers._diResolve();
        var routeChangedStorage = RouteChangedStorage._diResolve();

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            routeChangedEventHandlers.handleEvent(event, next, current);
            routeChangedStorage.routeChangeStarting();
        });

        $rootScope.$on('$routeChangeSuccess', function (event, current, previousRoute) {
            routeChangedStorage.routeChangedSuccess();

            $('html, body').animate({
                scrollTop: $("body").offset().top
            }, 500);
        });
    }]);
});