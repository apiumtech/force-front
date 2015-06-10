/**
 * Created by kevin on 10/27/14.
 */
define([
    'app',
    'q', 'jquery', 'underscore', 'config'
], function (app, Q, $, _, Configuration) {

    function AjaxService(ajaxImpl) {
        this.ajaxImpl = ajaxImpl || $.ajax;
    }

    AjaxService.prototype.ensureSuccess = function (result) {
        if (result.success !== true) {
            throw new Error(result.error || JSON.stringify(result) + ".success is not true");
        }

        return result;
    };

    AjaxService.prototype.mapRequest = function (params) {
        var request = _.clone(params);

        if (typeof request.data != "string") {
            request.data = JSON.stringify(request.data);
        }

        return request;
    };

    AjaxService.prototype.rawAjaxRequest = function (params) {
        var requestParams = this.mapRequest(params);

        if (Configuration.corsEnabled) {
            params.crossDomain = true;
            params.jsonp = false;
        }

        return Q(this.ajaxImpl(requestParams));
    };

    AjaxService.prototype.ajax = function (params) {
        return this.rawAjaxRequest(params).then(this.ensureSuccess);
    };

    AjaxService.newInstance = function (ajaxImpl) {
        return new AjaxService(ajaxImpl || $.ajax);
    };

    app.di.register('ajaxService').as(AjaxService);

    return AjaxService;
});