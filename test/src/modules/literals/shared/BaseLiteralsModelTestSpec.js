define([
    'modules/literals/shared/BaseLiteralsModel',
    'modules/literals/shared/LiteralsSharedService',
    'shared/services/ajax/BaseListQueryBuilder'

], function (BaseLiteralsModel, LiteralsSharedService, BaseListQueryBuilder) {
    'use strict';

    function exerciseCreateModel(){
        return new BaseLiteralsModel(mock(LiteralsSharedService), mock(BaseListQueryBuilder));
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

    });

});
