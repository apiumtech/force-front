/**
 * Created by justin on 12/22/14.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/pieChart/distributionHourPieWidget/DistributionHourPieChartWidgetView'
], function (app, DistributionHourPieChartWidgetView) {

    function DistributionHourPieWidgetController($scope, $element) {
        DistributionHourPieWidgetController.configureView($scope, $element);
    }

    DistributionHourPieWidgetController.configureView = function ($scope, $element) {
        this.view = DistributionHourPieChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('DistributionHourPieWidgetController', ['$scope', '$element', DistributionHourPieWidgetController]);

    return DistributionHourPieWidgetController;
});