define([
    'app',
    'modules/saleAnalytics/reports/ReportView',
    'shared/services/config/PermissionsService',

    'modules/saleAnalytics/reports/allReport/AllReportController',
    'modules/saleAnalytics/reports/favouriteReport/FavouriteReportController',
    'modules/saleAnalytics/reports/searchReport/SearchReportController',
    'modules/saleAnalytics/reports/reportFilter/ReportFilterController',

    'modules/saleAnalytics/reports/reportItem/ReportItemDirective'
], function (app, ReportView, PermissionsService) {
    'use strict';

    function ReportController($scope, $rootScope) {
        var removei18nextLanguageChangeListener;
        var permissionsService = PermissionsService.newInstance();
        var isReportsVisible = permissionsService.getPermission("reports_sfm.isEnabled", true);
        if(!isReportsVisible) {
            location.href = "#/analytics/intensity";
        } else {
            if($rootScope.i18nextLanguageReady === true){
                ReportController.configureView($scope);
            } else {
              if(removei18nextLanguageChangeListener){removei18nextLanguageChangeListener();}
                removei18nextLanguageChangeListener = $rootScope.$on('i18nextLanguageChange', function(){
                    setTimeout(function(){
                        ReportController.configureView($scope);
                    }, 1000);
                    removei18nextLanguageChangeListener();
                });
            }
        }
    }

    ReportController.configureView = function ($scope) {
        this.view = ReportView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('ReportController', ['$scope', '$rootScope', ReportController]);

    return ReportController;
});
