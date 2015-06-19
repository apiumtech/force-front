define([
    'shared/services/ajax/BaseListQueryBuilder'
], function(BaseListQueryBuilder) {
    'use strict';


    function CustomLiteralsQueryBuilder(){
        BaseListQueryBuilder.call(this);
    }

    CustomLiteralsQueryBuilder.inherits(BaseListQueryBuilder);
    var proto = CustomLiteralsQueryBuilder.prototype;

    proto.initializeQueryDefaults = function(){
        this.__base__.initializeQueryDefaults.call(this);
        this.implementationCode = null;
    };

    proto.resetPageHeuristicsBuilder = function(currentQuery) {
        var conditions = this.__base__.resetPageHeuristicsBuilder.call(this, currentQuery);
        conditions.push( currentQuery.filter.implementationCode != this.lastQuery.filter.implementationCode );
        return conditions;
    };

    proto.createCurrentQuery = function() {
        var currentQuery = this.__base__.createCurrentQuery.call(this);
        currentQuery.filter.implementationCode = this.implementationCode;
        return currentQuery;
    };

    proto.setImplementationCode = function(implementationCode) {
        this.implementationCode = implementationCode;
    };


    CustomLiteralsQueryBuilder.newInstance = function() {
        return new CustomLiteralsQueryBuilder();
    };

    return CustomLiteralsQueryBuilder;
});