app.registerService(function (container) {
    var AjaxService = container.getService('services/AjaxService');
    var QueryLiteralListBuilder = container.getService('services/literal/QueryLiteralListBuilder');

    var LITERAL_KEY_LIST_URL = "https://commons-queries.forcemanager.net/literals/literal/literalListBySearchAndLimit.ashx"

    var LiteralListService = function ($ajaxService, $queryLiteralListBuilder) {
        this.ajaxService = $ajaxService;
        this.queryLiteralListBuilder = $queryLiteralListBuilder;
    };

    LiteralListService.prototype.getLiteralList = function ($query) {
        var body = $query || this.queryLiteralListBuilder.build();

        return this.ajaxService.rawAjaxRequest({
            url: LITERAL_KEY_LIST_URL,
            data: JSON.stringify(body),
            type: 'POST',
            dataType: 'json'
        });
    };

    LiteralListService.newInstance = function ($ajaxService, $queryLiteralListBuilder) {
        var ajaxService = $ajaxService || AjaxService.newInstance();
        var queryLiteralListBuilder = $queryLiteralListBuilder || QueryLiteralListBuilder.newInstance();

        return new LiteralListService(ajaxService, queryLiteralListBuilder);
    };

    return LiteralListService;
});
