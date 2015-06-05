define([
	'modules/literals/shared/search/LiteralsSearchPresenter'
], function(LiteralsSearchPresenter) {
	'use strict';

    function exerciseCreatePresenter() {
        return LiteralsSearchPresenter.newInstance();
    }

    describe('LiteralsSearchPresenter', function() {

		it('should fireLiteralsSearch on performSearch', function () {
            var sut = exerciseCreatePresenter();
            sut.show({event:{}}, {});
            spyOn(sut.eventBus, "fireLiteralsSearch");
            sut.view.event.performSearch("search terms");
            expect(sut.eventBus.fireLiteralsSearch).toHaveBeenCalledWith("search terms");
		});

	});
});