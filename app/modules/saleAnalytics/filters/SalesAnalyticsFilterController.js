/**
 * Created by justin on 2/3/15.
 */

define([
    'app',
    'modules/saleAnalytics/filters/SalesAnalyticsFilterView',

    'modules/saleAnalytics/directives/TreeListDirective'
], function (app, SalesAnalyticsFilterView) {
    'use strict';

    function SalesAnalyticsFilterController($scope) {
        SalesAnalyticsFilterController.configureView($scope);
    }

    SalesAnalyticsFilterController.configureView = function ($scope) {
        this.view = SalesAnalyticsFilterView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('SalesAnalyticsFilterController', ['$scope', '$filter', '$compile', SalesAnalyticsFilterController]);

    return SalesAnalyticsFilterController;
});
