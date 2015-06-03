define([
	'modules/saleAnalytics/reports/previewDialog/PreviewDialogPresenter',
	'modules/saleAnalytics/reports/previewDialog/PreviewDialogModel',
	'modules/saleAnalytics/reports/previewDialog/PreviewDialogView'
], function(PreviewDialogPresenter, PreviewDialogModel, PreviewDialogView) {
	'use strict';

	describe('PreviewDialogPresenter', function() {

		var sut, model, view;

		beforeEach(function () {
			model = mock(PreviewDialogModel);
			view = mock(PreviewDialogView);
			sut = new PreviewDialogPresenter(model);
		});

		describe('show', function () {
			beforeEach(function () {
				sut.show(view);
			});

			describe('view.event.toggleFavourite', function () {
				it('should call toggleFavourite method from the model', function () {
					var reportId = '123';
					view.event.toggleFavouriteReport(reportId);
					expect(model.toggleFavouriteReport).toHaveBeenCalledWith(reportId);
				});
			});

			describe('view.event.getReportURL', function () {
				it("should call getReportURL from model", function () {
					var report = {};
					var callback = sinon.stub();
					view.event.getReportURL(report, callback);
					expect(model.getReportURL).toHaveBeenCalledWith(report, callback);
				});
			});

		});
		
	});
});