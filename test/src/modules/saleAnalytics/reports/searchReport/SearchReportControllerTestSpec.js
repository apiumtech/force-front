define([
	'app',
	'modules/saleAnalytics/reports/searchReport/SearchReportView',
	'modules/saleAnalytics/reports/searchReport/SearchReportController'
], function (app, SearchReportView, SearchReportController) {
	'use strict';

	describe("SearchReportController", function () {
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
				var ctrl = $controller('SearchReportController', {$scope: scope});
				expect(ctrl).not.toBeNull();
				expect(ctrl).not.toBeUndefined();
			});
		});

		describe("construct", function () {
			beforeEach(inject(function () {
				sinon.stub(SearchReportController, 'configureView');
			}));
			afterEach(function () {
				SearchReportController.configureView.restore();
			});
			it("should call SearchReportController.configureView global method", function () {
				new SearchReportController(scope);
				expect(SearchReportController.configureView).toHaveBeenCalledWith(scope);
			});
		});


		describe("configureView", function () {
			var view = mock(SearchReportView);
			beforeEach(function () {
				sinon.stub(SearchReportView, 'newInstance').returns(view);
			});
			afterEach(function () {
				SearchReportView.newInstance.restore();
			});
			it("should create new instance of IntensityView", function () {
				SearchReportController.configureView(scope);
				expect(SearchReportView.newInstance).toHaveBeenCalled();
				expect(view.show).toHaveBeenCalled();
			});
		});
	});
});