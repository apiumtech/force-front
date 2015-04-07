/**
 * Created by justin on 4/2/15.
 */
app.registerDirective(function (container) {
    var DatetimeTypeFilterController = container.getController("controllers/filters/DatetimeTypeFilterController");

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

    return DatetimeTypeFilterDirective;
});