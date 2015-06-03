/**
 * Created by apium on 5/29/15.
 */
define([
    'app'
], function (app) {
    'use strict';

    app.config([
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
            // register the providers to support asynchronously loading controllers & directives
            app.register.controller = $controllerProvider.register;
            app.register.directive = $compileProvider.directive;
            app.register.filter = $filterProvider.register;
            app.register.factory = $provide.factory;
            app.register.service = $provide.service;
        }
    ]);
});