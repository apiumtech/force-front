define([
    'modules/literals/custom/CustomLiteralsPresenter',
    'modules/literals/shared/LiteralsEventBus',
    'modules/literals/shared/BaseLiteralsPresenter'
], function (CustomLiteralsPresenter, LiteralsEventBus, BaseLiteralsPresenter) {
    'use strict';

    function exerciseCreatePresenter() {
        var mockEventBus = mock(LiteralsEventBus);
        return CustomLiteralsPresenter.newInstance(mockEventBus);
    }

    describe('CustomLiteralsPresenter', function () {
        it('should extend BaseLiteralsPresenter', function () {
            var sut = exerciseCreatePresenter();
            expect(sut).toEqual(jasmine.any(BaseLiteralsPresenter));
        });

        it("should call model's setUserImplementationCode on onInit", function () {
            var sut = exerciseCreatePresenter();
            sut.show(
                {
                    event: {},
                    onLiteralsRequestSuccess: function () {}
                },
                {
                    setUserImplementationCode: jasmine.createSpy()
                }
            );
            sut.onInit();
            expect(sut.model.setUserImplementationCode).toHaveBeenCalled();
        })
    });
});