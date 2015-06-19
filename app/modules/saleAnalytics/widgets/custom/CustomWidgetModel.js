define([
    'shared/services/ajax/AuthAjaxService',
    'config',
    'q'
], function (AuthAjaxService, Configuration, Q) {
    'use strict';

    function CustomWidgetModel(ajaxService) {
        this.ajaxService = ajaxService;
    }

    CustomWidgetModel.prototype.reloadWidget = function() {
        var deferred = Q.defer();

        setTimeout(function(){
            deferred.resolve("<div style='background-color: #ff0084'><h1>HOLA!!</h1></div>");
        }, 1000);

        return deferred.promise;
    };

    CustomWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        return new CustomWidgetModel(ajaxService);
    };

    return CustomWidgetModel;
});