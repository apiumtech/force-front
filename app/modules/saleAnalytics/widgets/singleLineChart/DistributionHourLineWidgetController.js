/**
 * Created by justin on 12/22/14.
 */
define([
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetView'
], function (HourLineChartWidgetView) {

    function ConversionDiagramActivityWidgetController($scope, $element) {
        ConversionDiagramActivityWidgetController.configureView($scope, $element);
    }

    ConversionDiagramActivityWidgetController.configureView = function ($scope, $element) {
        this.view = HourLineChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return ConversionDiagramActivityWidgetController;
});