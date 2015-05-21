/**
 * Created by justin on 3/19/15.
 */
define([
    'shared/components/confirmationDialog/ConfirmationDialogController'
], function (ConfirmationDialogController) {
    'use strict';
    describe("ConfirmationDialogController", function () {

        var sut;
        var scope = {thisIsFakeScope: true},
            $modalInstance = {},
            title = 'fake title',
            message = 'fake message',
            okButtonTitle = 'ok',
            cancelButtonTitle = 'cancel';

        function exerciseConstruct() {
            ConfirmationDialogController.configureView = jasmine.createSpy();

            sut = new ConfirmationDialogController(scope, $modalInstance, title, message, okButtonTitle, cancelButtonTitle);
        }

        it("should assign modalTitle to scope for later use in View", function () {
            exerciseConstruct();
            expect(scope.modalTitle).toEqual(title);
        });
        it("should assign modalMessage to scope for later use in View", function () {
            exerciseConstruct();
            expect(scope.modalMessage).toEqual(message);
        });
        it("should assign okButtonTitle to scope for later use in View", function () {
            exerciseConstruct();
            expect(scope.okButtonTitle).toEqual(okButtonTitle);
        });
        it("should assign cancelButtonTitle to scope for later use in View", function () {
            exerciseConstruct();
            expect(scope.cancelButtonTitle).toEqual(cancelButtonTitle);
        });

        it("should call configureView with correct params", function () {
            exerciseConstruct();
            expect(ConfirmationDialogController.configureView).toHaveBeenCalledWith(scope, $modalInstance);
        });
    });

});