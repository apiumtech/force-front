define([
    'modules/literals/shared/BaseLiteralsModel',
    'modules/literals/shared/BaseLiteralsService',
    'shared/services/ajax/BaseListQueryBuilder'

], function (BaseLiteralsModel, BaseLiteralsService, BaseListQueryBuilder) {
    'use strict';

    function exerciseCreateModel(){
        return new BaseLiteralsModel(mock(BaseLiteralsService), mock(BaseListQueryBuilder));
    }

    describe("BaseLiteralsModel", function(){

        describe("nextPage", function(){
            it("should call queryBuilder's nextPage", function () {
                var sut = exerciseCreateModel();
                sut.nextPage();
                expect(sut.queryBuilder.nextPage).toHaveBeenCalled();
            });
        });

        describe("onColumnsRequest", function(){
            it("should call sharedService's getLanguageList", function () {
                var sut = exerciseCreateModel();
                sut.onColumnsRequest();
                expect(sut.service.getLanguageList).toHaveBeenCalled();
            });
        });

        describe("onLiteralsDeleteRequest", function(){
            it("should call deleteLiteral after reset querybuilder to defaults", function () {
                var sut = exerciseCreateModel();
                sut.onLiteralsDeleteRequest(123);
                expect(sut.queryBuilder.initializeQueryDefaults).toHaveBeenCalled();
                expect(sut.service.deleteLiteral).toHaveBeenCalledWith(123);
            });
        });

    });

});
