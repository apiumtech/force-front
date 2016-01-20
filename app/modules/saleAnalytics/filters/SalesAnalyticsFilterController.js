/**
 * Created by justin on 2/3/15.
 */

define([
    'app',
    'modules/saleAnalytics/filters/SalesAnalyticsFilterView',

    'modules/saleAnalytics/directives/TreeListDirective'
], function (app, SalesAnalyticsFilterView) {
    'use strict';

    function SalesAnalyticsFilterController($scope, $rootScope) {
        if($rootScope.i18nextLanguageReady === true){
            SalesAnalyticsFilterController.configureView($scope, $rootScope);
        } else {
            $rootScope.$on('i18nextLanguageChange', function(){
                SalesAnalyticsFilterController.configureView($scope, $rootScope);
            });
        }
    }

    SalesAnalyticsFilterController.configureView = function ($scope, $rootScope) {
        this.view = SalesAnalyticsFilterView.newInstance($scope, $rootScope);
        this.view.show();
    };

    app.register.controller('SalesAnalyticsFilterController', ['$scope', '$rootScope', '$filter', '$compile', SalesAnalyticsFilterController]);

    return SalesAnalyticsFilterController;
});
