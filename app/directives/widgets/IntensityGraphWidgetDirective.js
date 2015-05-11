/**
 * Created by justin on 5/9/15.
 */
app.registerDirective(function (container) {
    var GraphWidgetController = container.getController("controllers/GraphWidgetController");

    function IntensityGraphWidgetDirective() {
        return {
            restrict: "EAC",
            controller: GraphWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'templates/widgets/graph.html'
        };
    }

    return IntensityGraphWidgetDirective;
});