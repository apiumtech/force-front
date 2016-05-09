define([
    'app',
    'modules/saleAnalytics/conversion/ConversionView'

], function (app, ConversionView) {
    'use strict';

    function ConversionController($scope, $rootScope) {
      var removei18nextLanguageChangeListener;
        if($rootScope.i18nextLanguageReady === true){
            ConversionController.configureView($scope);
        } else {
          if(removei18nextLanguageChangeListener){removei18nextLanguageChangeListener();}
            removei18nextLanguageChangeListener = $rootScope.$on('i18nextLanguageChange', function(){
                setTimeout(function(){
                    ConversionController.configureView($scope);
                }, 1000);
                removei18nextLanguageChangeListener();
            });
        }
    }

    ConversionController.configureView = function ($scope) {
        this.view = ConversionView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('ConversionController', ['$scope', '$rootScope', ConversionController]);

    return ConversionController;
});
