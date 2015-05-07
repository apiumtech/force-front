/**
 * Created by justin on 4/2/15.
 */
app.registerDirective(function (container) {
    //var BooleanTypeFilterController = container.getController("controllers/filters/BooleanTypeFilterController");
    var $ = container.getFunction("jquery"); // recheck to see if this is $ or jquery
    function TriStateCheckBoxDirective() {
        return {
            restrict: "EA",
            //require: ['ngModel'], // we wil lcome back with this later, this is the correct approach
            scope: {
              ngModel: '='
            },
            link: function ($scope, $element, $attr) {
                var checkbox = $($element)[0];

                /**
                 * Update state when click the element
                 */
                $scope.updateState = function () {
                    var ngModel=$scope.ngModel;
                    if (ngModel === false) {
                        ngModel = true;
                    } else if (ngModel === true) {
                        ngModel = null;
                    } else {
                        ngModel = false;
                    }
                };

                /**
                 * Verify the state when scope values changed
                 */
                $scope.verifyCheckState = function () {
                    debugger;
                    var ngModel = $scope.ngModel;
                    switch (ngModel) {
                        case 'true':
                            checkbox.prop('indeterminate', false);
                            checkbox.prop('checked', true);
                            break;
                        case 'false':
                            checkbox.prop('indeterminate', false);
                            checkbox.prop('checked', false);
                            break;
                        default:
                            checkbox.prop('indeterminate', true);
                            break;
                    }
                };

                $($element).on('click', $scope.updateState);

                $scope.$watch('ngModel', $scope.verifyCheckState);

                $scope.$on('$destroy', function () {
                    $(element).unbind('click', $scope.updateState);
                });

                $scope.verifyCheckState();
            }
        };
    }

    return TriStateCheckBoxDirective;
});