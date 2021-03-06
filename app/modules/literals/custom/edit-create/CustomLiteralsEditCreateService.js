define([
    'config'
    ,'shared/services/ajax/AuthAjaxService'
    ,'q'
    ,'modules/literals/shared/LiteralsSharedService'
    ,'shared/services/ajax/CQRSUnwrapper'
    ,'underscore'
], function(config, AuthAjaxService, Q, LiteralsSharedService, CQRSUnwrapper, _) {
    'use strict';

    function CustomLiteralsEditCreateService(ajaxService, sharedService) {
        this.authAjaxService = ajaxService;
        this.sharedService = sharedService;
    }

    var proto = CustomLiteralsEditCreateService.prototype;


    // ------------------------
    //
    //  Literal manipulation
    //
    // ------------------------

    proto.createLiteral = function (body) {
        return CQRSUnwrapper.unwrap(
            this.authAjaxService.rawAjaxRequest({
                url: config.api.createCustomLiteral,
                data: body,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            })
        );
    };


    proto.changeLiteralDetails = function (body) {
        var params = {
            url: config.api.changeCustomLiteralDetails,
            data: body,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json'
        };
        return CQRSUnwrapper.unwrap(
            this.authAjaxService.rawAjaxRequest(params)
        );
    };



    // ---------------------
    //
    //  Get literal
    //
    // ---------------------

    proto._mergeLanguagesWithLiteral = function (literal) {
        var deferred = Q.defer();
        literal.LanguageValues = literal.LanguageValues || {};
        this.sharedService.getLanguageList().then(
            function (languageList) {
                languageList = languageList.data;
                _.each(languageList, function(lang){
                    if( !(lang.Name in literal.LanguageValues) ){
                        literal.LanguageValues[lang.Name] = "";
                    }
                });
                deferred.resolve(literal);
            },
            function (err) {
                deferred.reject(err);
            }
        );
        return deferred.promise;
    };


    proto.getLiteralById = function (id) {
        var deferred = Q.defer();
        var self = this;
        var body = "id=" + id;
        CQRSUnwrapper.unwrap(
            this.authAjaxService.rawAjaxRequest({
                url: config.api.customLiteralById,
                data: body,
                type: 'GET',
                dataType: 'json'
            })
        ).then(
            function (res) {
                self._mergeLanguagesWithLiteral(res.data).then(
                    function (mergedLiteral) {
                        deferred.resolve(mergedLiteral);
                    }
                )
            },
            function (err) {
                deferred.reject(err);
            }
        );
        return deferred.promise;
    };


    proto.getNullLiteral = function () {
        var deferred = Q.defer();
        var nullLiteral = {
            ImplementationCode: null,
            Id: null,
            Key: "",
            LanguageValues: {}
        };
        this._mergeLanguagesWithLiteral(nullLiteral).then(
            function (mergedLiteral) {
                deferred.resolve(mergedLiteral);
            }
        );
        return deferred.promise;
    };

    // ---------------------
    //
    // End Get literal
    //
    // ---------------------



    proto.getImplementationList = function () {
        return this.sharedService.getImplementationList();
    };



    CustomLiteralsEditCreateService.newInstance = function (ajaxService, sharedService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        sharedService = sharedService || LiteralsSharedService.newInstance();
        return new CustomLiteralsEditCreateService(ajaxService, sharedService);
    };

    return CustomLiteralsEditCreateService;
});