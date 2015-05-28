define([
	'modules/literals/global/LiteralsPresenter'
], function(LiteralsPresenter) {
	'use strict';

    function exerciseCreatePresenter(){
        return LiteralsPresenter.newInstance();
    }

	describe('LiteralsPresenter', function() {

		it('should register eventBus.onColumnsRequest to view.event.onColumnsRequest', function() {
			var sut = exerciseCreatePresenter();
            var view = {event:{}};
            var model = {some:"value"};
			spyOn(sut, "onColumnsRequest");
            sut.show(view, model);

			sut.eventBus.fireColumnsRequest();

            expect(sut.onColumnsRequest).toHaveBeenCalled();
		});

	});
});