/**
 * Created by justin on 12/22/14.
 */
define([], function(){
    var HourLineChartWidgetView = container.getView("views/widgets/SingleLineChartWidgetView");

    function DistributionHourLineWidgetController($scope, $element) {
        DistributionHourLineWidgetController.configureView($scope, $element);
    }

    DistributionHourLineWidgetController.configureView = function ($scope, $element) {
        this.view = HourLineChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return DistributionHourLineWidgetController;
});