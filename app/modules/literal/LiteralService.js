/**
 * Created by joanllenas 5/14/15
 */

define([
    'config',
    'shared/services/ajax/AuthAjaxService',
    'shared/services/StorageService',
    'q'
], function (Configuration, AuthAjaxService, StorageService, Q) {
    'use strict';


    // TODO: remove when getting rid of OK KO results
    var okKoDataFilter = function (data, type) {
        if (type == "json" && data == "OK" || data == "KO") {
            return JSON.stringify({result: data});
        }
    };


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
            url: Configuration.api.createLiteral,
            data: body,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            dataFilter: okKoDataFilter
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
            contentType: 'application/json',
            dataFilter: okKoDataFilter
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
            contentType: 'application/json',
            dataFilter: okKoDataFilter
        });
    };


    // ----------------------------------------
    //
    //  RETRIEVE LIST OF LITERALS
    //
    // ----------------------------------------

    proto.getLiteralList = function (searchTerm, skip, limit) {
        var body = "search=" + encodeURIComponent(searchTerm) +
            "&skip=" + skip +
            "&limit=" + limit;

        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.literalListBySearch,
            data: body,
            type: 'GET',
            dataType: 'json'
        });
    };


    // ----------------------------------------
    //
    //  RETRIEVE ONE LITERAL
    //
    // ----------------------------------------


    proto._mergeLanguagesWithLiteral = function (literal) {
        var deferred = Q.defer();

        literal.LanguageValues = literal.LanguageValues || [];

        var languagesToAdd = [];
        this.getLanguageList().then(
            function (languageList) {
                var langListLen = languageList.length;
                var langValuesLen = literal.LanguageValues.length;
                for (var i = 0; i < langListLen; i++) {
                    var languageIsFound = false;
                    var langListItemName = languageList[i].Name;
                    for (var j = 0; j < langValuesLen; j++) {
                        var langValueKey = literal.LanguageValues[j].Key;
                        if (langListItemName == langValueKey) {
                            languageIsFound = true;
                            break;
                        }
                    }
                    if (!languageIsFound) {
                        languagesToAdd.push({Key: langListItemName, Value: ""});
                    }
                }
                literal.LanguageValues = literal.LanguageValues.concat(languagesToAdd);
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
        this.ajaxService.rawAjaxRequest({
            url: Configuration.api.literalById,
            data: body,
            type: 'GET',
            dataType: 'json'
        }).then(
            function (literal) {
                self._mergeLanguagesWithLiteral(literal).then(
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
            DeviceCategories: [],
            DeviceTypes: [],
            Id: null,
            Key: "",
            LanguageValues: [],
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


    proto.getLiteralTypeList = function () {
        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.literalTypeList,
            type: 'GET',
            dataType: 'json'
        });
    };

    proto.getDeviceTypeList = function () {
        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.deviceTypeList,
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