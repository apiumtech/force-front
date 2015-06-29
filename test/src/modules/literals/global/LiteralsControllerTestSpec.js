define([
	'modules/literals/global/LiteralsController',
	'modules/literals/global/LiteralsView'
], function(LiteralsController, LiteralsView) {
	'use strict';

	describe('LiteralsController', function() {

        it("should call configureView method", function () {
			var scope = {someScope:"some scope"};
			spyOn(LiteralsController, "configureView");
			var ctrl = new LiteralsController(scope);
			expect(LiteralsController.configureView).toHaveBeenCalledWith(scope);
		});

        it("should view's show method", function () {
            var mockView = {show:jasmine.createSpy()};
            spyOn(LiteralsView,"newInstance").and.returnValue(mockView);

            LiteralsController.configureView({});
            expect(mockView.show).toHaveBeenCalled();
        });

	});

});