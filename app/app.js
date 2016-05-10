define([
    'angular',
    'config',
    'jquery',
    'core/i18nextOptions',
    'diConfig',
    'moment',
    'routeResolverSvc',
    'ng-i18next',
    'shared/components/sortableComponent/ng-sortable',
    'angular_touch'
], function (angular, config, $, i18nextOptions, diConfig, moment) {
    'use strict';

    window.moment = moment;

    angular.module('jm.i18next').config(['$i18nextProvider', function ($i18nextProvider) {
        $i18nextProvider.options = i18nextOptions.prod;
    }]);

    var app = angular.module(config.appName, [
        'routeResolver',
        'ngSanitize',
        'ngRoute',
        'ngTouch',
        'ui.bootstrap',
        'jm.i18next',
        'forcefront.sortable',
        'angularMoment',
        'infinite-scroll',
        'RecursionHelper',
        'daterangepicker'
    ]);

    app.register = {};

    app.register.controller = app.controller;
    app.register.directive = app.directive;
    app.register.filter = app.filter;
    app.register.factory = app.factory;
    app.register.service = app.service;
    app.di = diConfig;

    app.run([
        '$rootScope', '$location', '$modal',
        function ($rootScope, $location, $modal) {
            $rootScope.cacheBuster = $('body').attr('id');
            diConfig.register('$locationService').instance($location);
            diConfig.register('$rootScope').instance($rootScope);
            diConfig.register("modalService").instance($modal);
        }
    ]);

    app.config(['$compileProvider', function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
    }]);

    return app;
});
