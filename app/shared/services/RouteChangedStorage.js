/**
 * Created by justin on 5/1/15.
 */
define([
    'app'
], function (app) {
    'use strict';

    function RouteChangedStorage($locationService) {
        this.$locationService = $locationService;
        this.currentRoute = null;
        this.previousRoute = null;
    }

    RouteChangedStorage.prototype.getCurrentRoute = function () {
        return this.currentRoute;
    };

    RouteChangedStorage.prototype.getPreviousRoute = function () {
        return this.previousRoute;
    };

    RouteChangedStorage.prototype.routeChangeStarting = function () {
        this.previousRoute = this.currentRoute;
    };

    RouteChangedStorage.prototype.routeChangedSuccess = function () {
        this.currentRoute = this.$locationService.path();
    };

    RouteChangedStorage.__instance = null;

    RouteChangedStorage.getInstance = function () {
        if (!RouteChangedStorage.__instance)
            RouteChangedStorage.__instance = new RouteChangedStorage();

        return RouteChangedStorage.__instance;
    };

    app.di.register('routeChangedStorage').as(RouteChangedStorage).asSingleton();

    return RouteChangedStorage;
});