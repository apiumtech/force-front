define([
    'config',
	'modules/literals/custom/CustomLiteralsService',
    'shared/services/ajax/CQRSUnwrapper'
], function(config, CustomLiteralsService, CQRSUnwrapper) {
	'use strict';

    function exerciseCreateService(){
        return CustomLiteralsService.newInstance();
    }

	describe('CustomLiteralsService', function() {
	    describe('getLanguageList', function() {
            it("sould call shared Service's getLanguageList", function () {
                var sut = exerciseCreateService();
                spyOn(sut.literalsSharedService, "getLanguageList");
                sut.getLanguageList();
                expect(sut.literalsSharedService.getLanguageList).toHaveBeenCalled();
            });
        });
        describe('getLiteralsList', function() {
            it("sould call ajaxservice with correct url", function () {
                var sut = exerciseCreateService();
                spyOn(CQRSUnwrapper, "unwrap");
                spyOn(sut.authAjaxService, "rawAjaxRequest");
                config.api.customLiteralList = "some url";
                sut.getLiteralsList();
                var args = sut.authAjaxService.rawAjaxRequest.calls.argsFor(0);
                expect(args[0].url).toBe("some url");
            });
        });
        describe('deleteLiteral', function() {
            it("sould throw if no id is provided", function () {
                var sut = exerciseCreateService();
                expect(sut.deleteLiteral).toThrow();
            });
            it("sould call ajaxservice with correct url", function () {
                var sut = exerciseCreateService();
                spyOn(CQRSUnwrapper, "unwrap");
                spyOn(sut.authAjaxService, "rawAjaxRequest");
                config.api.deleteCustomLiteral = "deleteCustomLiteral url";
                sut.deleteLiteral(123);
                var args = sut.authAjaxService.rawAjaxRequest.calls.argsFor(0);
                expect(args[0].url).toBe("deleteCustomLiteral url");
            });
            it("sould call ajaxservice passing id", function () {
                var sut = exerciseCreateService();
                spyOn(CQRSUnwrapper, "unwrap");
                spyOn(sut.authAjaxService, "rawAjaxRequest");
                sut.deleteLiteral(456);
                var args = sut.authAjaxService.rawAjaxRequest.calls.argsFor(0);
                expect(args[0].data.id).toBe(456);
            });
        });
	});
});