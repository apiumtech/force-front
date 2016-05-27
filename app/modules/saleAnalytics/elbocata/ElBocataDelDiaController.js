define([
    'app',
    'modules/saleAnalytics/elbocata/ElBocataDelDiaView'
], function (app, ElBocataDelDiaView) {
    'use strict';

    function ElBocataDelDiaController($scope, $rootScope) {
        if($rootScope.i18nextLanguageReady === true){
            ElBocataDelDiaController.configureView($scope);
        } else {
            $rootScope.$on('i18nextLanguageChange', function(){
                setTimeout(function(){
                    ElBocataDelDiaController.configureView($scope);
                }, 1000);
            });
        }
    }

    ElBocataDelDiaController.configureView = function ($scope) {
        this.view = ElBocataDelDiaView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('ElBocataDelDiaController', ['$scope', '$rootScope', ElBocataDelDiaController]);

    return ElBocataDelDiaController;
});
