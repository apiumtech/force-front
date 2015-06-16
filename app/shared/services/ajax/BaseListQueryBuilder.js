define([
    'config',
    'underscore'
], function(config, _) {
    'use strict';


    function BaseListQueryBuilder(){
        this.lastQuery = null;
        this.initializeQueryDefaults();
    }

    Object.defineProperties(BaseListQueryBuilder, {
        "TAG_TOTAL_COUNT": { value: "totalCount", writable: false },
        "LIMIT_GET_ALL_RESULTS": { value: 0, writable: false },
        "SORT_DESC": { value: -1, writable: false },
        "SORT_ASC": { value: 1, writable: false },
        "SORT_DEFAULT": { value: -1, writable: false }
    });

    var proto = BaseListQueryBuilder.prototype;


    proto.initializeQueryDefaults = function(){
        this.skip = 0;
        this.limit = config.pageSize;
        this.searchTerms = "";
        this.sort = {};
        this.tags = [ BaseListQueryBuilder.TAG_TOTAL_COUNT ];
    };

    proto.setSearchTerms = function( searchTerms ) {
        this.searchTerms = searchTerms;
    };

    proto.resetPageHeuristicsBuilder = function(currentQuery) {
        return [ currentQuery.filter.search != this.lastQuery.filter.search ];
    };

    proto.resetPageHeuristics = function(currentQuery) {
        assertNotNull("currentQuery", currentQuery);
        if(!this.lastQuery) {
            return;
        }
        var conditions = this.resetPageHeuristicsBuilder(currentQuery);
        var shouldReset = conditions.reduce(function(a,b){
            return a || b;
        });
        if( shouldReset ){
            this.resetPaging();
        }
    };

    proto.resetPaging = function () {
        this.skip = 0;
    };

    proto.nextPage = function(){
        this.skip += this.limit;
    };

    proto.createCurrentQuery = function() {
        return {
            skip: this.skip,
            limit: this.limit,
            filter: {
                search: this.searchTerms
            },
            sort: this.sort,
            tags: this.tags
        };
    }

    proto.build = function() {
        var currentQuery = this.createCurrentQuery();
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

    return BaseListQueryBuilder;
});