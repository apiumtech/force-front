define([
	'modules/account/widgets/documents/documentUpload/DocumentUploadPresenter',
	'modules/account/widgets/documents/documentUpload/DocumentUploadModel',
	'modules/account/widgets/documents/documentUpload/DocumentUploadView'
], function(DocumentUploadPresenter, DocumentUploadModel, DocumentUploadView) {
	'use strict';

	describe('DocumentUploadPresenter', function() {

		var sut, model, view;

		beforeEach(function () {
			view = mock(DocumentUploadView);
			model = mock(DocumentUploadModel);
			sut = new DocumentUploadPresenter(model);
		});

		describe('show', function () {
			beforeEach(function () {
				sut.show(view);
			});

			describe('view.event.onUploadFile', function () {
				var file;
				beforeEach(function () {
					file = {'name': "file1"};
				});
				var exerciseTest = function(){
					view.event.onUploadFile(file);
				};
				it("should call upload method from model", function () {
					model.uploadFile.returns(exerciseFakeOkPromise());
					exerciseTest();
					expect(model.uploadFile).toHaveBeenCalledWith(file);
				});

				it("should call onUploadFileSuccess on view upon upload success", function () {
					model.uploadFile.returns(exerciseFakeOkPromise());
					exerciseTest();
					expect(view.onUploadFileSuccess).toHaveBeenCalled();
				});

				it("should call showError method on view upon upload failure", function () {
					model.uploadFile.returns(exerciseFakeKoPromise());
					exerciseTest();
					expect(view.onUploadFileError).toHaveBeenCalled();
				});

			});

		});
		
	});
});