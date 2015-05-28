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

	});
});