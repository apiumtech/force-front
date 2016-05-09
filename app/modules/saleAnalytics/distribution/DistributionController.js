define([
    'app',
    'modules/saleAnalytics/distribution/DistributionView',

    'modules/saleAnalytics/widgets/barChart/BarChartWidgetDirective',
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetDirective',
    'modules/saleAnalytics/widgets/pieChart/PieWidgetDirective',
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetDirective'
], function (app, DistributionView) {
    'use strict';

    function DistributionController($scope, $rootScope) {
      var removei18nextLanguageChangeListener;
        if($rootScope.i18nextLanguageReady === true){
            DistributionController.configureView($scope);
        } else {
            if(removei18nextLanguageChangeListener){removei18nextLanguageChangeListener();}
            removei18nextLanguageChangeListener = $rootScope.$on('i18nextLanguageChange', function(){
                setTimeout(function(){
                    DistributionController.configureView($scope);
                }, 1000);
                removei18nextLanguageChangeListener();
            });
        }
    }

    DistributionController.configureView = function ($scope) {
        this.view = DistributionView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('DistributionController', ['$scope', '$rootScope', DistributionController]);

    return DistributionController;
});
