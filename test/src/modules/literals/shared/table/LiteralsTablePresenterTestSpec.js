define([
	'modules/literals/shared/table/LiteralsTablePresenter'
], function(LiteralsTablePresenter) {
	'use strict';

    var sut, view, model;
    function exerciseCreatePresenter() {
        sut = LiteralsTablePresenter.newInstance();
        view = {
            event:{},
            onColumnsRequestSuccess: function(){},
            onColumnsRequestError: function(){},
            onLiteralsRequestSuccess: function(){},
            onLiteralsRequestError: function(){}
        };
        model = {};
        sut.show(view, model);
    }

    describe('LiteralsTablePresenter', function() {

        it('onInit should call eventBus fireColumnsRequest', function () {
            exerciseCreatePresenter();
            spyOn(sut.eventBus, "fireColumnsRequest");
            view.event.onInit();
            expect(sut.eventBus.fireColumnsRequest).toHaveBeenCalled();
        });

        it('fireLiteralsRequest should call eventBus fireLiteralsRequest', function () {
            exerciseCreatePresenter();
            spyOn(sut.eventBus,"fireLiteralsRequest");
            view.event.fireLiteralsRequest();
            expect(sut.eventBus.fireLiteralsRequest).toHaveBeenCalled();
        });
	});
});