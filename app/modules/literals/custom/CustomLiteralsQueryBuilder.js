define([
    'config',
    'underscore'
], function(config, _) {
    'use strict';

    var TAG_TOTAL_COUNT = "totalCount";
    var SORT_DESC = -1;
    var SORT_ASC = 1;
    var SORT_DEFAULT = SORT_DESC;

    function CustomLiteralsQueryBuilder(){
        this.lastQuery = null;
        this.initializeQueryDefaults();
    }

    var proto = CustomLiteralsQueryBuilder.prototype;

    proto.initializeQueryDefaults = function(){
        this.skip = 0;
        this.limit = config.pageSize;
        this.searchTerms = "";
        this.implementationCode = null;
        this.sort = {};
        this.tags = [ TAG_TOTAL_COUNT ];
    };

    proto.setSearchTerms = function( searchTerms ) {
        this.searchTerms = searchTerms;
    };

    proto.resetPageHeuristics = function(currentQuery) {
        if(!this.lastQuery) {
            return;
        }
        if( currentQuery.filter.search != this.lastQuery.filter.search ||
            currentQuery.filter.implementationCode != this.lastQuery.filter.implementationCode ){
            this.resetPaging();
        }
    };

    proto.resetPaging = function () {
        this.skip = 0;
    };

    proto.nextPage = function(){
        this.skip += this.limit;
    };

    proto.build = function() {
        var currentQuery = {
            skip: this.skip,
            limit: this.limit,
            filter: {
                search: this.searchTerms,
                implementationCode: this.implementationCode
            },
            sort: this.sort,
            tags: this.tags
        };
        this.resetPageHeuristics(currentQuery);
        this.lastQuery = currentQuery;
        return this.lastQuery;
    };

    proto.toRequestHeaders = function(builtQuery) {
        var query = _.clone(builtQuery);
        query.filter = JSON.stringify(query.filter);
        query.sort = JSON.stringify(query.sort);
        query.tags = JSON.stringify(query.tags);
        return query;
    };


    CustomLiteralsQueryBuilder.newInstance = function() {
        return new CustomLiteralsQueryBuilder();
    };

    return CustomLiteralsQueryBuilder;
});