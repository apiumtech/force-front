/**
 * Created by justin on 2/3/15.
 */

define([
    'app',
    'modules/saleAnalytics/filters/SalesAnalyticsFilterView',
    'moment',

    'modules/saleAnalytics/directives/TreeListDirective'
], function (app, SalesAnalyticsFilterView, moment) {
    'use strict';

    function SalesAnalyticsFilterController($scope, $rootScope) {
        if($rootScope.i18nextLanguageReady === true){
            SalesAnalyticsFilterController.configureView($scope, $rootScope);
        } else {
            $scope.datePicker = {
                date: {
                    minDate: moment('2010-01-01'),
                    maxDate: moment()
                },
                opts: {}
            };
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
