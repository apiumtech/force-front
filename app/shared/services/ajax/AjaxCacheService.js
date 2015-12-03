define([
], function () {
    'use strict';

    var cache = {};

    var paramsToKey = function(params){
        return Crypto.MD5(JSON.stringify({
            url: params.url,
            type: params.type.toLocaleLowerCase(),
            data: params.data,
            headers: params.headers
        }));
    };

    function AjaxCacheService() {
    }

    AjaxCacheService.getByParams = function (params) {
        var key = paramsToKey(params);
        return cache[key];
    };

    AjaxCacheService.putByParams = function (params, value) {
        var key = paramsToKey(params);
        cache[key] = JSON.parse(JSON.stringify(value));
    };

    return AjaxCacheService;
});