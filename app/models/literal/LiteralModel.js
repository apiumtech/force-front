app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var AjaxService = container.getService("services/AjaxService");

    function LiteralModel(ajaxService) {
        this.ajaxService = ajaxService;
        this.page = -1;
    }


    // ------
    // List
    // ------


    LiteralModel.prototype.getLiteralList = function (searchTerm) {
        this.page++;

        var body = {
            search: searchTerm,
            skip: this.page,
            limit: Configuration.pageSize
        };

        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.literalListBySearch,
            data: JSON.stringify(body),
            type: 'POST',
            dataType: 'json'
        });
    };



    LiteralModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));

        return Some(new LiteralModel(ajaxService));
    };

    return {newInstance: LiteralModel.newInstance};
});

