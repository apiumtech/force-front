define([
    'modules/literals/global/LiteralsView',
    'modules/literals/shared/BaseLiteralsView'
], function (LiteralsView, BaseLiteralsView) {
    'use strict';

    function exerciseCreateView() {
        return LiteralsView.newInstance({
            scope: mockAngularScope(),
            viewRepAspect: false, logErrorAspect: false
        });
    }

    describe('LiteralsView', function () {
        it("should instantiate LiteralsView on newInstance", function () {
            var sut = exerciseCreateView();
            expect(sut).toEqual(jasmine.any(LiteralsView));
        });
        it("should subclass BaseLiteralsView on newInstance", function () {
            var sut = exerciseCreateView();
            expect(sut).toEqual(jasmine.any(BaseLiteralsView));
        });
    });
});