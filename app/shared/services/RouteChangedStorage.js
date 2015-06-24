/**
 * Created by justin on 5/1/15.
 */
define([], function () {
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

    RouteChangedStorage.diConfig = {
        singleton: true
    };

    return RouteChangedStorage;
});