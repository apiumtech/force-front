define([
	'app',
	'modules/saleAnalytics/reports/reportParamsDialog/ReportParamsDialogView',
	'modules/saleAnalytics/reports/reportParamsDialog/ReportParamsDialogController'
], function (app, ReportParamsDialogView, ReportParamsDialogController) {
	'use strict';

	describe("ReportParamsDialogController", function () {
		var appName = app.name;
		beforeEach(module(appName));

		var $controller;
		var scope, report, $modalInstance;

		beforeEach(inject(function (_$controller_, _$rootScope_) {
			$controller = _$controller_;
			scope = _$rootScope_.$new();
			report = {};
			$modalInstance = {};
		}));
		describe("loading asynchronously", function () {

			beforeEach(inject(function () {
				sinon.stub(ReportParamsDialogController, 'configureView');
			}));
			afterEach(function () {
				ReportParamsDialogController.configureView.restore();
			});
			it("should register the controller to app", function () {
				var ctrl = $controller('ReportParamsDialogController', {
					$scope: scope,
					$modalInstance: $modalInstance,
					report: report
				});
				expect(ctrl).not.toBeNull();
				expect(ctrl).not.toBeUndefined();
			});
		});

		describe("construct", function () {

			beforeEach(inject(function () {
				sinon.stub(ReportParamsDialogController, 'configureView');
			}));
			afterEach(function () {
				ReportParamsDialogController.configureView.restore();
			});
			it("should call ReportParamsDialogController.configureView global method", function () {
				new ReportParamsDialogController(scope, $modalInstance, report);
				expect(scope.report).toEqual(report);
				expect(ReportParamsDialogController.configureView).toHaveBeenCalledWith(scope, $modalInstance);
			});
		});


		describe("configureView", function () {
			var view = mock(ReportParamsDialogView);
			beforeEach(function () {
				sinon.stub(ReportParamsDialogView, 'newInstance').returns(view);
			});
			afterEach(function () {
				ReportParamsDialogView.newInstance.restore();
			});
			it("should create new instance of IntensityView", function () {
				ReportParamsDialogController.configureView(scope, $modalInstance);
				expect(ReportParamsDialogView.newInstance).toHaveBeenCalledWith(scope, $modalInstance);
				expect(view.show).toHaveBeenCalled();
			});
		});
	});
});