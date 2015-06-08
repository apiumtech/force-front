/**
 * Created by justin on 3/20/15.
 */
define([
    'jquery',
    'angular',
    'config',

    'app',

    // loading controllers & directives asynchronously
    'asyncModuleLoaderConf',

    // default controllers
    'core/coreModulesLoader',

    // route loader
    'routeConf',

    // validation config
    'validationConfig'
], function ($, angular, config, app) {
    'use strict';
    $.migrateMute = true;
    $(document).ready(function () {
        angular.bootstrap(document, [config.appName]);
    });
});