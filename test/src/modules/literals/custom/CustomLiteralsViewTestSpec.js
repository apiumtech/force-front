define([
	'modules/literals/custom/CustomLiteralsView'
], function(CustomLiteralsView) {
	'use strict';

    function exerciseCreateView(){
        return CustomLiteralsView.newInstance({scope:mockAngularScope(),viewRepAspect:false, logErrorAspect:false});
    }

	describe('CustomLiteralsView', function() {
		it('should set event.onInit on instantiation', function () {
            var sut = exerciseCreateView();
            expect(sut.event.onInit).toBeDefined();
        });
	});
});