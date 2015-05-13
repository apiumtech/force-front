/**
 * Created by justin on 5/1/15.
 */
define([
    'app',
    '$',
    'slimScroll',
    'sideBar/NavGroupDirective',
    'sideBar/NavItemDirective'
], function (app, $) {
    'use strict';

    app.register.directive('navigation', function () {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            controller: ['$scope', function ($scope) {

            }],
            link: function (scope, element, attrs) {
                //if (!topmenu) {
                //    if (!null) {
                //        element.first().jarvismenu({
                //            accordion: true,
                //            speed: $.menu_speed,
                //            closedSign: '<em class="fa fa-plus-square-o"></em>',
                //            openedSign: '<em class="fa fa-minus-square-o"></em>'
                //        });
                //    } else {
                //        alert("Error - menu anchor does not exist");
                //    }
                //}

                // SLIMSCROLL FOR NAV
                if ($.fn.slimScroll) {
                    $(element).slimScroll({
                        height: '100%'
                    });
                }

                scope.getElement = function () {
                    return element;
                }
            },
            template: '<nav><ul data-ng-transclude=""></ul></nav>'
        };
    });
});