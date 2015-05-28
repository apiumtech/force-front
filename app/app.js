/**
 * Created by justin on 3/20/15.
 */
define([
    'angular',
    'config',
    'jquery',
    'core/i18nextOptions',
    'routeResolverSvc',
    'ng-i18next',
    'shared/components/sortableComponent/ng-sortable',
    'angular-validation',
    'angular-validation-rule'
], function (angular, config, $, i18nextOptions) {
    angular.module('jm.i18next').config(['$i18nextProvider', function ($i18nextProvider) {
        $i18nextProvider.options = i18nextOptions.dev;
    }]);

    var app = angular.module(config.appName, [
        'routeResolver',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap',
        'jm.i18next',
        'forcefront.sortable',
        'angularMoment',
        'angularFileUpload',
        'infinite-scroll',
        'validation',
        'validation.rule',
        'RecursionHelper'
    ]);

    app.register = app;

    app.config([
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };
        }
    ]);

    return app;
});