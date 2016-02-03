define([
    'app',
    'modules/saleAnalytics/widgets/custom/CustomWidgetController',
    'modules/widgets/WidgetWrapperDirective'
], function (app, CustomWidgetController) {
    'use strict';

    function CustomWidgetDirective($rootScope) {
        return {
            restrict: "EAC",
            controller: CustomWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/custom/customWidget.html?v='+ $rootScope.cacheBuster,
            link: function(scope, element, attrs){
                if(window.initCustomWidgetHandler) {
                    window.initCustomWidgetHandler();
                }
                scope.$on('$destroy', function(){
                   if(window.destroyCustomWidgetHandler) {
                       window.destroyCustomWidgetHandler();
                   }
                });
            }
        };
    }

    app.register.directive('customWidget', ['$rootScope', CustomWidgetDirective]);

    return CustomWidgetDirective;
});