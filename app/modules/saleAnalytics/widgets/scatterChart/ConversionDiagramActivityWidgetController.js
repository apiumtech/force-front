/**
 * Created by justin on 12/22/14.
 */
define([
    'modules/saleAnalytics/widgets/scatterChart/ConversionDiagramActivityWidgetView'
], function (ConversionDiagramActivityWidgetView) {

    function ConversionDiagramActivityWidgetController($scope, $element) {
        ConversionDiagramActivityWidgetController.configureView($scope, $element);
    }

    ConversionDiagramActivityWidgetController.configureView = function ($scope, $element) {
        this.view = ConversionDiagramActivityWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return ConversionDiagramActivityWidgetController;
});