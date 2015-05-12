/**
 * Created by kevin on 10/28/14.
 */
app.registerService(function (container) {
    var AjaxService = container.getService('services/AjaxService');
    var StorageService = container.getService("services/StorageService");
    var Configuration = container.getService("Configuration");
    var $ = container.getFunction('jquery');

    function AuthAjaxService(ajaxImpl, storageService) {
        AjaxService.call(this, ajaxImpl);
        this.storageService = storageService;
    }

    AuthAjaxService.prototype = Object.create(AjaxService.prototype, {});

    AuthAjaxService.prototype.mapRequest = function (params) {
        var request = AjaxService.prototype.mapRequest.call(this, params);

        var token = this.storageService.retrieve(Configuration.tokenStorageKey);

        // TODO: get rid of it when proper login is implemented
        var dev_token = "VNLSEIRUNSVLDNVHMCLSKD.JCMLSKJCRNXLKJSCRNXLSKJC.NXSKJDCRMNXKSJCDMNXC";
        
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