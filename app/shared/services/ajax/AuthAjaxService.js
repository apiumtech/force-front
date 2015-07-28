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
        if(window.location.hostname == "127.0.0.1") {
            dev_token = "VNLSEIRUNSVLDNVHMCLSKD.JCMLSKJCRNXLKJSCRNXLSKJC.NXSKJDCRMNXKSJCDMNXC";
        }

        token = token || dev_token;
        token = "VNLSEIRUNSVLDNVHMCLSKD.JCMLSKJCRNXLKJSCRNXLSKJC.NXSKJDCRMNXKSJCDMNXC";
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