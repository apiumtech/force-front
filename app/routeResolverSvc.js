/**
 * Created by justin on 3/20/15.
 */
define([
    'angular',
    'require'
], function (angular, require) {
    'use strict';

    angular.module('routeResolver', []).provider('routeResolverSvc', function () {
        var self = this;
        self.$get = function () {
            return self;
        };

        self.routeConfig = function () {
            var viewsDirectory = 'app/',
                controllersDirectory = '',

                setBaseDirectories = function (viewsDir, controllersDir) {
                    viewsDirectory = viewsDir;
                    controllersDirectory = controllersDir;
                },

                getViewsDirectory = function () {
                    return viewsDirectory;
                },

                getControllersDirectory = function () {
                    return controllersDirectory;
                };

            return {
                setBaseDirectories: setBaseDirectories,
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory
            };
        }();

        self.route = function (routeConfig) {

            var resolve = function (controllerName, viewName) {
                    var routeDef = {};
                    routeDef.templateUrl = routeConfig.getViewsDirectory() + viewName + '.html';
                    if (controllerName === undefined || controllerName === null) {
                        routeDef.controller = viewName.substr(viewName.lastIndexOf('/') + 1);
                    } else {
                        routeDef.controller = controllerName.substr(controllerName.lastIndexOf('/') + 1);
                    }

                    routeDef.resolve = {
                        load: [
                            '$q', '$rootScope',
                            function ($q, $rootScope) {
                                var dependencies = [routeConfig.getControllersDirectory() + controllerName];
                                return resolveDependencies($q, $rootScope, dependencies);
                            }
                        ]
                    };

                    return routeDef;
                },

                resolveDependencies = function ($q, $rootScope, dependencies) {
                    var defer = $q.defer();
                    require(dependencies, function () {
                        defer.resolve();
                        $rootScope.$apply();
                    });

                    return defer.promise;
                };

            return {
                resolve: resolve
            };
        }(self.routeConfig);
    });
});