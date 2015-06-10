/**
 * Created by justin on 3/20/15.
 */
define([
    'angular',
    'config',
    'jquery',
    'core/i18nextOptions',
    'di',
    'routeResolverSvc',
    'ng-i18next',
    'shared/components/sortableComponent/ng-sortable',
    'angular-validation',
    'angular-validation-rule',
    'angular_touch'
], function (angular, config, $, i18nextOptions, di) {
    di.autowired();

    angular.module('jm.i18next').config(['$i18nextProvider', function ($i18nextProvider) {
        $i18nextProvider.options = i18nextOptions.dev;
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
        'angularFileUpload',
        'infinite-scroll',
        'validation',
        'validation.rule',
        'RecursionHelper'
    ]);

    app.register = {};

    app.register.controller = app.controller;
    app.register.directive = app.directive;
    app.register.filter = app.filter;
    app.register.factory = app.factory;
    app.register.service = app.service;
    app.di = di;

    return app;
});