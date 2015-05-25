/**
 * Created by justin on 5/9/15.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetController'
], function(app, PieChartWidgetController){

    function PieChartWidgetDirective() {
        return {
            restrict: "EAC",
            controller: PieChartWidgetController,
            scope: {
                widget: "="
            },
            templateUrl: 'app/modules/saleAnalytics/widgets/pieChart/pieWidget.html'
        };
    }

    app.register.directive('pieChartWidget', [PieChartWidgetDirective]);

    return PieChartWidgetDirective;
});