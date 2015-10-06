define([
    'config',
    'shared/services/ajax/AuthAjaxService',
    'shared/services/StorageService',
    'q',
    'shared/services/ajax/CQRSUnwrapper',
    'shared/services/ajax/FakeAjaxService'
], function(config, AuthAjaxService, StorageService, Q, CQRSUnwrapper, FakeAjaxService) {
    'use strict';


    // TODO: refactor all methods and add them to BaseLiteralsService, remove this class enterely

    function LiteralsSharedService(ajaxService, storageService) {
        this.authAjaxService = ajaxService;
        this.storageService = storageService;
        this.fakeAjaxService = FakeAjaxService.newInstance();
    }

    var proto = LiteralsSharedService.prototype;


    proto.getLanguageList = function () {
        return CQRSUnwrapper.unwrap(
            this.authAjaxService.rawAjaxRequest({
                url: config.api.literals.languageList,
                type: 'GET',
                dataType: 'json'
            })
        );
    };


    proto.getLiteralTypeList = function () {
        return this.authAjaxService.rawAjaxRequest({
                url: config.api.literals.literalTypeList,
                type: 'GET',
                dataType: 'json'
            });

    };


    proto.getPlatformList = function () {
        var deferred = Q.defer();
        return this.authAjaxService.rawAjaxRequest({
                url: config.api.literals.platformList,
                type: 'GET',
                dataType: 'json'
            });
    };

    proto.getImplementationList = function () {
        return CQRSUnwrapper.unwrap(
            this.authAjaxService.rawAjaxRequest({
                url: config.api.literals.implementationList,
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