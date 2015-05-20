/**
 * Created by justin on 4/2/15.
 */
define([
    'app',
    'modules/account/filters/DatetimeFilter/DatetimeTypeFilterController'
], function (app, DatetimeTypeFilterController) {

    function DatetimeTypeFilterDirective() {
        return {
            restrict: "EA",
            scope: {
                filterFor: "=",
                onClose: "&"
            },
            controller: DatetimeTypeFilterController,
            templateUrl: '/templates/filters/datetimeTypeFilter.html'
        };
    }

    app.register.directive('DatetimeTypeFilterDirective', DatetimeTypeFilterDirective);

    return DatetimeTypeFilterDirective;
});