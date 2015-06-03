define([
	'modules/saleAnalytics/reports/reportParamsDialog/ReportParamsDialogView',
	'modules/saleAnalytics/reports/reportParamsDialog/ReportParamsDialogPresenter'
], function (ReportParamsDialogView, ReportParamsDialogPresenter) {
	'use strict';

	describe('ReportParamsDialogView', function () {
		var sut, scope, presenter, modalInstance;

		beforeEach(function () {
			inject(function ($rootScope) {
				scope = $rootScope.$new();
			});
			modalInstance = {
				dismiss: function () {
				}
			};
			sinon.stub(modalInstance, 'dismiss');
			presenter = mock(ReportParamsDialogPresenter);
			sut = new ReportParamsDialogView(scope, modalInstance, presenter);
		});

		describe('construct', function () {
			beforeEach(function () {
				sinon.stub(ReportParamsDialogView.prototype, 'configureEvents');
			});
			afterEach(function () {
				ReportParamsDialogView.prototype.configureEvents.restore();
			});
			it("should call configureEvents", function () {
				new ReportParamsDialogView(scope, modalInstance, presenter);
				expect(ReportParamsDialogView.prototype.configureEvents).toHaveBeenCalled();
			});
		});

		describe("show", function () {
			it("should call show on presenter", function () {
				sut.show();
				expect(presenter.show).toHaveBeenCalled();
			});
		});

		describe('configureEvents', function () {
			describe('fn.close', function () {
				it("should dismiss the parameter dialog", function () {
					sut.fn.close();
					expect(modalInstance.dismiss).toHaveBeenCalled();
				});
			});
		});

	});
});