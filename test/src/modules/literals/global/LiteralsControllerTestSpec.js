define([
	'modules/literals/global/LiteralsController'
], function(LiteralsController) {
	'use strict';

	describe('LiteralsController', function() {
		it("should call configureView method", function () {
			var scope = {someScope:"some scope"};

			LiteralsController.configureView = jasmine.createSpy();
			var ctrl = new LiteralsController(scope);
			expect(LiteralsController.configureView).toHaveBeenCalledWith(scope);
		});
	});

});