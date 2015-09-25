/**
 * Created by kevin on 10/27/14.
 */
define([
    'q', 'jquery', 'underscore', 'config',

    'shared/services/StorageService'
], function (Q, $, _, Configuration, StorageService) {

    function AjaxService(ajaxImpl, storageService) {
        this.ajaxImpl = ajaxImpl || $.ajax;
        this.storageService = storageService || StorageService._diResolve();
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

        if (Configuration.useAuthRequest) {
            var token = this.storageService.retrieve(Configuration.tokenStorageKey, true);

            // TODO: get rid of it ASAP
            var dev_token;
            if(Configuration.isDevMode()) {
                //dev_token = "VNLSEIRUNSVLDNVHMCLSKD.JCMLSKJCRNXLKJSCRNXLSKJC.NXSKJDCRMNXKSJCDMNXC";

                // token xavier
                dev_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiI4NTBmOTg0OC1mZDNmLTRmNDktOTAxYS1hMzFkOTUxNTY0NWYiLCJpYXQiOiIiLCJleHAiOiIiLCJxc2giOiIiLCJ1c2VyQ29kZSI6IjIiLCJpbXBsZW1lbnRhdGlvbkNvZGUiOiI2MDAzIiwibGFuZ3VhZ2UiOiJFTiIsImxvY2F0ZSI6ImVuLVVTIn0.nQOca2814ffj43-v2ljOe9-VgXGjckOsp4SXhfeG658";
            }

            token = token || dev_token;
            request.headers = request.headers || {};
            request.headers.token = token;
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

    return AjaxService;
});