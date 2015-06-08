define([
    'config',
	'modules/literals/global/LiteralsService',
	'modules/literals/global/LiteralsQueryBuilder'
], function(config, LiteralsService, LiteralsQueryBuilder) {
	'use strict';



	function LiteralsModel(service, queryBuilder) {
        this.service = service;
        this.queryBuilder = queryBuilder;
	}

    var proto = LiteralsModel.prototype;

    proto.setSearchTerms = function(searchTerms) {
        this.queryBuilder.setSearchTerms(searchTerms);
    };


    proto.onColumnsRequest = function() {
      return this.service.getLanguageList();
    };

    proto.onLiteralsDeleteRequest = function(literalId) {
      return this.service.deleteLiteral(literalId);
    };

    proto.onLiteralsRequest = function() {
        return this.service.getLiteralsList( this.queryBuilder.toRequestHeaders(this.queryBuilder.build()) );
    };


	LiteralsModel.newInstance = function(service, queryBuilder) {
        service = service || LiteralsService.newInstance();
        queryBuilder = queryBuilder || LiteralsQueryBuilder.newInstance();

		return new LiteralsModel(service, queryBuilder);
	};

	return LiteralsModel;
});