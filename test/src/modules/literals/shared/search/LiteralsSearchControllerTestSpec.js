define([
	'modules/literals/shared/search/LiteralsSearchController'
], function(LiteralsSearchController) {
	'use strict';

	describe('LiteralsSearchController', function() {
		it("should call configureView method", function () {
			var scope = {someScope:"some scope"};

			LiteralsSearchController.configureView = jasmine.createSpy();
			var ctrl = new LiteralsSearchController(scope);
			expect(LiteralsSearchController.configureView).toHaveBeenCalledWith(scope);
		});

	});
});