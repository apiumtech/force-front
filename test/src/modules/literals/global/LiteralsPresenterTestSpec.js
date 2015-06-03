define([
	'modules/literals/global/LiteralsPresenter'
], function(LiteralsPresenter) {
	'use strict';

    function exerciseCreatePresenter(){
        return LiteralsPresenter.newInstance();
    }

	describe('LiteralsPresenter', function() {

        /*[
            {
                sutMethod:"onColumnsRequest",
                modelMethod:"onColumnsRequest",
                eventBusOnMethod: "onColumnsRequest",
                eventBusFireMethod: "fireColumnsRequest",
                eventBusFireSuccessMethod: "fireColumnsRequestSuccess",
                eventBusFireErrorMethod: "fireColumnsRequestError"
            },
            {
                sutMethod:"onLiteralsRequest",
                modelMethod:"onLiteralsRequest",
                eventBusOnMethod: "onLiteralsRequest",
                eventBusFireMethod: "fireLiteralsRequest",
                eventBusFireSuccessMethod: "fireLiteralsRequestSuccess",
                eventBusFireErrorMethod: "fireLiteralsRequestError"
            }
        ].forEach(function(testItem){
                describe(testItem.sutMethod, function() {
                    var sut, view, model;
                    beforeEach(function(){
                        sut = exerciseCreatePresenter();
                        view = {event:{}};
                        model = {};
                    });
                    it('should be subscribed to eventBus.'+ testItem.eventBusOnMethod, function() {
                        spyOn(sut, testItem.sutMethod);
                        sut.show(view, model);
                        sut.eventBus[testItem.eventBusFireMethod]();
                        expect(sut[testItem.sutMethod]).toHaveBeenCalled();
                    });
                    it("should call model's "+ testItem.modelMethod, function() {
                        model[testItem.modelMethod] = function(){};
                        spyOn(model, testItem.modelMethod).and.returnValue({then:function(){}});
                        sut.show(view, model);
                        sut.eventBus[testItem.eventBusFireMethod]();
                        expect(model[testItem.modelMethod]).toHaveBeenCalled();
                    });


                    // Not working for some reason

                    //it("should call "+ testItem.eventBusFireSuccessMethod +" on request success", function() {
                    //    model[testItem.modelMethod] = function(){};
                    //    spyOn(model, testItem.modelMethod).and.returnValue(exerciseFakeOkPromise());
                    //    spyOn(sut.eventBus, testItem.eventBusFireSuccessMethod);
                    //    sut.show(view, model);
                    //    sut[testItem.sutMethod]();
                    //    expect(sut.eventBus[testItem.eventBusFireSuccessMethod]).toHaveBeenCalled();
                    //});
                    //it("should call "+ testItem.eventBusFireErrorMethod +" on request error", function() {
                    //    model[testItem.modelMethod] = function(){};
                    //    spyOn(model, testItem.modelMethod).and.returnValue(exerciseFakeKoPromise());
                    //    spyOn(sut.eventBus, testItem.eventBusFireErrorMethod);
                    //    sut.show(view, model);
                    //    sut.eventBus[testItem.eventBusFireMethod]();
                    //    expect(sut.eventBus[testItem.eventBusFireErrorMethod]).toHaveBeenCalled();
                    //});
                });
        });*/

        describe('onColumnsRequest', function() {
            var sut, view, model;
            beforeEach(function(){
                sut = exerciseCreatePresenter();
                view = {event:{}};
                model = { onColumnsRequest: function(){return "hola";} };
            });
            it('should be subscribed to eventBus.onColumnsRequest', function() {
                spyOn(sut, "onColumnsRequest");
                sut.show(view, model);
                sut.eventBus.fireColumnsRequest();
                expect(sut.onColumnsRequest).toHaveBeenCalled();
            });
            it("should call model's onColumnsRequest", function() {
                spyOn(model, "onColumnsRequest").and.returnValue(exerciseFakePromise());
                sut.show(view, model);
                sut.eventBus.fireColumnsRequest();
                expect(model.onColumnsRequest).toHaveBeenCalled();
            });
            //it("should call fireColumnsRequestSuccess onColumnsRequest success", function() {
            //    spyOn(sut.eventBus, "fireColumnsRequestSuccess");
            //    spyOn(model, "onColumnsRequest").and.returnValue(exerciseFakeOkPromise());
            //    sut.show(view, model);
            //    sut.eventBus.fireColumnsRequest();
            //    expect(sut.eventBus.fireColumnsRequestSuccess).toHaveBeenCalled();
            //});
            //it("should call fireColumnsRequestError onColumnsRequest error", function() {
            //    sut.show(view, model);
            //    spyOn(model, "onColumnsRequest").and.returnValue(exerciseFakeKoPromise());
            //    spyOn(sut.eventBus, "fireColumnsRequestError");
            //    sut.onColumnsRequest();
            //    expect(sut.eventBus.fireColumnsRequestError).toHaveBeenCalled();
            //});
        });

	});
});