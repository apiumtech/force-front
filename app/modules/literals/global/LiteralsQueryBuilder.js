define([
    'shared/services/ajax/BaseListQueryBuilder'
], function(BaseListQueryBuilder) {
    'use strict';


    function LiteralsQueryBuilder(){
        BaseListQueryBuilder.call( this );
    }

    LiteralsQueryBuilder.inherits( BaseListQueryBuilder );
    var proto = LiteralsQueryBuilder.prototype;

    proto.initializeQueryDefaults = function(){
        this.__base__.initializeQueryDefaults.call(this);
        this.literalTypeId = "";
        this.platformIds = [];
    };

    proto.resetPageHeuristicsBuilder = function(currentQuery) {
        var conditions = this.__base__.resetPageHeuristicsBuilder.call(this, currentQuery);
        conditions.push( currentQuery.filter.literalTypeId != this.lastQuery.filter.literalTypeId ||
            !_.isEqual(currentQuery.filter.platformIds, this.lastQuery.filter.platformIds) );
        return conditions;
    };

    proto.createCurrentQuery = function() {
        var currentQuery = this.__base__.createCurrentQuery.call(this);
        currentQuery.filter.literalTypeId = this.literalTypeId;
        currentQuery.filter.platformIds = this.platformIds;
        return currentQuery;
    };

    proto.setLiteralTypeId = function(literalTypeId) {
        this.literalTypeId = literalTypeId;
    };


    LiteralsQueryBuilder.newInstance = function() {
        return new LiteralsQueryBuilder();
    };

    return LiteralsQueryBuilder;
});