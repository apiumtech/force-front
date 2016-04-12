/**
 * Created by justin on 3/20/15.
 */
define([
    'jquery',
    'angular',
    'config',

    'app',
    'shared/AppsAdapter',

    // loading controllers & directives asynchronously
    'asyncModuleLoaderConf',

    // default controllers
    'core/coreModulesLoader',

    // route loader
    'routeConf',

], function ($, angular, config, app, AppsAdapter) {
    'use strict';

    $.migrateMute = true;
    $(document).ready(function () {
        angular.bootstrap(document, [config.appName]);
    });
});
