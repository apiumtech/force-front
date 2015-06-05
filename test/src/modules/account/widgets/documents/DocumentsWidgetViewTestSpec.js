/**
 * Created by justin on 4/15/15.
 */
define([
    'modules/account/widgets/documents/DocumentsWidgetView',
    'modules/account/widgets/documents/DocumentsWidgetPresenter',
    'modules/account/widgets/documents/DocumentsWidgetModel'
], function (DocumentsWidgetView, DocumentsWidgetPresenter, DocumentsWidgetModel) {

    'use strict';

    describe("DocumentsWidgetView", function () {

        var sut, $scope, model, presenter, modalDialogService;

        beforeEach(function () {
            $scope = mockAngularScope();

            model = mock(DocumentsWidgetModel);
            presenter = mock(DocumentsWidgetPresenter);

            modalDialogService = {
                confirm: function () {
                }
            };

            sut = new DocumentsWidgetView($scope, model, presenter, modalDialogService);
        });

        describe("baseview inheritance", function () {
            it("should call presenter's show method on show()", function () {
                var view = new DocumentsWidgetView($scope, model, presenter);
                view.show();
                expect(view.presenter.show).toHaveBeenCalledWith(view, model);
            });

            it("should call presenter's showError method on showError()", function () {
                var view = new DocumentsWidgetView($scope, model, presenter);
                view.showError("some error");
                expect(view.presenter.showError).toHaveBeenCalledWith("some error");
            });
        });

        describe("onAccountIdChanged", function () {
            beforeEach(function () {
                spyOn(sut.eventChannel, 'sendReloadCommand');
            });

            describe("accountId is undefined", function () {
                it("should not fire onReloadCommandReceived event", function () {
                    sut.$scope.accountId = null;
                    sut.onAccountIdChanged();
                    expect(sut.eventChannel.sendReloadCommand).not.toHaveBeenCalled();
                });
            });

            describe("account id has value", function () {
                it("should fire onReloadCommandReceived event", function () {
                    sut.$scope.accountId = 10;
                    sut.onAccountIdChanged();
                    expect(sut.eventChannel.sendReloadCommand).toHaveBeenCalled();
                });
            });
        });

        describe("onReloadCommandReceived", function () {
            it("should fire event onLoadDocument", function () {
                sut.event.onLoadDocument = jasmine.createSpy();
                sut.onReloadCommandReceived();
                expect(sut.event.onLoadDocument).toHaveBeenCalledWith(sut.$scope.accountId);
            })
        });

        describe("onDocumentsLoaded", function () {
            var outputData;
            beforeEach(function () {
                outputData = [{
                    id: 1
                }];
                spyOn(sut.eventChannel, 'sendReloadCompleteCommand');
            });

            it("should fire event 'sendReloadCompleteCommand' from channel", function () {
                sut.onDocumentsLoaded(outputData);
                expect(sut.eventChannel.sendReloadCompleteCommand).toHaveBeenCalled();
            });

            it("should assign outputData", function () {
                sut.onDocumentsLoaded(outputData);
                expect(sut.data.documentsList).toEqual([{
                    id: 1,
                    editing: false
                }]);
            });
        });
    });
});