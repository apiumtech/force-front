/**
 * Created by justin on 4/16/15.
 */
define([
    'modules/account/widgets/documents/DocumentsWidgetPresenter'
], function (DocumentsWidgetPresenter) {

    'use strict';

    describe("DocumentsWidgetPresenter", function () {

        var sut, view, model;

        beforeEach(function () {
            sut = DocumentsWidgetPresenter.newInstance();
            view = {event: {}};
            model = {};
        });

        describe("show()", function () {
            [
                {
                    viewEvent: "onLoadDocument",
                    modelMethod: "loadDocumentsData",
                    onSuccess: "onDocumentsLoaded",
                    onError: "showError"
                },
                {
                    viewEvent: "onSaveDocument",
                    modelMethod: "updateDocument",
                    onSuccess: "onDocumentUpdated",
                    onError: "showError"
                },
                {
                    viewEvent: "onDeletionConfirmed",
                    modelMethod: "deleteDocument",
                    onSuccess: "onDocumentDeleted",
                    onError: "showError"
                }
            ].forEach(function (testCase) {
                    var viewEvent = testCase.viewEvent;
                    var modelMethod = testCase.modelMethod;
                    var onSuccess = testCase.onSuccess;
                    var onError = testCase.onError;

                    describe("when event '" + viewEvent + "' fired", function () {
                        beforeEach(function () {
                            sut.show(view, model);
                            model[modelMethod] = function () {
                            };
                            view[onSuccess] = jasmine.createSpy();
                            view[onError] = jasmine.createSpy();
                        });
                        exerciseAjaxCallBinding(viewEvent, modelMethod, onSuccess, onError);
                    });
                });

            function exerciseAjaxCallBinding(viewEvent, modelMethod, onSuccess, onError) {
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
})