/**
 * Created by justin on 5/9/15.
 */
app.registerDirective(function (container) {
    var DistributionHourLineWidgetController = container.getController("controllers/widgets/DistributionHourLineWidgetController");

    function DistributionHourLineWidgetDirective() {
        return {
            restrict: "EAC",
            controller: DistributionHourLineWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'templates/widgets/singleline.html'
        };
    }

    return DistributionHourLineWidgetDirective;
});