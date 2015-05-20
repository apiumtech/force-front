/**
 * Created by justin on 3/20/15.
 */
define([
    '$',
    'angular',
    'config',

    'app',
    'routeConf',
    'validationConfig'
], function ($, angular, config) {
    'use strict';
    $(document).ready(function () {
        angular.bootstrap(document, [config.appName]);
    });
});