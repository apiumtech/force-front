define([
	'modules/literals/custom/CustomLiteralsController'
], function(CustomLiteralsController) {
	'use strict';

	describe('CustomLiteralsController', function() {
		it("should call configureView method", function () {
			var scope = {someScope: true};

			CustomLiteralsController.configureView = jasmine.createSpy();
			var ctrl = new CustomLiteralsController(scope);
			expect(CustomLiteralsController.configureView).toHaveBeenCalledWith(scope);
		});

	});
});