define([
    'config',
    'shared/services/ajax/AuthAjaxService',
    'shared/services/StorageService',
    'modules/literals/shared/LiteralsSharedService',
    'q'
], function(Configuration, AuthAjaxService, StorageService, LiteralsSharedService, Q) {
	'use strict';

	function LiteralsService(ajaxService, storageService, literalsSharedService) {
        this.ajaxService = ajaxService;
        this.storageService = storageService;
        this.literalsSharedService = literalsSharedService;
	}

    LiteralsService.prototype.getLanguageList = function() {
        return this.literalsSharedService.getLanguageList();
    };


    LiteralsService.newInstance = function (ajaxService, storageService, literalsSharedService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        storageService = storageService || StorageService.newInstance();
        literalsSharedService = literalsSharedService || LiteralsSharedService.newInstance();
        return new LiteralsService(ajaxService, storageService, literalsSharedService);
    };

	return LiteralsService;
});