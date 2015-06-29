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
        it('should call BaseLiteralsPresenter.show method on show', function () {
            var sut = exerciseCreatePresenter();
            spyOn(BaseLiteralsPresenter.prototype, "show");
            var view = {};
            var model = {};
            sut.show(view, model);
            expect(sut.__base__.show).toHaveBeenCalledWith(view, model);
        });
    });
});