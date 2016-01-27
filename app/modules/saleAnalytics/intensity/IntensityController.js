/**
 * Created by justin on 12/17/14.
 */
define([
    'app',
    'modules/saleAnalytics/intensity/IntensityView',

    'modules/saleAnalytics/widgets/graphChart/GraphChartWidgetDirective'
], function (app, IntensityView) {
    'use strict';

    function IntensityController($scope, $rootScope) {
        if($rootScope.i18nextLanguageReady === true){
            IntensityController.configureView($scope);
        } else {
            $rootScope.$on('i18nextLanguageChange', function(){
                setTimeout(function(){
                    IntensityController.configureView($scope);
                }, 250);
            });
        }
    }

    IntensityController.configureView = function ($scope) {
        this.view = IntensityView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('IntensityController', ['$scope', '$rootScope', IntensityController]);

    return IntensityController;
});
