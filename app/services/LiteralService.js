/**
 * Created by joanllenas 5/14/15
 */

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

    var proto = LiteralService.prototype = Object.create(Object.prototype, {});



    // ----------------------------------------
    //
    //  MANIPULATE LITERALS
    //
    // ----------------------------------------

    proto._createLiteralBody = function(literal){
        var body = {
            key : literal.Key,
            values : {}
        };

        literal.LanguageValues.forEach(function (lang) {
            body.values[lang.Key] = lang.Value;
        });

        return body;
    };

    proto.createLiteral = function (literal) {
        var body = this._createLiteralBody(literal);

        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.createLiteral,
            data: body,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json'
        });
    };


    proto.changeLiteralDetails = function (literal) {
        assertNotNull("Id", literal.Id);

        var body = this._createLiteralBody(literal);
        body.id = literal.Id;

        var params = {
            url: Configuration.api.changeLiteralDetails,
            data: body,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params);
    };


    proto.deleteLiteral = function (id) {
        assertNotNull("id", id);
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

    proto.getLiteralList = function (searchTerm, skip, limit) {
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


    proto.getLiteralDictionary = function (lang, implementationCode) {
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


    proto._mergeLanguagesWithLiteral = function(literal) {
        var deferred = Q.defer();

        literal.LanguageValues = literal.LanguageValues || [];

        var languagesToAdd = [];
        this.getLanguageList().then(
            function(languageList) {
                languageList.forEach(function(langListItem){
                    var languageIsFound = false;
                    if(literal.LanguageValues.length) {
                        languageIsFound = literal.LanguageValues.every(function (langValue) {
                            console.log(langListItem.Name, "===", langValue.Key);
                            return langListItem.Name === langValue.Key;
                        });
                    }
                    if(!languageIsFound) {
                        languagesToAdd.push({ Key:langListItem.Name, Value:"" });
                    }
                });
                console.log("languagesToAdd", languagesToAdd);
                literal.LanguageValues = literal.LanguageValues.concat(languagesToAdd);
                deferred.resolve(literal);
            },
            function(err){ deferred.reject(err); }
        );

        return deferred.promise;
    };


    proto.getLiteralById = function (id) {
        var deferred = Q.defer();
        var self = this;

        var body = "id=" + id;
        this.ajaxService.rawAjaxRequest({
            url: Configuration.api.literalById,
            data: body,
            type: 'GET',
            dataType: 'json'
        }).then(
            function(literal) {
                self._mergeLanguagesWithLiteral(literal).then(
                    function(mergedLiteral){
                        deferred.resolve(mergedLiteral);
                    }
                )
            },
            function(err){ deferred.reject(err); }
        );

        return deferred.promise;
    };


    proto.getNullLiteral = function () {
        var deferred = Q.defer();

        var nullLiteral = {
            DeviceCategories: [],
            DeviceTypes: [],
            Id: null,
            Key: "",
            LanguageValues:[],
            LiteralType: null,
            OldKey:""
        };

        this._mergeLanguagesWithLiteral(nullLiteral).then(
            function(mergedLiteral){
                deferred.resolve(mergedLiteral);
            }
        );

        /*this.getLanguageList().then(
            function(data){
                data.forEach(function(lang){
                    nullLiteral.LanguageValues.push(
                        { Key:lang.Name, Value:"" }
                    );
                });
                deferred.resolve(nullLiteral);
            },
            function(err){ deferred.reject(err); }
        );*/

        return deferred.promise;
    };



    // ----------------------------------------
    //
    //  RETRIEVE LIST OF LANGUAGES
    //
    // ----------------------------------------

    proto.getLanguageList = function () {
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