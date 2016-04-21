/**
 * Created by justin on 3/13/15.
 */

define([
    'app',
    'modules/widgets/WidgetWrapperController',
    'shared/components/sortableComponent/ng-sortable'
], function (app, WidgetWrapperController) {
    'use strict';

    function WidgetWrapperDirective($rootScope) {
        return {
            restrict: "EA",
            controller: WidgetWrapperController,
            scope: {
                wtitle: "@",
                wtooltip: "@",
                bodyClass: "@",
                eventBusChannel: "=",
                foreverScroll: "&",
                widgetId: "="
            },
            transclude: true,
            templateUrl: "app/modules/widgets/widgetWrapper.html?v="+ $rootScope.cacheBuster
        };
    }

    app.register.directive('widgetWrapper', ['$rootScope', WidgetWrapperDirective]);

    return WidgetWrapperDirective;
});
