define([
    'config'
    ,'shared/services/ajax/AuthAjaxService'
    ,'shared/services/ajax/CQRSUnwrapper'
    ,'q'
    ,'modules/literals/shared/LiteralsSharedService'
    ,'underscore'
], function(config, AuthAjaxService, CQRSUnwrapper, Q, LiteralsSharedService, _) {
    'use strict';

    function LiteralsEditCreateService(ajaxService, sharedService) {
        this.authAjaxService = ajaxService;
        this.sharedService = sharedService;
    }

    var proto = LiteralsEditCreateService.prototype;


    // ------------------------
    //
    //  Literal manipulation
    //
    // ------------------------

    proto._createLiteralBody = function (literal) {
        var body = {
            key: literal.Key,
            languageValues: {},
            deviceTypeIds: [],
            literalTypeId: null,
            oldKey: ''
        };
        _.each(literal.LanguageValues, function(value, key){
            body.languageValues[key] = value;
        });
        literal.DeviceTypes.forEach(function (deviceType) {
            body.deviceTypeIds.push(deviceType.Id);
        });
        body.literalTypeId = literal.LiteralType ? literal.LiteralType.Id : null;
        body.oldKey = literal.OldKey || '';
        return body;
    };


    proto.createLiteral = function (literal) {
        assertNotNull("literal", literal);
        assertNotNull("LiteralType", literal.LiteralType);
        var body = this._createLiteralBody(literal);
        return CQRSUnwrapper.unwrap(
            this.authAjaxService.rawAjaxRequest({
                url: config.api.createLiteral,
                data: body,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            })
        );
    };


    proto.changeLiteralDetails = function (literal) {
        assertNotNull("Id", literal.Id);
        var body = this._createLiteralBody(literal);
        delete body.key;
        body.id = literal.Id;
        var params = {
            url: config.api.changeLiteralDetails,
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
        this.sharedService.getLanguageList()
            .then(
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
                url: config.api.literalById,
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
            DeviceTypes: [],
            Id: null,
            Key: "",
            LanguageValues: {},
            LiteralType: null,
            OldKey: ""
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



    proto.getLiteralTypeList = function () {
        return this.sharedService.getLiteralTypeList();
    };


    proto.getDeviceTypeList = function () {
        return this.sharedService.getDeviceTypeList();
    };


    LiteralsEditCreateService.newInstance = function (ajaxService, sharedService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        sharedService = sharedService || LiteralsSharedService.newInstance();
        return new LiteralsEditCreateService(ajaxService, sharedService);
    };

    return LiteralsEditCreateService;
});