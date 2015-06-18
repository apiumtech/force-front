define([
    'shared/services/ajax/CQRSUnwrapper',
], function (CQRSUnwrapper) {
    'use strict';

    function exerciseCreate() {
        return CQRSUnwrapper.newInstance();
    }

    describe('CQRSUnwrapper', function () {
        xit("should call onSuccess when promise is resolved correctly", function() {
            var sut = exerciseCreate();
            spyOn(sut, "onSuccess");
            sut.unwrap( exerciseFakeOkPromiseWithArg() );
            expect(sut.onSuccess).toHaveBeenCalled();
        });

        it("should resolve promise if CQRS result status is 'ack'", function () {
            var sut = exerciseCreate();
            sut.deferred = {
                resolve: jasmine.createSpy(),
                reject: jasmine.createSpy()
            };
            var res = {status:"ack"};
            sut.onSuccess(res);
            expect(sut.deferred.resolve).toHaveBeenCalledWith(res);
        });

        it("should reject promise if CQRS result status is 'nack'", function () {
            var sut = exerciseCreate();
            sut.deferred = {
                resolve: jasmine.createSpy(),
                reject: jasmine.createSpy()
            };
            var res = {status:"nack"};
            sut.onSuccess(res);
            expect(sut.deferred.reject).toHaveBeenCalledWith(res);
        });

    });

});