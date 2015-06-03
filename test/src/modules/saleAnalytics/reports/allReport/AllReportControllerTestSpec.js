define([
	'app',
	'modules/saleAnalytics/reports/allReport/AllReportView',
	'modules/saleAnalytics/reports/allReport/AllReportController'
], function (app, AllReportView, AllReportController) {
	'use strict';

	describe("AllReportController", function () {
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
				var ctrl = $controller('AllReportController', {$scope: scope});
				expect(ctrl).not.toBeNull();
				expect(ctrl).not.toBeUndefined();
			});
		});

		describe("construct", function () {
			beforeEach(inject(function () {
				sinon.stub(AllReportController, 'configureView');
			}));
			afterEach(function () {
				AllReportController.configureView.restore();
			});
			it("should call AllReportController.configureView global method", function () {
				new AllReportController(scope);
				expect(AllReportController.configureView).toHaveBeenCalledWith(scope);
			});
		});


		describe("configureView", function () {
			var view = mock(AllReportView);
			beforeEach(function () {
				sinon.stub(AllReportView, 'newInstance').returns(view);
			});
			afterEach(function () {
				AllReportView.newInstance.restore();
			});
			it("should create new instance of IntensityView", function () {
				AllReportController.configureView(scope);
				expect(AllReportView.newInstance).toHaveBeenCalled();
				expect(view.show).toHaveBeenCalled();
			});
		});
	});
});