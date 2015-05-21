define([
    'app',
    'modules/saleAnalytics/distribution/DistributionView',

    'modules/saleAnalytics/widgets/barChart/BarChartWidgetDirective',
    'modules/saleAnalytics/widgets/mapChart/DistributionGeographicalWidgetDirective',
    'modules/saleAnalytics/widgets/pieChart/distributionHourPieWidget/DistributionHourPieWidgetDirective',
    'modules/saleAnalytics/widgets/pieChart/distributionSegmentPieWidget/DistributionSegmentPieWidgetDirective',
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetDirective'
], function (app, DistributionView) {
    'use strict';

    function DistributionController($scope) {
        DistributionController.configureView($scope);
    }

    DistributionController.configureView = function ($scope) {
        this.view = DistributionView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('DistributionController', ['$scope', DistributionController]);

    return DistributionController;
});
