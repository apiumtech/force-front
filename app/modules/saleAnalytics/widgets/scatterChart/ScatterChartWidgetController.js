/**
 * Created by justin on 12/22/14.
 */
define([
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetView'
], function (ScatterChartWidgetView) {

    function ScatterChartWidgetController($scope, $element) {
        ScatterChartWidgetController.configureView($scope, $element);
    }

    ScatterChartWidgetController.configureView = function ($scope, $element) {
        this.view = ScatterChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    return ScatterChartWidgetController;
});