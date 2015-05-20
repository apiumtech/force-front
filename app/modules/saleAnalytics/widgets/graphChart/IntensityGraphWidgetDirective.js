/**
 * Created by justin on 5/9/15.
 */
app.registerDirective(function (container) {
    var GraphWidgetController = container.getController("controllers/widgets/IntensityGraphWidgetController");

    function IntensityGraphWidgetDirective() {
        return {
            restrict: "EAC",
            controller: GraphWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'templates/widgets/intensityGraphWidget.html'
        };
    }

    return IntensityGraphWidgetDirective;
});