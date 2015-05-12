app.registerService(function (container) {

    var DEFAULT_ITEM_PER_PAGE = 99999;

    var QueryLiteralListBuilder = function ($itemsPerPage) {
        this._pattern = '';
        this._itemsPerPage = $itemsPerPage;
    };

    QueryLiteralListBuilder.prototype.setPattern = function (pattern) {
        this._pattern = pattern;
        return this;
    };

    QueryLiteralListBuilder.prototype.build = function () {
        return {
            credentials: {keys: {key: 'key', user: 'user', userkey: 'userKey', localTime: 'localTime'}},
            searchText: this._pattern,
            offset: this._offset,
            limit: this._itemsPerPage
        };
    };

    QueryLiteralListBuilder.newInstance = function (itemsPerPage) {
        return new QueryLiteralListBuilder(itemsPerPage || DEFAULT_ITEM_PER_PAGE);
    };

    return QueryLiteralListBuilder;

});

