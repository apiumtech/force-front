/**
 * Created by Justin on 3/19/2015.
 */
define([
    'shared/components/confirmationDialog/ConfirmationDialogView'
], function (ConfirmationDialogView) {
    'use strict';
    describe("ConfirmationDialogView", function () {

        var sut, scope, modalInstance;

        beforeEach(function () {
            scope = {thisIsFake: true};
            modalInstance = {
                close: function () {
                },
                dismiss: function () {
                }
            }
        });

        describe("construct()", function () {
            it("should assign modalInstance", function () {
                sut = ConfirmationDialogView.newInstance(scope, modalInstance, false, false);
                expect(sut.modalInstance).toEqual(modalInstance);
            });
        });

        describe("show()", function () {
            it("should call configureEvents()", function () {
                sut = new ConfirmationDialogView(scope, modalInstance);
                spyOn(sut, 'configureEvents');
                sut.show();
                expect(sut.configureEvents).toHaveBeenCalled();
            });
        });

        describe("configureEvents", function () {
            beforeEach(function () {
                sut = new ConfirmationDialogView(scope, modalInstance);
                sut.show();
            });

            describe("clicking cancel button", function () {
                it("should call dismiss on modalInstance", function () {
                    spyOn(modalInstance, 'dismiss');
                    sut.fn.cancelBtnClicked();
                    expect(modalInstance.dismiss).toHaveBeenCalled();
                });
            });

            describe("clicking ok button", function () {
                it("should call close on modalInstance with true", function () {
                    spyOn(modalInstance, 'close');
                    sut.fn.okBtnClicked();
                    expect(modalInstance.close).toHaveBeenCalledWith(true);
                });
            });
        });
    });

});