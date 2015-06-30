define([
    'modules/literals/global/LiteralsService',
    'shared/services/ajax/CQRSUnwrapper',
    'config'
], function (LiteralsService, CQRSUnwrapper, config) {
    'use strict';

    function exerciseCreateService() {
        return LiteralsService.newInstance();
    }

    describe('LiteralsService', function () {

        beforeEach(function(){
            spyOn(CQRSUnwrapper, "unwrap");
        });

        it("should call literalsSharedService's getLanguageList on getLanguageList", function () {
            var sut = exerciseCreateService();
            spyOn(sut.literalsSharedService, 'getLanguageList');
            sut.getLanguageList();
            expect(sut.literalsSharedService.getLanguageList).toHaveBeenCalled();
        });

        describe('getLiteralsList', function () {
            it("should call ajaxService's rawAjaxRequest with literalList url", function () {
                var sut = exerciseCreateService();
                spyOn(sut.ajaxService, "rawAjaxRequest");
                config.api.literalList = "getLiteralsList url";
                sut.getLiteralsList();
                var args = sut.ajaxService.rawAjaxRequest.calls.argsFor(0);
                var ajaxParams = args[0];
                expect( ajaxParams.url).toBe("getLiteralsList url");
            });
        });

        describe('deleteLiteral', function () {
            it("should throw when id is null", function () {
                var sut = exerciseCreateService();
                expect(sut.deleteLiteral).toThrow();
            });
            it("should call ajaxService's rawAjaxRequest with deleteLiteral url", function () {
                var sut = exerciseCreateService();
                spyOn(sut.ajaxService, "rawAjaxRequest");
                config.api.deleteLiteral = "deleteLiteral url";
                sut.deleteLiteral(1);
                var args = sut.ajaxService.rawAjaxRequest.calls.argsFor(0);
                var ajaxParams = args[0];
                expect( ajaxParams.url).toBe("deleteLiteral url");
            });
            it("should call ajaxService's rawAjaxRequest passing the literal id", function () {
                var sut = exerciseCreateService();
                spyOn(sut.ajaxService, "rawAjaxRequest");
                sut.deleteLiteral(2);
                var args = sut.ajaxService.rawAjaxRequest.calls.argsFor(0);
                var ajaxParams = args[0];
                expect( ajaxParams.data).toEqual({id:2});
            });
        });

    });

});