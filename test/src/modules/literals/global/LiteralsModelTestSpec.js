define([
	'modules/literals/global/LiteralsModel'
], function(LiteralsModel) {
	'use strict';

    function exerciseCreateModel(){
        return LiteralsModel.newInstance();
    }

	describe('LiteralsModel', function() {

        describe('onColumnsRequest', function(){
    		it('should call LiteralsService getLanguageList', function(){
                var sut = exerciseCreateModel();
                spyOn(sut.service, "getLanguageList");
                sut.onColumnsRequest();
                expect(sut.service.getLanguageList).toHaveBeenCalled();
            });
        });

        describe('onLiteralsRequest', function(){
    		it('should call LiteralsService literalsListBySearch', function(){
                var sut = exerciseCreateModel();
                spyOn(sut.service, "getLiteralsList");
                sut.searchObject = {
                    searchTerms:"hola",
                    skip:0,
                    limit:100
                };
                sut.onLiteralsRequest();
                expect(sut.service.getLiteralsList).toHaveBeenCalledWith({
                    searchTerms:"hola",
                    skip:0,
                    limit:100
                });
            });
        });

	});
});