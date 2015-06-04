define([
    'config'
    ,'shared/services/ajax/AuthAjaxService'
    ,'shared/services/StorageService'
    ,'modules/literals/shared/LiteralsSharedService'
    ,'q'
    ,'shared/services/ajax/FakeAjaxService'
], function(Configuration, AuthAjaxService, StorageService, LiteralsSharedService, Q, FakeAjaxService) {
	'use strict';

	function LiteralsService(ajaxService, storageService, literalsSharedService) {
        this.ajaxService = ajaxService;
        this.storageService = storageService;
        this.literalsSharedService = literalsSharedService;
        this.fakeAjaxService = FakeAjaxService.newInstance();
	}

    LiteralsService.prototype.getLanguageList = function() {
        return this.literalsSharedService.getLanguageList();
    };

    LiteralsService.prototype.getLiteralsList = function(searchParams) {
        var searchTerm = searchParams.searchTerms;
        var skip = searchParams.skip;
        var limit = searchParams.limit;
        var body = "search=" + encodeURIComponent(searchTerm) +
            "&skip=" + skip +
            "&limit=" + limit;

        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.literalListBySearch,
            data: body,
            type: 'GET',
            dataType: 'json'
        });
    };


    LiteralsService.newInstance = function (ajaxService, storageService, literalsSharedService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        storageService = storageService || StorageService.newInstance();
        literalsSharedService = literalsSharedService || LiteralsSharedService.newInstance();
        return new LiteralsService(ajaxService, storageService, literalsSharedService);
    };

	return LiteralsService;
});