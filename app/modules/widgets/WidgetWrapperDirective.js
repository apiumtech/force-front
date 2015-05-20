/**
 * Created by justin on 3/13/15.
 */

define([
    'modules/widgets/WidgetWrapperController'
], function (WidgetWrapperController) {
    'use strict';

    function WidgetWrapperDirective() {
        return {
            restrict: "EA",
            controller: WidgetWrapperController,
            scope: {
                title: "@",
                bodyClass: "@",
                eventBusChannel: "=",
                foreverScroll: "&"
            },
            transclude: true,
            templateUrl: "app/modules/widgets/widgetWrapper.html"
        };
    }

    return WidgetWrapperDirective;
});