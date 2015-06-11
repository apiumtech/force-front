define([
	'modules/literals/shared/table/LiteralsTablePresenter'
	,'modules/literals/shared/table/LiteralsTableView'
], function(LiteralsTablePresenter, LiteralsTableView) {
	'use strict';

    var sut, view, model;
    function exerciseCreatePresenter() {
        sut = LiteralsTablePresenter.newInstance();
        view = mock(LiteralsTableView);
        view.event = {};
        model = {};
    }

    describe('LiteralsTablePresenter', function() {

        describe('eventBus broadcasting', function () {
           [
               {event:'onInit', eventBusMethod:'fireColumnsRequest'}
               ,{event:'fireLiteralsRequest', eventBusMethod:'fireLiteralsRequest'}
               ,{event:'fireLiteralsDeleteRequest', eventBusMethod:'fireLiteralsDeleteRequest'}
               ,{event:'onDisposing', eventBusMethod:'dispose'}
           ].forEach(function (testItem) {
                   it(testItem.event +' should call eventBus '+ testItem.eventBusMethod, function () {
                       exerciseCreatePresenter();
                       sut.show(view, model);
                       spyOn(sut.eventBus, testItem.eventBusMethod);
                       view.event[testItem.event]();
                       expect(sut.eventBus[testItem.eventBusMethod]).toHaveBeenCalled();
                   });
               });
        });

        describe('eventBus callbacks', function () {
            beforeEach(function () {
                exerciseCreatePresenter();
            });
            [
                {signalName:"ColumnsRequestSuccess", viewCallback:"onColumnsRequestSuccess"}
                ,{signalName:"ColumnsRequestError", viewCallback:"onColumnsRequestError"}
                ,{signalName:"LiteralsRequest", viewCallback:"onLiteralsRequest"}
                ,{signalName:"LiteralsRequestSuccess", viewCallback:"onLiteralsRequestSuccess"}
                ,{signalName:"LiteralsRequestError", viewCallback:"onLiteralsRequestError"}
                ,{signalName:"LiteralsSearch", viewCallback:"clearTable"}
            ].forEach(function(testItem){
                    it('view should be subscribed to eventBus.on'+ testItem.signalName, function () {
                        exerciseFakeEventBusCallback(sut.eventBus, testItem.signalName);
                        spyOn(view, testItem.viewCallback);
                        sut.show(view, model);
                        sut.eventBus["fire"+testItem.signalName]();
                        expect(view[testItem.viewCallback]).toHaveBeenCalled();
                    });
                });
        });

	});
});