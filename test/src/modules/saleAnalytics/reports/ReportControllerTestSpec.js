define([
	'app',
	'modules/saleAnalytics/reports/ReportView'
], function (app, ReportView) {
	'use strict';

	describe("ReportController", function () {
		var ReportController;
		describe("loading asynchronously", function () {
			beforeEach(function (done) {
				sinon.stub(app.register, 'controller');

				require(['modules/saleAnalytics/reports/ReportController'], function (DC) {
					ReportController = DC;
					done();
				});
			});
			afterEach(function () {
				app.register.controller.restore();
			});
			it("should register the controller to app", function () {
				expect(app.register.controller).toHaveBeenCalledWith('ReportController', ['$scope', ReportController]);
			});
		});


		var scope;
		beforeEach(inject(function (_$rootScope_) {
			scope = _$rootScope_.$new();
		}));
		describe("construct", function () {
			var scope;
			beforeEach(inject(function () {
				sinon.stub(ReportController, 'configureView');
			}));
			afterEach(function () {
				ReportController.configureView.restore();
			});
			it("should call ReportController.configureView global method", function () {
				new ReportController(scope);
				expect(ReportController.configureView).toHaveBeenCalledWith(scope);
			});
		});


		describe("configureView", function () {
			var view = mock(ReportView);
			beforeEach(function () {
				sinon.stub(ReportView, 'newInstance').returns(view);
			});
			afterEach(function () {
				ReportView.newInstance.restore();
			});
			it("should create new instance of ReportView", function () {
				ReportController.configureView(scope);
				expect(ReportView.newInstance).toHaveBeenCalled();
				expect(view.show).toHaveBeenCalled();
			});
		});
	});
});