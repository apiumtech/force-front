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

			[
				{method: 'onLoadingPreviewImage', modelMethod: 'loadPreviewImage', onSuccess: 'onPreviewImageLoaded', onError: 'showError'},
				{method: 'toggleFavouriteReport', modelMethod: 'toggleFavouriteReport', onSuccess: 'onToggledFavouriteReport', onError: 'showError'}
			].forEach(function(testCase){
					describe('view.event.' + testCase.method, function () {
						exerciseAjaxCallBinding(testCase.method, testCase.modelMethod, testCase.onSuccess, testCase.onError);
					});

				});

			describe('view.event.getReportURL', function () {
				it("should call getReportURL from model", function () {
					var report = {};
					var callback = jasmine.createSpy();
					var errorCallback = jasmine.createSpy();


                    spyOn(sut.model, "getReportURL").and.returnValue(
                        exerciseFakePromise()
                    );

					view.event.getReportURL(report, callback, errorCallback);
					expect(model.getReportURL).toHaveBeenCalledWith(report);
				});
			});

		});

		function exerciseAjaxCallBinding(viewEvent, modelMethod, onSuccess, onError) {
			beforeEach(function () {
				view[onSuccess] = jasmine.createSpy();
				view[onError] = jasmine.createSpy();
			});
			it("presenter should connect event to '" + modelMethod + "' method on $model", function () {
				spyOn(model, modelMethod).and.returnValue(exerciseFakePromise());
				view.event[viewEvent]();
				expect(model[modelMethod]).toHaveBeenCalled();
			});

			it("should call method '" + onSuccess + "' on $view if $model '" + modelMethod + "' return success", function () {
				spyOn(model, modelMethod).and.returnValue(exerciseFakeOkPromise());
				view.event[viewEvent]();
				expect(view[onSuccess]).toHaveBeenCalled();
			});

			it("should call method '" + onError + "' on $view if $model '" + modelMethod + "' return error", function () {
				spyOn(model, modelMethod).and.returnValue(exerciseFakeKoPromise());
				view.event[viewEvent]();
				expect(view[onError]).toHaveBeenCalled();
			});
		}
		
	});
});