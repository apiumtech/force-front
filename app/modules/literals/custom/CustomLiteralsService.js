define([
    'config'
    ,'shared/services/ajax/AuthAjaxService'
    ,'shared/services/StorageService'
    ,'modules/literals/shared/LiteralsSharedService'
    ,'q'
    ,'underscore'
    ,'shared/services/ajax/CQRSUnwrapper'
    ,'shared/services/ajax/FakeAjaxService'
], function(config, AuthAjaxService, StorageService, LiteralsSharedService, Q, _, CQRSUnwrapper, FakeAjaxService) {
    'use strict';

    function CustomLiteralsService(ajaxService, storageService, literalsSharedService, cqrsUnwrapper) {
        this.ajaxService = ajaxService;
        this.storageService = storageService;
        this.literalsSharedService = literalsSharedService;
        this.fakeAjaxService = FakeAjaxService.newInstance();
        this.cqrsUnwrapper = cqrsUnwrapper;
    }

    var proto = CustomLiteralsService.prototype;


    proto.getLanguageList = function() {
        return this.literalsSharedService.getLanguageList();
    };


    proto.getLiteralsList = function(searchParams) {
        return this.cqrsUnwrapper.unwrap(
            this.ajaxService.rawAjaxRequest({
                url: config.api.customLiteralList,
                headers: searchParams,
                type: 'GET',
                dataType: 'json'
            })
        );
    };


    proto.deleteLiteral = function (id) {
        assertNotNull("id", id);
        var body = {
            "id": id
        };
        return this.cqrsUnwrapper.unwrap(
            this.ajaxService.rawAjaxRequest({
                url: config.api.deleteCustomLiteral,
                data: body,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            })
        );
    };


    CustomLiteralsService.newInstance = function (ajaxService, storageService, literalsSharedService, cqrsUnwrapper) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        storageService = storageService || StorageService.newInstance();
        literalsSharedService = literalsSharedService || LiteralsSharedService.newInstance();
        cqrsUnwrapper = cqrsUnwrapper || CQRSUnwrapper.newInstance();
        return new CustomLiteralsService(ajaxService, storageService, literalsSharedService, cqrsUnwrapper);
    };

    return CustomLiteralsService;
});