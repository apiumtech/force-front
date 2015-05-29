define([
    'config',
    'shared/services/ajax/AuthAjaxService',
    'shared/services/StorageService',
    'q',
    'shared/services/ajax/FakeAjaxService'
], function(Configuration, AuthAjaxService, StorageService, Q, FakeAjaxService) {
    'use strict';

    function LiteralsSharedService(ajaxService) {
        this.ajaxService = ajaxService;
        this.fakeAjaxService = FakeAjaxService.newInstance();
    }

    LiteralsSharedService.prototype.getLanguageList = function () {
        /*return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.languageList,
            type: 'GET',
            dataType: 'json'
        });*/
        console.log("Fake getLanguageList");
        return this.fakeAjaxService.rawAjaxRequest({
            result: {data:[
                {Key:"es-es", Value:"es-es"}
                ,{Key:"en-us", Value:"en-us"}
                ,{Key:"ca-es", Value:"ca-es"}
            ]}

        });
    };

    LiteralsSharedService.newInstance = function (ajaxService, storageService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        storageService = storageService || StorageService.newInstance();
        return new LiteralsSharedService(ajaxService, storageService);
    };

    return LiteralsSharedService;
});