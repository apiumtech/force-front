/**
 * Created by kevin on 10/28/14.
 */
define([
    'shared/services/ajax/AjaxService',
    'shared/services/StorageService',
    'config',
    'jquery'
], function (AjaxService, StorageService, Configuration, $) {

    function AuthAjaxService(ajaxImpl, storageService) {
        AjaxService.call(this, ajaxImpl || $.ajax);
        this.storageService = storageService || new StorageService();
    }

    AuthAjaxService.inherits(AjaxService, {});

    /**
     * TODO: [deprecated], remove for all used
     * @param params
     */
    AuthAjaxService.prototype.mapRequest = function (params) {
        var request = AjaxService.prototype.mapRequest.call(this, params);

        var token = this.storageService.retrieve(Configuration.tokenStorageKey, true);

        // TODO: get rid of it ASAP
        var dev_token;
        if(Configuration.isDevMode()) {
            //dev_token = "VNLSEIRUNSVLDNVHMCLSKD.JCMLSKJCRNXLKJSCRNXLSKJC.NXSKJDCRMNXKSJCDMNXC";

            // token xavier
            //dev_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiI4NTBmOTg0OC1mZDNmLTRmNDktOTAxYS1hMzFkOTUxNTY0NWYiLCJpYXQiOiIiLCJleHAiOiIiLCJxc2giOiIiLCJ1c2VyQ29kZSI6IjIiLCJpbXBsZW1lbnRhdGlvbkNvZGUiOiI2MDAzIiwibGFuZ3VhZ2UiOiJFTiIsImxvY2F0ZSI6ImVuLVVTIn0.nQOca2814ffj43-v2ljOe9-VgXGjckOsp4SXhfeG658";
        }

        token = token || dev_token;
        request.headers = request.headers || {};
        request.headers.token = token;
        return request;
    };

    AuthAjaxService.newInstance = function ($ajaxImpl, $storageService) {
        var ajaxImpl = $ajaxImpl || $.ajax;
        var storageService = $storageService || StorageService.newInstance();

        return new AuthAjaxService(ajaxImpl, storageService);
    };

    return AuthAjaxService;
});