define([
    'config',
    'shared/services/ajax/AuthAjaxService',
    'shared/services/StorageService',
    'q',
    'shared/services/ajax/FakeAjaxService'
], function(config, AuthAjaxService, StorageService, Q, FakeAjaxService) {
    'use strict';

    function LiteralsSharedService(ajaxService, storageService) {
        this.ajaxService = ajaxService;
        this.storageService = storageService;
        this.fakeAjaxService = FakeAjaxService.newInstance();
    }

    var proto = LiteralsSharedService.prototype;


    proto.getLanguageList = function () {
        console.log("fake getLanguageList");
        return this.ajaxService.rawAjaxRequest({
            url: "../mocks/languageList.json",
            type: 'GET',
            dataType: 'json'
        });

        return this.ajaxService.rawAjaxRequest({
            url: config.api.languageList,
            type: 'GET',
            dataType: 'json'
        });
    };


    proto.getLiteralTypeList = function () {
        return this.ajaxService.rawAjaxRequest({
            url: config.api.literalTypeList,
            type: 'GET',
            dataType: 'json'
        });
    };


    proto.getDeviceTypeList = function () {
        console.log("fake getDeviceTypeList");
        return this.ajaxService.rawAjaxRequest({
            url: "../mocks/deviceTypeList.json",
            type: 'GET',
            dataType: 'json'
        });

        return this.ajaxService.rawAjaxRequest({
            url: config.api.deviceTypeList,
            type: 'GET',
            dataType: 'json'
        });
    };


    LiteralsSharedService.newInstance = function (ajaxService, storageService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        storageService = storageService || StorageService.newInstance();
        return new LiteralsSharedService(ajaxService, storageService);
    };

    return LiteralsSharedService;
});