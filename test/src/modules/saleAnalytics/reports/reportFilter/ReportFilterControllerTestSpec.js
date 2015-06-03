define([
	'app',
	'modules/saleAnalytics/reports/reportFilter/ReportFilterView',
	'modules/saleAnalytics/reports/reportFilter/ReportFilterController'
], function (app, ReportFilterView, ReportFilterController) {
	'use strict';

	describe("ReportFilterController", function () {
		var appName = app.name;
		beforeEach(module(appName));

		var $controller;
		var scope;

		beforeEach(inject(function (_$controller_, _$rootScope_) {
			$controller = _$controller_;
			scope = _$rootScope_.$new();
		}));

		describe("loading asynchronously", function () {
			it("should register the controller to app", function () {
				var ctrl = $controller('ReportFilterController', {$scope: scope});
				expect(ctrl).not.toBeNull();
				expect(ctrl).not.toBeUndefined();
			});
		});

		describe("construct", function () {
			beforeEach(inject(function () {
				sinon.stub(ReportFilterController, 'configureView');
			}));
			afterEach(function () {
				ReportFilterController.configureView.restore();
			});
			it("should call ReportFilterController.configureView global method", function () {
				new ReportFilterController(scope);
				expect(ReportFilterController.configureView).toHaveBeenCalledWith(scope);
			});
		});


		describe("configureView", function () {
			var view = mock(ReportFilterView);
			beforeEach(function () {
				sinon.stub(ReportFilterView, 'newInstance').returns(view);
			});
			afterEach(function () {
				ReportFilterView.newInstance.restore();
			});
			it("should create new instance of IntensityView", function () {
				ReportFilterController.configureView(scope);
				expect(ReportFilterView.newInstance).toHaveBeenCalled();
				expect(view.show).toHaveBeenCalled();
			});
		});
	});
});