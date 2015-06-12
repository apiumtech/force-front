define([
	'modules/literals/global/LiteralsView'
], function(LiteralsView) {
	'use strict';

    function exerciseCreateView(scope, presenter){
        scope = scope || {$on:function(){}};
        return LiteralsView.newInstance({
            scope: scope,
            presenter: presenter,
            viewRepAspect:false, logErrorAspect:false
        });
    }

	describe('LiteralsView', function() {

        describe('configureEvents', function() {
            it('should be called on instantiation', function() {
                spyOn(LiteralsView.prototype, 'configureEvents').and.callThrough();
                var sut = exerciseCreateView();
                expect(sut.configureEvents).toHaveBeenCalled();
            });
        });

	});
});