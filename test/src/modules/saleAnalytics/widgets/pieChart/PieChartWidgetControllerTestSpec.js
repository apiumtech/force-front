define([
	'modules/saleAnalytics/widgets/pieChart/PieChartWidgetController'
], function(PieChartWidgetController) {
	'use strict';

	describe('PieChartWidgetController', function() {

		it("should call PieChartWidgetController.configureView global method", function () {
			var scope = {someScope: true},
				element = {};

			PieChartWidgetController.configureView = jasmine.createSpy();
			var ctrl = new PieChartWidgetController(scope, element);
			expect(PieChartWidgetController.configureView).toHaveBeenCalledWith(scope, element);
		});
		
	});
});