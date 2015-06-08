define([
    'config'
    ,'shared/services/ajax/AuthAjaxService'
    ,'shared/services/StorageService'
    ,'modules/literals/shared/LiteralsSharedService'
    ,'q'
    ,'underscore'
    ,'shared/services/ajax/FakeAjaxService'
], function(config, AuthAjaxService, StorageService, LiteralsSharedService, Q, _, FakeAjaxService) {
	'use strict';

	function LiteralsService(ajaxService, storageService, literalsSharedService) {
        this.ajaxService = ajaxService;
        this.storageService = storageService;
        this.literalsSharedService = literalsSharedService;
        this.fakeAjaxService = FakeAjaxService.newInstance();
	}

    var proto = LiteralsService.prototype;


    proto.getLanguageList = function() {
        return this.literalsSharedService.getLanguageList();
    };


    proto.getLiteralsList = function(searchParams) {
        console.log("fake getLiteralsList");
        return this.ajaxService.rawAjaxRequest({
            url: "mocks/literalList.json",
            type: 'GET',
            dataType: 'json'
        });

        return this.ajaxService.rawAjaxRequest({
            url: config.api.literalListBySearch,
            headers: searchParams,
            type: 'GET',
            dataType: 'json'
        });
    };



    // ------------------------
    //
    //  Literal manipulation
    //
    // ------------------------

    proto._createLiteralBody = function (literal) {
        var body = {
            key: literal.Key,
            values: {},
            deviceTypeIds: [],
            literalTypeId: null
        };

        _.each(literal.LanguageValues, function(value, key){
            body.values[key] = value;
        });

        literal.DeviceTypes.forEach(function (deviceType) {
            body.deviceTypeIds.push(deviceType.Id);
        });

        body.literalTypeId = literal.LiteralType ? literal.LiteralType.Id : null;

        return body;
    };

    proto.createLiteral = function (literal) {
        assertNotNull("literal", literal);
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

        console.log("fake delete literal");
        this.fakeAjaxService.rawAjaxRequest({result:{}});

        return this.ajaxService.rawAjaxRequest({
            url: config.api.deleteLiteral,
            data: body,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json'
        });
    };


    LiteralsService.newInstance = function (ajaxService, storageService, literalsSharedService) {
        ajaxService = ajaxService || AuthAjaxService.newInstance();
        storageService = storageService || StorageService.newInstance();
        literalsSharedService = literalsSharedService || LiteralsSharedService.newInstance();
        return new LiteralsService(ajaxService, storageService, literalsSharedService);
    };

	return LiteralsService;
});