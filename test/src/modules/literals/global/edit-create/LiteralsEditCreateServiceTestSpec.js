define([
    'modules/literals/global/edit-create/LiteralsEditCreateService',
    'shared/services/ajax/CQRSUnwrapper'
], function (LiteralsEditCreateService, CQRSUnwrapper) {
    'use strict';

    function exerciseCreateService() {
        return LiteralsEditCreateService.newInstance();
    }

    describe('LiteralsEditCreateService', function () {

        describe('_createLiteralBody', function () {
            var someLiteral, sut, body;
            beforeEach(function () {
                someLiteral = {
                    DeviceTypes: [{Id:'dt-1'},{Id:'dt-2'}],
                    Id: 'id-12345',
                    Key: "some_key",
                    LanguageValues: {
                        "es-es": "some key es",
                        "en-us": "some key en",
                        "fr-fr": "some key fr"
                    },
                    LiteralType: {Id:'lt-1'},
                    OldKey: "the old key"
                };
                sut = exerciseCreateService();
                body = sut._createLiteralBody(someLiteral);
            });
            it('should create a literal body with the correct Key', function () {
                expect(body.key).toBe("some_key");
            });
            it('should create a literal body with the correct languageValues', function () {
                expect(body.languageValues).toEqual({
                    "es-es": "some key es",
                    "en-us": "some key en",
                    "fr-fr": "some key fr"
                });
            });
            it('should create a literal body with the correct Device Types', function () {
                expect(body.deviceTypeIds).toEqual(['dt-1','dt-2']);
            });
            it('should create a literal body with the correct Literal Type Id', function () {
                expect(body.literalTypeId).toBe('lt-1');
            });
            it('should create a literal body with the correct old key', function () {
                expect(body.oldKey).toBe('the old key');
            });
        });

        describe('createLiteral', function () {
            it("should throw when literal is null", function () {
                var sut = exerciseCreateService();
                expect(sut.createLiteral).toThrow();
            });
            it("should call ajaxService's rawAjaxRequest with the literal as body", function () {
                var sut = exerciseCreateService();
                spyOn(CQRSUnwrapper, "unwrap");
                spyOn(sut.ajaxService, "rawAjaxRequest");
                sut.createLiteral({Key:"some_key", DeviceTypes:[], LiteralType:{Id:1}, LanguageValues:{}});
                expect(sut.ajaxService.rawAjaxRequest.calls.argsFor(0)[0].data).toEqual({
                    key: "some_key",
                    languageValues: {},
                    deviceTypeIds: [],
                    literalTypeId: 1,
                    oldKey: ''
                });
            });
        });

        describe('changeLiteralDetails', function () {
            it("should throw when literal Id is null", function () {
                var sut = exerciseCreateService();
                expect(function(){sut.changeLiteralDetails({Id:null})}).toThrow();
            });
        });


        [
            'getLiteralTypeList'
            , 'getDeviceTypeList'
        ].forEach(function (methodName) {
                it('should define ' + methodName, function () {
                    var sut = exerciseCreateService();
                    expect(sut, methodName).toBeDefined();
                });
            });

    });

});