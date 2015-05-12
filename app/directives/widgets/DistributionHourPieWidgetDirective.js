/**
 * Created by justin on 5/9/15.
 */
app.registerDirective(function (container) {
    var HourPieWidgetController = container.getController("controllers/widgets/DistributionHourPieWidgetController");

    function DistributionHourPieWidgetDirective() {
        return {
            restrict: "EAC",
            controller: HourPieWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'templates/widgets/distributionPieWidget.html'
        };
    }

    return DistributionHourPieWidgetDirective;
});