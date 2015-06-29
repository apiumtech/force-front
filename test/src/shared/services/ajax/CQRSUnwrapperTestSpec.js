define([
    'shared/services/ajax/CQRSUnwrapper',
    'q'
], function (CQRSUnwrapper, Q) {
    'use strict';

    describe('CQRSUnwrapper', function () {

        var sut;

        function revealSut(decorateSut){
            decorateSut = decorateSut || function(){
                    sut = new CQRSUnwrapper();
                    return sut;
                };
            spyOn(CQRSUnwrapper, "$newInstance").and.returnValue(
                decorateSut()
            );
        }

        function spyOnDeferredSutDecorator(){
            sut = new CQRSUnwrapper();
            spyOn(sut.deferred, "resolve");
            spyOn(sut.deferred, "reject");
            return sut;
        }

        it("should call onSuccess when promise is resolved correctly", function() {
            revealSut();
            spyOn(CQRSUnwrapper.prototype, "onSuccess");
            CQRSUnwrapper.unwrap( exerciseFakeOkPromiseWithArg("ok") );
            expect(sut.onSuccess).toHaveBeenCalledWith("ok");
        });

        it("should reject when promise is not resolved correctly", function() {
            revealSut(spyOnDeferredSutDecorator);
            CQRSUnwrapper.unwrap( exerciseFakeKoPromiseWithArg("err") );
            expect(sut.deferred.reject).toHaveBeenCalledWith("err");
        });

        it("should resolve promise if CQRS result status is 'ack'", function () {
            revealSut(spyOnDeferredSutDecorator);
            var res = {status:"ack"};
            sut.onSuccess(res);
            expect(sut.deferred.resolve).toHaveBeenCalledWith(res);
        });

        it("should reject promise if CQRS result status is 'nack'", function () {
            revealSut(spyOnDeferredSutDecorator);
            var res = {status:"nack"};
            sut.onSuccess(res);
            expect(sut.deferred.reject).toHaveBeenCalledWith(res);
        });

        it('should return a new instance on newInstance', function () {
            expect(CQRSUnwrapper.$newInstance()).toEqual(jasmine.any(CQRSUnwrapper));
        })

    });

});