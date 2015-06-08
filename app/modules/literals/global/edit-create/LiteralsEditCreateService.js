define([
    'config'
    ,'shared/services/ajax/AuthAjaxService'
    ,'q'
    ,'modules/literals/shared/LiteralsSharedService'
    ,'underscore'
], function(config, AuthAjaxService, Q, LiteralsSharedService, _) {
    'use strict';

    function LiteralsEditCreateService(ajaxService, sharedService) {
        this.ajaxService = ajaxService;
        this.sharedService = sharedService;
    }

    var proto = LiteralsEditCreateService.prototype;



    proto._createLiteralBody = function (literal) {
        var body = {
            key: literal.Key,
            values: {},
            deviceCategoryIds: [],
            deviceTypeIds: [],
            literalTypeId: null
        };

        literal.LanguageValues.forEach(function (lang) {
            body.values[lang.Key] = lang.Value;
        });

        literal.DeviceCategories.forEach(function (deviceCat) {
            body.deviceCategoryIds.push(deviceCat.Id);
        });

        literal.DeviceTypes.forEach(function (deviceType) {
            body.deviceTypeIds.push(deviceType.Id);
        });

        body.literalTypeId = literal.LiteralType ? literal.LiteralType.Id : null;

        return body;
    };


    proto.createLiteral = function (literal) {
        var body = this._createLiteralBody(literal);

        return this.ajaxService.rawAjaxRequest({
            url: config.api.createLiteral,
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
            url: config.api.changeLiteralDetails,
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
            url: config.api.deleteLiteral,
            data: body,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json'
        });
    };



    // ---------------------
    //
    //  Get literal
    //
    // ---------------------

    proto._mergeLanguagesWithLiteral = function (literal) {
        var deferred = Q.defer();

        literal.LanguageValues = literal.LanguageValues || {};

        //var languagesToAdd = [];
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

        /*var promise = this.ajaxService.rawAjaxRequest({
            url: config.api.literalById,
            data: body,
            type: 'GET',
            dataType: 'json'
        });*/

        console.log("fake getLiteralById");
        var promise = this.ajaxService.rawAjaxRequest({
            url: "mocks/literalById.json",
            data: body,
            type: 'GET',
            dataType: 'json'
        });

        promise.then(
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