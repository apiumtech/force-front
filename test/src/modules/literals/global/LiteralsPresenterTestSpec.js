define([
    'modules/literals/global/LiteralsPresenter',
    'modules/literals/shared/LiteralsEventBus',
    'modules/literals/shared/BaseLiteralsPresenter'
], function (LiteralsPresenter, LiteralsEventBus, BaseLiteralsPresenter) {
    'use strict';

    function exerciseCreatePresenter() {
        var mockEventBus = mock(LiteralsEventBus);
        return LiteralsPresenter.newInstance(mockEventBus);
    }

    describe('LiteralsPresenter', function () {
        it('should extend BaseLiteralsPresenter', function () {
            var sut = exerciseCreatePresenter();
            expect(sut).toEqual(jasmine.any(BaseLiteralsPresenter));
        });
    });
});