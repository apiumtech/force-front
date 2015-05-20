/**
 * Created by justin on 4/2/15.
 */
define([
    'app',
    'jquery'
], function (app, $) {
    'use strict';

    function TriStateCheckBoxDirective() {
        return {
            restrict: "A",
            scope: {
                ngModel: '='
            },
            link: function ($scope, $element, $attr) {
                var checkbox = $($element)[0];

                /**
                 * Verify the state when scope values changed
                 */
                $scope.verifyCheckState = function () {
                    var ngModel = $scope.ngModel;
                    switch (ngModel) {
                        case true:
                            $(checkbox).prop('indeterminate', false);
                            $(checkbox).prop('checked', true);
                            break;
                        case false:
                            $(checkbox).prop('indeterminate', false);
                            $(checkbox).prop('checked', false);
                            break;
                        case null:
                            $(checkbox).prop('indeterminate', true);
                            break;
                        default:
                            break;
                    }
                };

                $scope.$watch('ngModel', $scope.verifyCheckState);

                $scope.verifyCheckState();
            }
        };
    }

    app.register.directive('triStateCheckBox', [TriStateCheckBoxDirective]);

    return TriStateCheckBoxDirective;
});