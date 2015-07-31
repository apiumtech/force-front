define([
    'shared/services/ajax/AuthAjaxService',
    'config',
    'q'
], function (AuthAjaxService, Configuration, Q) {
    'use strict';

    function CustomWidgetModel(ajaxService) {
        this.authAjaxService = ajaxService;
    }

    CustomWidgetModel.prototype.customDataAccess = function(storedName, storedParams) {
        var params = {
            url: Configuration.api.customDataAccess.format(storedName, storedParams),
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.authAjaxService.rawAjaxRequest(params);
    };

    CustomWidgetModel.prototype.reloadWidget = function() {
        var deferred = Q.defer();

        /*var params = {
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
        );*/

        setTimeout(function(){
            deferred.resolve("nada");
        }, 100);

        return deferred.promise;
    };

    CustomWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        return new CustomWidgetModel(ajaxService);
    };

    return {newInstance: CustomWidgetModel.newInstance};
});