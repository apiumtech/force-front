define([
    'shared/services/ajax/AuthAjaxService',
    'config',
    'q'
], function (AuthAjaxService, Configuration, Q) {
    'use strict';

    function CustomWidgetModel(ajaxService) {
        this.authAjaxService = ajaxService;
    }

    CustomWidgetModel.prototype.reloadWidget = function() {
        var deferred = Q.defer();

        /*
         var deferred = Q.defer();
        setTimeout(function(){
            deferred.resolve("<div><h1>{{'LeftMenu.Intensity' | i18next}}</h1></div>");
        }, 1000);
        return deferred.promise;
        */

        var params = {
            url: Configuration.api.getCustomWidget,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            accept: 'application/json'
        };

        this.authAjaxService.rawAjaxRequest(params).then(
            function(res){
                var data = res.data;
                deferred.resolve(res.data);
            },
            function (err) {
                deferred.reject(err);
            }
        );

        return deferred.promise;
    };

    CustomWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        return new CustomWidgetModel(ajaxService);
    };

    return {newInstance: CustomWidgetModel.newInstance};
});