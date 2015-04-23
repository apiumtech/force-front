/**
 * Created by kevin on 10/28/14.
 */
app.registerService(function (container) {
    var AjaxService = container.getService('services/AjaxService');
    var StorageService = container.getService("services/StorageService");
    var Configuration = container.getService("Configuration");
    var $ = container.getFunction("jquery");

    function AuthAjaxService(ajaxImpl, storageService) {
        AjaxService.call(this, ajaxImpl);
        this.storageService = storageService;
    }

    AuthAjaxService.prototype = Object.create(AjaxService.prototype, {});

    AuthAjaxService.prototype.rawAjaxRequest = function (params) {

        params.headers = params.headers || {};
        params.headers.token = this.storageService.retrieve(Configuration.tokenStorageKey);

        return AjaxService.prototype.rawAjaxRequest.call(this, params);
    };

    AuthAjaxService.newInstance = function ($ajaxImpl, $storageService) {
        var ajaxImpl = $ajaxImpl || $;
        var storageService = $storageService || new StorageService();

        return Some(ajaxImpl, storageService);
    };

    return AuthAjaxService;
});