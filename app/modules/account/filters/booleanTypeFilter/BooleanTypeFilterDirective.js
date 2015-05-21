/**
 * Created by justin on 4/2/15.
 */
define([
    'app',
    'modules/account/filters/booleanTypeFilter/BooleanTypeFilterController'
], function (app, BooleanTypeFilterController) {

    function BooleanTypeFilterDirective() {
        return {
            restrict: "EA",
            scope: {
                filterFor: "=",
                onClose: "&"
            },
            controller: BooleanTypeFilterController,
            templateUrl: '/app/modules/account/filters/booleanTypeFilter/booleanTypeFilter.html'
        };
    }

    app.register.directive('booleanTypeFilter', [BooleanTypeFilterDirective]);

    return BooleanTypeFilterDirective;
});