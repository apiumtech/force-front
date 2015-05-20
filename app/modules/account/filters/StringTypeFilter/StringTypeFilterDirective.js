/**
 * Created by justin on 4/2/15.
 */
define([
    'app',
    'modules/account/filters/StringTypeFilter/StringTypeFilterController'
], function (app, StringTypeFilterController) {

    function StringTypeFilterDirective() {
        return {
            restrict: "EA",
            scope: {
                filterFor: "=",
                onClose: "&"
            },
            controller: StringTypeFilterController,
            templateUrl: 'app/modules/account/filters/StringTypeFilter/stringTypeFilter.html'
        };
    }

    app.register.directive('stringTypeFilter', [StringTypeFilterDirective]);

    return StringTypeFilterDirective;
});