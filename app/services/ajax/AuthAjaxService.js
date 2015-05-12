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

        request.headers = request.headers || {};
        request.headers.token = this.storageService.retrieve(Configuration.tokenStorageKey);
        return request;
    };

    AuthAjaxService.newInstance = function ($ajaxImpl, $storageService) {
        var ajaxImpl = $ajaxImpl || $.ajax;
        var storageService = $storageService || StorageService.newInstance();

        return new AuthAjaxService(ajaxImpl, storageService);
    };

    return AuthAjaxService;
});