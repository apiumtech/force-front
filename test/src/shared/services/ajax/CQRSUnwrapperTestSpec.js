define([
    'shared/services/ajax/CQRSUnwrapper',
], function (CQRSUnwrapper) {
    'use strict';

    function exerciseCreate() {
        return CQRSUnwrapper.newInstance();
    }

    describe('CQRSUnwrapper', function (done) {
        it("should resolve promise if CQRS result status is 'ack'", function () {
            var sut = exerciseCreate();
            spyOn(sut, "onSuccess");
            sut.unwrap( exerciseFakeOkPromiseWithArg({status: "ack"}) );
            expect(sut.onSuccess).toHaveBeenCalled();
        });
    });

});