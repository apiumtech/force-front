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
                IntensityController.configureView($scope);
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
