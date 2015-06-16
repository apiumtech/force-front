define([
], function() {
    'use strict';

    function BaseLiteralsModel(service, queryBuilder) {
        this.service = service;
        this.queryBuilder = queryBuilder;
    }

    var proto = BaseLiteralsModel.prototype;

    proto.setSearchTerms = function(searchTerms) {
        this.queryBuilder.setSearchTerms(searchTerms);
    };

    proto.nextPage = function() {
        this.queryBuilder.nextPage();
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

    return BaseLiteralsModel;
});