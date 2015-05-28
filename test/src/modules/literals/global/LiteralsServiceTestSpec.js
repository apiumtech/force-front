define([
	'modules/literals/global/LiteralsService'
], function(LiteralsService) {
	'use strict';

	function exerciseCreateService(){
		return LiteralsService.newInstance();
	}

	describe('LiteralsService', function() {
		[
			'getLanguageList'
		].forEach(function(methodName){
				it('should define ' + methodName, function(){
					var sut = exerciseCreateService();
					expect(sut,methodName).toBeDefined();
				});
			});
	});

});