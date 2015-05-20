/**
 * Created by justin on 3/20/15.
 */
define([
    'jquery',
    'angular',
    'config',

    'app',

    // default controllers
    'core/coreModulesLoader',

    // route loader
    'routeConf',

    // validation config
    'validationConfig'
], function ($, angular, config) {
    'use strict';
    $(document).ready(function () {
        angular.bootstrap(document, [config.appName]);
    });
});