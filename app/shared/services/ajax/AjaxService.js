/**
 * Created by kevin on 10/27/14.
 */
define([
    'q', 'jquery', 'underscore', 'config',

    'shared/services/StorageService'
], function (Q, $, _, Configuration, StorageService) {
    'use strict';

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

        if (typeof request.data !== "string") {
            request.data = JSON.stringify(request.data);
        }

        if (Configuration.useAuthRequest) {
            var token = this.storageService.retrieve(Configuration.tokenStorageKey, true);

            // TODO: get rid of it ASAP
            var dev_token;
            if(Configuration.isDevMode()) {
                dev_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGb3JjZU1hbmFnZXIiLCJpYXQiOjE0NjM3NDkwMjcsImV4cCI6MTQ5NTI4NTAyNywiYXVkIjoid3d3LmZha2UuY29tIiwic3ViIjoiZmFrZUBmYWtlLmNvbSIsInVzZXJDb2RlIjoiMzA5IiwiaW1wbGVtZW50YXRpb25Db2RlIjoiODAwNCIsImxhbmd1YWdlIjoiRU4iLCJsb2NhdGUiOiJlcy1FUyJ9.SWFa3eDAHB6LVormouf6k3qdIy6asxcLCygkr8CG0sw";
            }

            token = token || dev_token;
            token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiIwYzZkY2E4OS01NDllLTQzYjMtODAxNy1kNjAzN2JlZGYzYjAiLCJpYXQiOiIiLCJleHAiOiIiLCJxc2giOiIiLCJ1c2VyQ29kZSI6IjExNyIsImltcGxlbWVudGF0aW9uQ29kZSI6IjYwMDMiLCJsYW5ndWFnZSI6ImVzIiwibG9jYXRlIjoiZXMtRVMiLCJpbXBlcnNvbmF0ZWQiOiJGYWxzZSJ9.7IGEJdAl3N680WTWF16bJEV7EVpPpVo0ADw1yCv6uQE";
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
