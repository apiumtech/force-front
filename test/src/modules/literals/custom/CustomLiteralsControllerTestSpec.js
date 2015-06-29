define([
	'modules/literals/custom/CustomLiteralsController',
	'modules/literals/custom/CustomLiteralsView'
], function(CustomLiteralsController, CustomLiteralsView) {
	'use strict';

	describe('CustomLiteralsController', function() {
		it("should call configureView method", function () {
			var scope = {someScope: true};
			spyOn(CustomLiteralsController,"configureView");
			var ctrl = new CustomLiteralsController(scope);
			expect(CustomLiteralsController.configureView).toHaveBeenCalledWith(scope);
		});
        it("should view's show method", function () {
			var mockView = {show:jasmine.createSpy()};
			spyOn(CustomLiteralsView,"newInstance").and.returnValue(mockView);
			CustomLiteralsController.configureView({});
			expect(mockView.show).toHaveBeenCalled();
		});
	});
});