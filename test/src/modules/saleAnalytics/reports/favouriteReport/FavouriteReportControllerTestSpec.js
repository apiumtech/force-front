define([
	'app',
	'modules/saleAnalytics/reports/favouriteReport/FavouriteReportView',
	'modules/saleAnalytics/reports/favouriteReport/FavouriteReportController'
], function (app, FavouriteReportView, FavouriteReportController) {
	'use strict';

	describe("FavouriteReportController", function () {
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
				var ctrl = $controller('FavouriteReportController', {$scope: scope});
				expect(ctrl).not.toBeNull();
				expect(ctrl).not.toBeUndefined();
			});
		});

		describe("construct", function () {
			beforeEach(inject(function () {
				sinon.stub(FavouriteReportController, 'configureView');
			}));
			afterEach(function () {
				FavouriteReportController.configureView.restore();
			});
			it("should call FavouriteReportController.configureView global method", function () {
				new FavouriteReportController(scope);
				expect(FavouriteReportController.configureView).toHaveBeenCalledWith(scope);
			});
		});


		describe("configureView", function () {
			var view = mock(FavouriteReportView);
			beforeEach(function () {
				sinon.stub(FavouriteReportView, 'newInstance').returns(view);
			});
			afterEach(function () {
				FavouriteReportView.newInstance.restore();
			});
			it("should create new instance of IntensityView", function () {
				FavouriteReportController.configureView(scope);
				expect(FavouriteReportView.newInstance).toHaveBeenCalled();
				expect(view.show).toHaveBeenCalled();
			});
		});
	});
});