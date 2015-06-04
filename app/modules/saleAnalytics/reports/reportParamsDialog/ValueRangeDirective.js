/**
 * Created by apium on 6/4/15.
 */
define([
    'app',
    'jquery',
    'jquery_ui'
], function (app, $) {
    'use strict';

    function ValueRangeDirective() {
        var linkElement = function (scope, $element, $attr) {
            if (!scope.model) scope.model = {};
            if (!scope.model.from) scope.model.from = scope.min;
            if (!scope.model.to) scope.model.to = scope.max;

            $($element).slider({
                range: true,
                min: scope.min,
                max: scope.max,
                values: [scope.model.from, scope.model.to],
                slide: function (event, ui) {
                    scope.model.from = ui.values[0];
                    scope.model.to = ui.values[1];
                    scope.$apply();
                }
            });
        };

        return {
            restrict: "EA",
            scope: {
                minValue: "&minValue",
                maxValue: "&maxValue",
                model: '=ngModel',
                min: "=min",
                max: "=max"
            },
            link: linkElement
        };
    }

    app.register.directive('valueRange', [ValueRangeDirective]);

    return ValueRangeDirective;
});