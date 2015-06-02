define([
	'app',
	'modules/saleAnalytics/widgets/pieChart/PieChartWidgetView',
	'modules/saleAnalytics/widgets/pieChart/PieChartWidgetController',
	'angular'
], function (app, PieChartWidgetView, PieChartWidgetController, angular) {
	'use strict';

	describe("PieChartWidgetController", function () {
		var appName = app.name;
		beforeEach(module(appName));

		var $controller;
		var scope, element;

		beforeEach(inject(function (_$controller_, _$rootScope_) {
			$controller = _$controller_;
			scope = _$rootScope_.$new();
			element = angular.element("<div />");
		}));

		describe("construct", function () {
			beforeEach(inject(function () {
				sinon.stub(PieChartWidgetController, 'configureView');
			}));
			afterEach(function () {
				PieChartWidgetController.configureView.restore();
			});
			it("should call PieChartWidgetController.configureView global method", function () {
				new PieChartWidgetController(scope, element);
				expect(PieChartWidgetController.configureView).toHaveBeenCalledWith(scope, element);
			});
		});


		describe("configureView", function () {
			var view = mock(PieChartWidgetView);
			beforeEach(function () {
				sinon.stub(PieChartWidgetView, 'newInstance').returns(view);
			});
			afterEach(function () {
				PieChartWidgetView.newInstance.restore();
			});
			it("should create new instance of IntensityView", function () {
				PieChartWidgetController.configureView(scope, element);
				expect(PieChartWidgetView.newInstance).toHaveBeenCalled();
				expect(view.show).toHaveBeenCalled();
			});
		});
	});
});