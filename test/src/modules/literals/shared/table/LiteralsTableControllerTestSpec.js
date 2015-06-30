define([
	'modules/literals/shared/table/LiteralsTableController',
	'modules/literals/shared/table/LiteralsTableView'
], function(LiteralsTableController, LiteralsTableView) {
	'use strict';

	describe('LiteralsTableController', function() {
		it("should call configureView method", function () {
			var scope = {someScope:"some scope"};
			var compile = {someCompile:"some compile"};

            spyOn(LiteralsTableController, "configureView");
			var ctrl = new LiteralsTableController(scope, compile);
			expect(LiteralsTableController.configureView).toHaveBeenCalledWith(scope, compile);
		});

        it("should call view's show method on instantiation", function(){
            var mockView = {
                show: jasmine.createSpy()
            };
            spyOn(LiteralsTableView, "newInstance").and.returnValue(mockView);
            LiteralsTableController.configureView();
            expect(mockView.show).toHaveBeenCalled();
        });
	});
});