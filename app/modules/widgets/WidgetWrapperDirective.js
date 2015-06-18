/**
 * Created by justin on 3/13/15.
 */

define([
    'app',
    'modules/widgets/WidgetWrapperController'
], function (app, WidgetWrapperController) {
    'use strict';

    function WidgetWrapperDirective() {
        return {
            restrict: "EA",
            controller: WidgetWrapperController,
            scope: {
                title: "@",
                bodyClass: "@",
                eventBusChannel: "=",
                foreverScroll: "&",
                widgetId: "="
            },
            transclude: true,
            templateUrl: "app/modules/widgets/widgetWrapper.html"
        };
    }

    app.register.directive('widgetWrapper', [WidgetWrapperDirective]);

    return WidgetWrapperDirective;
});