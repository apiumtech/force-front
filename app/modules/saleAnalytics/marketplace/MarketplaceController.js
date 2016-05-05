define([
    'app',
    'modules/saleAnalytics/marketplace/MarketplaceView'
], function (app, MarketplaceView) {
    'use strict';

    function MarketplaceController($scope, $rootScope) {
        if($rootScope.i18nextLanguageReady === true){
            MarketplaceController.configureView($scope);
        } else {
            $rootScope.$on('i18nextLanguageChange', function(){
                setTimeout(function(){
                    MarketplaceController.configureView($scope);
                }, 1000);
            });
        }
    }

    MarketplaceController.configureView = function ($scope) {
        this.view = MarketplaceView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('MarketplaceController', ['$scope', '$rootScope', MarketplaceController]);

    return MarketplaceController;
});
