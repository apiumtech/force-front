define([
	'app',
	'modules/account/widgets/analytic/AnalyticWidgetView',
	'modules/account/widgets/analytic/AnalyticWidgetController',
	'angular'
], function (app, AnalyticWidgetView, AnalyticWidgetController, angular) {
	'use strict';

	describe("AnalyticWidgetController", function () {
		var appName = app.name;
		beforeEach(module(appName));

		var $controller;
		var scope, element;

		beforeEach(inject(function (_$controller_, _$rootScope_) {
			$controller = _$controller_;
			scope = _$rootScope_.$new();
			element = angular.element('<div />');
		}));

		describe("loading asynchronously", function () {
			it("should register the controller to app", function () {
				var ctrl = $controller('AnalyticWidgetController', {$scope: scope, $element: element});
				expect(ctrl).not.toBeNull();
				expect(ctrl).not.toBeUndefined();
			});
		});

		describe("construct", function () {
			beforeEach(function () {
				sinon.stub(AnalyticWidgetController, 'configureView');
			});
			afterEach(function () {
				AnalyticWidgetController.configureView.restore();
			});
			it("should call AnalyticWidgetController.configureView global method", function () {
				new AnalyticWidgetController(scope, element);
				expect(AnalyticWidgetController.configureView).toHaveBeenCalledWith(scope, element);
			});
		});


		describe("configureView", function () {
			var view = mock(AnalyticWidgetView);
			beforeEach(function () {
				sinon.stub(AnalyticWidgetView, 'newInstance').returns(view);
			});
			afterEach(function () {
				AnalyticWidgetView.newInstance.restore();
			});
			it("should create new instance of AnalyticWidgetView", function () {
				AnalyticWidgetController.configureView(scope, element);
				expect(AnalyticWidgetView.newInstance).toHaveBeenCalled();
				expect(view.show).toHaveBeenCalled();
			});
		});
	});
});