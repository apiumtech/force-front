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
            templateUrl: 'app/modules/account/filters/DatetimeFilter/datetimeTypeFilter.html'
        };
    }

    app.register.directive('datetimeTypeFilter', [DatetimeTypeFilterDirective]);

    return DatetimeTypeFilterDirective;
});