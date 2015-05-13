app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var AuthAjaxService = container.getService('services/ajax/AuthAjaxService');
    var StorageService = container.getService("services/StorageService");
    var Q = container.getFunction('q');


    /**
     * @constructor
     */
    function LiteralModel(ajaxService, storageService) {
        this.ajaxService = ajaxService;
        this.storageService = storageService;
        this.page = 0;
    }


    /**
     * createLiteral()
     */
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
    LiteralModel.prototype.changeLiteralDetails = function (literal) {
        var languageValues = [];
        literal.LanguageValues.forEach(function (lang) {
            var langObj = {};
            langObj[lang.Key] = lang.Value;
            languageValues.push(langObj);
        });

        var body = {
            "id": literal.Id,
            "key" : literal.Key,//key del literal
            "values" : languageValues
        };

        var params = {
            url: Configuration.api.changeLiteralDetails,
            data: JSON.stringify(body),
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params);
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


    /**
     * getLiteralList()
     */
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



    /**
     * getLiteralById()
     */
    LiteralModel.prototype.getLiteralById = function (id) {
        if(id===null){
            return this.getNullLiteral();
        } else {
            return this.getActualLiteralById(id);
        }
    };

    /**
     * getActualLiteralById()
     */
    LiteralModel.prototype.getActualLiteralById = function (id) {
        var body = "id="+ id;
        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.literalById,
            data: body,
            type: 'GET',
            dataType: 'json'
        });
    };

    /**
     * getNullLiteral()
     */
    LiteralModel.prototype.getNullLiteral = function () {
        var deferred = Q.defer();
        var nullLiteral = {
            DeviceCategories: [],
            DeviceTypes: [],
            Id: null,
            Key: "",
            LanguageValues:[
                {Key:"es-es",Value:""},
                {Key:"en-us","Value":""}
            ],
            LiteralType: null,
            OldKey:""
        };
        setTimeout(deferred.resolve.bind(deferred), 100, nullLiteral);
        return deferred.promise;
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
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        storageService = storageService || StorageService.newInstance();

        return Some(new LiteralModel(ajaxService, storageService));
    };


    return {newInstance: LiteralModel.newInstance};
});

