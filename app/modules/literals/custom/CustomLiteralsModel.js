define([
    'config',
    'modules/literals/custom/CustomLiteralsService',
    'modules/literals/custom/CustomLiteralsQueryBuilder'
], function(config, CustomLiteralsService, CustomLiteralsQueryBuilder) {
    'use strict';



    function CustomLiteralsModel(service, queryBuilder) {
        this.service = service;
        this.queryBuilder = queryBuilder;
    }

    var proto = CustomLiteralsModel.prototype;

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


    CustomLiteralsModel.newInstance = function(service, queryBuilder) {
        service = service || CustomLiteralsService.newInstance();
        queryBuilder = queryBuilder || CustomLiteralsQueryBuilder.newInstance();

        return new CustomLiteralsModel(service, queryBuilder);
    };

    return CustomLiteralsModel;
});