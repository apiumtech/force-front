define([
    'modules/literals/global/LiteralsService'
], function (LiteralsService) {
    'use strict';

    function exerciseCreateService() {
        return LiteralsService.newInstance();
    }

    describe('LiteralsService', function () {

        it("should call literalsSharedService's getLanguageList on getLanguageList", function () {
            var sut = exerciseCreateService();
            spyOn(sut.literalsSharedService, 'getLanguageList');
            sut.getLanguageList();
            expect(sut.literalsSharedService.getLanguageList).toHaveBeenCalled();
        });

        describe('deleteLiteral', function () {
            it("should throw when id is null", function () {
                var sut = exerciseCreateService();
                expect(sut.deleteLiteral).toThrow();
            });
        });


        [
            'getLanguageList'
            , 'getLiteralsList'
        ].forEach(function (methodName) {
                it('should define ' + methodName, function () {
                    var sut = exerciseCreateService();
                    expect(sut, methodName).toBeDefined();
                });
            });

    });

});