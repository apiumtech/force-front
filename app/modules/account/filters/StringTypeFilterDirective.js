/**
 * Created by justin on 4/2/15.
 */
app.registerDirective(function (container) {
    var StringTypeFilterController = container.getController("controllers/filters/StringTypeFilterController");

    function StringTypeFilterDirective() {
        return {
            restrict: "EA",
            scope: {
                filterFor: "=",
                onClose: "&"
            },
            controller: StringTypeFilterController,
            templateUrl: '/templates/filters/stringTypeFilter.html'
        };
    }

    return StringTypeFilterDirective;
});