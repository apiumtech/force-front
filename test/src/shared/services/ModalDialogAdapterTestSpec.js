/**
 * Created by Justin on 3/19/2015.
 */
define([
    'shared/services/ModalDialogAdapter'
], function (ModalDialogAdapter) {
    'use strict';
    describe("ModalDialogAdapter", function () {

        var sut, modalService;

        describe("get newInstance", function () {
            it("should throw error if modal service is null", function () {
                expect(function () {
                    ModalDialogAdapter.newInstance();
                }).toThrow(new Error("modalService cannot be null"));
            });
        });

        describe("testSuite", function () {
            var callbackObj = {
                submitCallbackStub: function () {

                },

                dismissCallbackStub: function () {
                }
            };
            beforeEach(function () {
                modalService = {
                    open: function () {
                        return {result: exerciseFakePromise()};
                    }
                };
                sut = ModalDialogAdapter.newInstance(modalService);
            });

            describe("createDialog", function () {
                it("should call open method on the service", function () {
                    spyOn(modalService, 'open').and.returnValue({
                        result: exerciseFakePromise()
                    });

                    sut.createDialog('', '', '', {}, callbackObj.submitCallbackStub, callbackObj.dismissCallbackStub);
                    expect(modalService.open).toHaveBeenCalled();
                });

                it("should call submitCallback when submit event fired", function () {
                    spyOn(modalService, 'open').and.returnValue({
                        result: exerciseFakeOkPromise()
                    });
                    spyOn(callbackObj, 'submitCallbackStub');
                    sut.createDialog('', '', '', {}, callbackObj.submitCallbackStub, callbackObj.dismissCallbackStub);
                    expect(callbackObj.submitCallbackStub).toHaveBeenCalled();
                });

                it("should call dismiss callback when close event fired", function () {
                    spyOn(modalService, 'open').and.returnValue({
                        result: exerciseFakeKoPromise()
                    });
                    spyOn(callbackObj, 'dismissCallbackStub');
                    sut.createDialog('', '', '', {}, callbackObj.submitCallbackStub, callbackObj.dismissCallbackStub);
                    expect(callbackObj.dismissCallbackStub).toHaveBeenCalled();
                });
            });

            describe("confirm", function () {
                it("should call open method on the service", function () {
                    spyOn(modalService, 'open').and.returnValue({
                        result: exerciseFakePromise()
                    });

                    sut.confirm('', '', callbackObj.submitCallbackStub, callbackObj.dismissCallbackStub);
                    expect(modalService.open).toHaveBeenCalled();
                });

                it("should call submitCallback when submit event fired", function () {
                    spyOn(modalService, 'open').and.returnValue({
                        result: {
                            then: function(a,b){
                                a(true);
                            }
                        }
                    });
                    spyOn(callbackObj, 'submitCallbackStub');
                    sut.confirm('', '', callbackObj.submitCallbackStub, callbackObj.dismissCallbackStub);
                    expect(callbackObj.submitCallbackStub).toHaveBeenCalled();
                });

                it("should call dismiss callback when close event fired", function () {
                    spyOn(modalService, 'open').and.returnValue({
                        result: exerciseFakeKoPromise()
                    });
                    spyOn(callbackObj, 'dismissCallbackStub');
                    sut.confirm('', '', callbackObj.submitCallbackStub, callbackObj.dismissCallbackStub);
                    expect(callbackObj.dismissCallbackStub).toHaveBeenCalled();
                });
            });
        });
    });
});