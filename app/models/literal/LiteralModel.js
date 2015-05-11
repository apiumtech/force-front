app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var AuthAjaxService = container.getService('services/ajax/AuthAjaxService');
    var StorageService = container.getService("services/StorageService");
    var Q = container.getFunction('q');


    function LiteralModel(ajaxService, storageService) {
        this.ajaxService = ajaxService;
        this.storageService = storageService;
        this.page = 0;
    }


    LiteralModel.prototype.createLiteral = function () {
        var body = {
            "key" : "aaaa",//key del literal
            "values" : {// uno o más valores
                "es-es" : "vvvv1",
                "en-us" : "vvvv2"
            }
        };
        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.createLiteral,
            data: body,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json'
        });
    };


    /**
     * changeLiteralDetails()
     */
    LiteralModel.prototype.changeLiteralDetails = function () {
        var body = {
            "id": "un guid e string.....",
            "key" : "aaaa",//key del literal
            "values" : {// uno o más valores
                "es-es" : "vvvv1",
                "en-us" : "vvvv2"
            }
        };
        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.changeLiteralDetails,
            data: body,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json'
        });
    };


    /**
     * deleteLiteral()
     */
    LiteralModel.prototype.deleteLiteral = function () {
        var body = {
            "id": "un guid e string....."
        };
        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.deleteLiteral,
            data: body,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json'
        });
    };


    // ------
    // List
    // ------


    LiteralModel.prototype.getLiteralList = function (searchTerm) {
        var body = "search="+ encodeURIComponent(searchTerm) +
            "&skip="+ this.page +
            "&limit="+ Configuration.pageSize;

        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.literalListBySearch,
            data: body,
            type: 'GET',
            dataType: 'json'
        });
    };



    /*LiteralModel.prototype.getLiteralDictionary = function (lang, implementationCode) {
        lang = lang || Configuration.defaultLiteralLang;
        implementationCode = implementationCode || "";

        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.literalValueDictionaryByLanguageAndImplementationCode,
            type: 'GET',
            data: "language="+ lang +"&implementationCode=" + implementationCode
        });
    };*/



    LiteralModel.newInstance = function (ajaxService, storageService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance().getOrElse(throwInstantiateException(AuthAjaxService));
        storageService = storageService || StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));

        return Some(new LiteralModel(ajaxService, storageService));
    };


    return {newInstance: LiteralModel.newInstance};
});

