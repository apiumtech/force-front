/**
 * Created by justin on 4/2/15.
 */
app.registerDirective(function (container) {
    var BooleanTypeFilterController = container.getController("controllers/filters/BooleanTypeFilterController");

    function BooleanTypeFilterDirective() {
        return {
            restrict: "EA",
            scope: {
                filterFor: "=",
                onClose: "&"
            },
            controller: BooleanTypeFilterController,
            templateUrl: '/templates/filters/booleanTypeFilter.html'
        };
    }

    return BooleanTypeFilterDirective;
});