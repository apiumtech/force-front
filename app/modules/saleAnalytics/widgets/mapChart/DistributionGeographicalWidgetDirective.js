/**
 * Created by justin on 5/9/15.
 */
app.registerDirective(function (container) {
    var GeographicalWidgetController = container.getController("controllers/widgets/DistributionGeographicalWidgetController");

    function DistributionGeographicalWidgetDirective() {
        return {
            restrict: "EAC",
            controller: GeographicalWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'templates/widgets/distributionGeographicalWidget.html'
        };
    }

    return DistributionGeographicalWidgetDirective;
});