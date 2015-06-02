define([
	'modules/literals/global/LiteralsService'
], function(LiteralsService) {
	'use strict';

	function LiteralsModel(service) {
        this.service = service;
        this.searchObject = {
            searchTerms:"",
            skip:0,
            limit:100
        };
	}

    LiteralsModel.prototype.onColumnsRequest = function() {
      return this.service.getLanguageList();
    };

    LiteralsModel.prototype.onLiteralsRequest = function() {
        return this.service.getLiteralsList({
            searchTerms: this.searchObject.searchTerms,
            skip: this.searchObject.skip,
            limit: this.searchObject.limit
        });
    };


	LiteralsModel.newInstance = function(service) {
        service = service || LiteralsService.newInstance();
		return new LiteralsModel(service);
	};

	return LiteralsModel;
});