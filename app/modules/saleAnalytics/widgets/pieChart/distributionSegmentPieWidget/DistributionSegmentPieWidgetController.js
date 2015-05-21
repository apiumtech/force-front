/**
 * Created by justin on 12/22/14.
 */
define([
    'app',
    'modules/saleAnalytics/widgets/pieChart/distributionSegmentPieWidget/DistributionSegmentPieChartWidgetView'
], function(app, SegmentPieChartWidgetView){

    function DistributionSegmentPieWidgetController($scope, $element) {
        DistributionSegmentPieWidgetController.configureView($scope, $element);
    }

    DistributionSegmentPieWidgetController.configureView = function ($scope, $element) {
        this.view = SegmentPieChartWidgetView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('DistributionSegmentPieWidgetController', ['$scope', '$element', DistributionSegmentPieWidgetController]);

    return DistributionSegmentPieWidgetController;
});