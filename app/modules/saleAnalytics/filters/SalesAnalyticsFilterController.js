/**
 * Created by justin on 2/3/15.
 */

define([
    'app',
    'modules/saleAnalytics/filters/SalesAnalyticsFilterView',

    'modules/saleAnalytics/directives/TreeListDirective'
], function (app, SalesAnalyticsFilterView) {
    'use strict';

    function SalesAnalyticsFilterController($scope, $filter, $compile) {
        SalesAnalyticsFilterController.configureView($scope, $filter, $compile);
    }

    SalesAnalyticsFilterController.configureView = function ($scope, $filter, $compile) {
        $scope.$compile = $compile;
        this.view = SalesAnalyticsFilterView.newInstance($scope, $filter);
        this.view.show();
    };

    app.register.controller('SalesAnalyticsFilterController', ['$scope', '$filter', '$compile', SalesAnalyticsFilterController]);

    return SalesAnalyticsFilterController;
});
