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
            dev_token = "VNLSEIRUNSVLDNVHMCLSKD.JCMLSKJCRNXLKJSCRNXLSKJC.NXSKJDCRMNXKSJCDMNXC";
            dev_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJkOGEwODJhMy1lMmU5LTQ1ZmYtOGY1OS05MTk1NDY1ZWVlOTgiLCJpYXQiOiIiLCJleHAiOiIiLCJxc2giOiIiLCJ1c2VyQ29kZSI6IjEwOSIsImltcGxlbWVudGF0aW9uQ29kZSI6IjgwMDQiLCJsYW5ndWFnZSI6IkVOIiwibG9jYXRlIjoiZW4tR0IifQ.OeMUobP6Vk_zrWcV077Ft2IMfidmnZJLulqeRLrFwTI";

            // token xavier
            //dev_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiI5NTM1OTM3Mi02MzljLTRiYWMtYjBjMi0xYWI1NGQ1NzEzMWEiLCJpYXQiOiIiLCJleHAiOiIiLCJxc2giOiIiLCJ1c2VyQ29kZSI6IjIiLCJpbXBsZW1lbnRhdGlvbkNvZGUiOiI2MDAzIiwibGFuZ3VhZ2UiOiJFTiIsImxvY2F0ZSI6ImVuLVVTIn0.wI40ZiJTAzhFKFwTVLjVpV7q8hNfNdtxebeO_KrRwHA";
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