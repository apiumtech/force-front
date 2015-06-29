define([
	'modules/literals/shared/search/LiteralsSearchController',
	'modules/literals/shared/search/LiteralsSearchView'
], function(LiteralsSearchController, LiteralsSearchView) {
	'use strict';

	describe('LiteralsSearchController', function() {

        it("should call configureView method on instantiation", function () {
			var scope = {scope:"some scope"};
			spyOn(LiteralsSearchController, "configureView");
			new LiteralsSearchController(scope);
			expect(LiteralsSearchController.configureView).toHaveBeenCalledWith(scope);
		});

        it("should call view's show method on instantiation", function(){
            var mockView = {
                show: jasmine.createSpy()
            };
            spyOn(LiteralsSearchView, "newInstance").and.returnValue(mockView);
            new LiteralsSearchController({scope:"the scope"});
            expect(mockView.show).toHaveBeenCalled();
        });
	});
});