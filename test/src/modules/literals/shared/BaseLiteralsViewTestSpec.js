define([
	'modules/literals/shared/BaseLiteralsView'
], function(BaseLiteralsView) {
	'use strict';

    function exerciseCreateView(scope, model, presenter){
        return new BaseLiteralsView(scope, model, presenter);
    }

	describe('LiteralsView', function() {

        describe('configureEvents', function() {
            it('should be called on instantiation', function() {
                spyOn(BaseLiteralsView.prototype, 'configureEvents').and.callThrough();
                var sut = exerciseCreateView();
                expect(sut.configureEvents).toHaveBeenCalled();
            });
        });


        describe('on instantiation', function () {
            it('should have isPagerActive property set to true', function() {
                var sut = exerciseCreateView();
                expect(sut.isPagerActive).toBe(true);
            });
            it('should have lastScrollY property set to 0', function() {
                var sut = exerciseCreateView();
                expect(sut.lastScrollY).toBe(0);
            });
        });


	});
});