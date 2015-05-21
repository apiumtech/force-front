/**
 * Created by justin on 5/9/15.
 */
define([], function(){
    var BarChartWidgetController = container.getController("controllers/widgets/BarChartWidgetController");

    function BarChartWidgetDirective() {
        return {
            restrict: "EAC",
            controller: BarChartWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'templates/widgets/bar.html'
        };
    }

    return BarChartWidgetDirective;
});