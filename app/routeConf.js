/**
 * Created by justin on 3/20/15.
 */
define([
    'app',
    'shared/services/RouteChangedEventHandlers',

    // route configurations
    'modules/login/route',
    'modules/saleAnalytics/routes',
    'modules/account/route'
], function (app, RouteChangedEventHandlers) {
    'use strict';

    var routeConfigurations = [];

    for (var i in arguments) {
        if (i > 1) {
            routeConfigurations.push(arguments[i]);
        }
    } // delete the first 2 dependencies from the injection

    app.config([
        '$routeProvider',
        'routeResolverSvcProvider',
        function ($routeProvider, routeResolverSvcProvider) {
            //Define routes - controllers will be loaded dynamically
            var route = routeResolverSvcProvider.route;

            for (var i in routeConfigurations) {
                var routeRegister = routeConfigurations[i];
                routeRegister.register($routeProvider, route.resolve);
            }

            $routeProvider
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]);

    app.run(['$rootScope', '$route', '$location', function ($rootScope, $route, $location) {
        var routeChangedEventHandlers = new RouteChangedEventHandlers($location, $rootScope);
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            routeChangedEventHandlers.handleEvent(event, next, current);
        });
    }]);
});