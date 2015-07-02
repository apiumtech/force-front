define([
    'config',
    'shared/services/ajax/AuthAjaxService',
    'shared/services/StorageService',
    'q',
    'shared/services/ajax/CQRSUnwrapper',
    'shared/services/ajax/FakeAjaxService'
], function(config, AuthAjaxService, StorageService, Q, CQRSUnwrapper, FakeAjaxService) {
    'use strict';

    function LiteralsSharedService(ajaxService, storageService) {
        this.authAjaxService = ajaxService;
        this.storageService = storageService;
        this.fakeAjaxService = FakeAjaxService.newInstance();
    }

    var proto = LiteralsSharedService.prototype;


    proto.getLanguageList = function () {
        return CQRSUnwrapper.unwrap(
            this.authAjaxService.rawAjaxRequest({
                url: config.api.languageList,
                type: 'GET',
                dataType: 'json'
            })
        );
    };


    proto.getLiteralTypeList = function () {
        return this.authAjaxService.rawAjaxRequest({
                url: config.api.literalTypeList,
                type: 'GET',
                dataType: 'json'
            });

    };


    proto.getDeviceTypeList = function () {
        return this.authAjaxService.rawAjaxRequest({
                url: config.api.deviceTypeList,
                type: 'GET',
                dataType: 'json'
            });

    };

    proto.getImplementationList = function () {
        return CQRSUnwrapper.unwrap(
            this.authAjaxService.rawAjaxRequest({
                url: config.api.implementationList,
                type: 'GET',
                dataType: 'json'
            })
        );
    };


    LiteralsSharedService.newInstance = function (ajaxService, storageService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        storageService = storageService || StorageService.newInstance();
        return new LiteralsSharedService(ajaxService, storageService);
    };

    return LiteralsSharedService;
});