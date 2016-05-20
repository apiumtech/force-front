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
            dev_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGb3JjZU1hbmFnZXIiLCJpYXQiOjE0NjM3NDkwMjcsImV4cCI6MTQ5NTI4NTAyNywiYXVkIjoid3d3LmZha2UuY29tIiwic3ViIjoiZmFrZUBmYWtlLmNvbSIsInVzZXJDb2RlIjoiMzA5IiwiaW1wbGVtZW50YXRpb25Db2RlIjoiODAwNCIsImxhbmd1YWdlIjoiRU4iLCJsb2NhdGUiOiJlcy1FUyJ9.SWFa3eDAHB6LVormouf6k3qdIy6asxcLCygkr8CG0sw";
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
