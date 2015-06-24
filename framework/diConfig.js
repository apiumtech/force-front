/**
 * Created by Justin on 6/24/2015.
 */
define([
    'di4js'
], function (di) {
    'use strict';
    var appDependencyInjection = di.create();
    appDependencyInjection.autowired(true);

    return appDependencyInjection;
});