define([
	'modules/literals/global/LiteralsService'
], function(LiteralsService) {
	'use strict';

	function LiteralsModel(service) {
        this.service = service;
	}

    LiteralsModel.prototype.onColumnsRequest = function() {
      return this.service.getLanguageList();
    };


	LiteralsModel.newInstance = function(service) {
        service = service || LiteralsService.newInstance();
		return new LiteralsModel(service);
	};

	return LiteralsModel;
});