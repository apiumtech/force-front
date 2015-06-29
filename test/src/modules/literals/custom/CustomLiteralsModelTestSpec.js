define([
	'modules/literals/custom/CustomLiteralsModel',
    'modules/literals/custom/CustomLiteralsService',
    'modules/literals/custom/CustomLiteralsQueryBuilder',
    'shared/services/StorageService'
], function(CustomLiteralsModel, CustomLiteralsService, CustomLiteralsQueryBuilder, StorageService) {
	'use strict';

    function exerciseCreateView(){
        return CustomLiteralsModel.newInstance();
    }

	describe('CustomLiteralsModel', function() {

        var sut;
        beforeEach(function(){
            sut = CustomLiteralsModel.newInstance(mock(CustomLiteralsService), mock(CustomLiteralsQueryBuilder), mock(StorageService));
        });

        describe('setUserImplementationCode', function(){
            it("should set queryBuilder implementation code", function () {
                spyOn(sut.storageService,"retrieve").and.returnValue(666);
                sut.setUserImplementationCode();
                expect(sut.queryBuilder.setImplementationCode).toHaveBeenCalledWith(666);
            });
        });

	});
});