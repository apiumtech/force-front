/**
 * Created by justin on 5/1/15.
 */
define([

], function () {
    'use strict';

    var handlers = arguments;

    function RouteChangedEventHandlers($locationService, $rootScope) {
        this.$locationService = $locationService;
        this.$rootScope = $rootScope;
        this.handlers = handlers;
    }

    RouteChangedEventHandlers.prototype.handleEvent = function (event, nextRoute, currentRoute) {
        var self = this;

        if (!self.handlers.length)
            return;

        var context = {
            locationService: self.$locationService,
            $rootScope: self.$rootScope,
            event: event,
            nextRoute: nextRoute,
            currentRoute: currentRoute,
            isProceeded: false
        };

        for (var i in self.handlers) {
            if (context.isProceeded)
                break;
            var handler = self.handlers[i];
            handler.handle(context);
        }
    };

    return RouteChangedEventHandlers;
});