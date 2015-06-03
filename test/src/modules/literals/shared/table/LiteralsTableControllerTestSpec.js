define([
	'modules/literals/shared/table/LiteralsTableController'
], function(LiteralsTableController) {
	'use strict';

	describe('LiteralsTableController', function() {
		it("should call configureView method", function () {
			var scope = {someScope:"some scope"};
			var compile = {someCompile:"some compile"};

            LiteralsTableController.configureView = jasmine.createSpy();
			var ctrl = new LiteralsTableController(scope, compile);
			expect(LiteralsTableController.configureView).toHaveBeenCalledWith(scope, compile);
		});

	});
});