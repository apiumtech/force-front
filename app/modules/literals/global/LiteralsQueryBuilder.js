define([
    'config',
    'underscore'
], function(config, _) {
    'use strict';

    var TAG_TOTAL_COUNT = "totalCount";
    var ALL_RESULTS_LIMIT = 0;
    var SORT_DESC = -1;
    var SORT_ASC = 1;
    var SORT_DEFAULT = SORT_DESC;

    function LiteralsQueryBuilder(){
        this.lastQuery = null;
        this.initializeQueryDefaults();
    }

    LiteralsQueryBuilder.prototype.initializeQueryDefaults = function(){
        this.skip = 0;
        this.limit = config.pageSize;
        this.searchTerms = "";
        this.literalTypeId = "";
        this.deviceTypeIds = [];
        this.sort = {};
        this.tags = [ TAG_TOTAL_COUNT ];
    };

    LiteralsQueryBuilder.prototype.setSearchTerms = function( searchTerms ) {
        this.searchTerms = searchTerms;
    };

    LiteralsQueryBuilder.prototype.resetPageHeuristics = function(currentQuery) {
        if(!this.lastQuery) {
            return;
        }
        if( currentQuery.filter.search != this.lastQuery.filter.search ||
            currentQuery.filter.literalTypeId != this.lastQuery.filter.literalTypeId ||
            !_.isEqual(currentQuery.filter.deviceTypeIds, this.lastQuery.filter.deviceTypeIds) ){
            this.resetPaging();
        }
    };

    LiteralsQueryBuilder.prototype.resetPaging = function () {
        this.skip = 0;
    };

    LiteralsQueryBuilder.prototype.nextPage = function(){
        this.skip += this.limit;
    };

    LiteralsQueryBuilder.prototype.build = function() {
        var currentQuery = {
            skip: this.skip,
            limit: this.limit,
            filter: {
                search: this.searchTerms,
                literalTypeId: this.literalTypeId,
                deviceTypeIds: this.deviceTypeIds
            },
            sort: this.sort,
            tags: this.tags
        };
        this.resetPageHeuristics(currentQuery);
        this.lastQuery = currentQuery;
        return this.lastQuery;
    };

    LiteralsQueryBuilder.prototype.toRequestHeaders = function(builtQuery) {
        var query = _.clone(builtQuery);
        query.filter = JSON.stringify(query.filter);
        query.sort = JSON.stringify(query.sort);
        query.tags = JSON.stringify(query.tags);
        return query;
    };


    LiteralsQueryBuilder.newInstance = function() {
        return new LiteralsQueryBuilder();
    };

    return LiteralsQueryBuilder;
});