define([
	'modules/literals/global/LiteralsModel',
	'modules/literals/global/LiteralsQueryBuilder'
], function(LiteralsModel, LiteralsQueryBuilder) {
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
    		it('should call LiteralsService literalsListBySearch with default search object', function(){
                var sut = exerciseCreateModel();
                spyOn(sut.service, "getLiteralsList");
                sut.onLiteralsRequest();
                var qb = LiteralsQueryBuilder.newInstance();
                expect(sut.service.getLiteralsList).toHaveBeenCalledWith( qb.toRequestHeaders(qb.build()) );
            });
            it('should call LiteralsService literalsListBySearch with search terms in search object', function(){
                var sut = exerciseCreateModel();
                spyOn(sut.service, "getLiteralsList");
                sut.setSearchTerms("some search");
                sut.onLiteralsRequest();
                var sentParams = sut.service.getLiteralsList.calls.argsFor(0)[0];
                var filter = JSON.parse(sentParams.filter);
                expect(filter.search).toBe("some search");
            });
        });

	});
});