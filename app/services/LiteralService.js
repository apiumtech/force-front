app.registerService(function (container) {
    var Configuration = container.getService('Configuration');
    var AuthAjaxService = container.getService('services/ajax/AuthAjaxService');
    var StorageService = container.getService("services/StorageService");
    var Q = container.getFunction('q');


    // ----------------------------------------
    //
    //  CONSTRUCTOR
    //
    // ----------------------------------------

    function LiteralService(ajaxService, storageService) {
        this.ajaxService = ajaxService;
        this.storageService = storageService;
    }

    LiteralService.prototype = Object.create(Object.prototype, {});



    // ----------------------------------------
    //
    //  MANIPULATE LITERALS
    //
    // ----------------------------------------


    /**
     * createLiteral()
     */
    LiteralService.prototype.createLiteral = function () {
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
    LiteralService.prototype.changeLiteralDetails = function (literal) {
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
    LiteralService.prototype.deleteLiteral = function (id) {
        var body = {
            "id": id
        };
        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.deleteLiteral,
            data: body,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json'
        });
    };



    // ----------------------------------------
    //
    //  RETRIEVE LIST OF LITERALS
    //
    // ----------------------------------------


    /**
     * getLiteralList()
     */
    LiteralService.prototype.getLiteralList = function (searchTerm, skip, limit) {
        var body = "search="+ encodeURIComponent(searchTerm) +
            "&skip="+ skip +
            "&limit="+ limit;

        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.literalListBySearch,
            data: body,
            type: 'GET',
            dataType: 'json'
        });
    };


    /**
     * getLiteralDictionary()
     */
    LiteralService.prototype.getLiteralDictionary = function (lang, implementationCode) {
        lang = lang || Configuration.defaultLiteralLang;
        implementationCode = implementationCode || "";

        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.literalValueDictionaryByLanguageAndImplementationCode,
            type: 'GET',
            dataType: 'json',
            data: "language="+ lang +"&implementationCode=" + implementationCode
        });
    };


    // ----------------------------------------
    //
    //  RETRIEVE ONE LITERAL
    //
    // ----------------------------------------


    /**
     * getLiteralById()
     */
    LiteralService.prototype.getLiteralById = function (id) {
        if(id===null){
            return this._getNullLiteral();
        } else {
            return this._getActualLiteralById(id);
        }
    };

    LiteralService.prototype._getNullLiteral = function () {
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

    LiteralService.prototype._getActualLiteralById = function (id) {
        var body = "id=" + id;
        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.literalById,
            data: body,
            type: 'GET',
            dataType: 'json'
        });
    };


    // ----------------------------------------
    //
    //  RETRIEVE LIST OF LANGUAGES
    //
    // ----------------------------------------


    /**
     * getLanguageList()
     */
    LiteralService.prototype.getLanguageList = function () {
        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.languageList,
            type: 'GET',
            dataType: 'json'
        });
    };




    // ----------------------------------------
    //
    //  FACTORY
    //
    // ----------------------------------------

    LiteralService.newInstance = function (ajaxService, storageService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        storageService = storageService || StorageService.newInstance();
        return new LiteralService(ajaxService, storageService);
    };

    return LiteralService;
});