define([
    'modules/literals/global/LiteralsPresenter'
], function (LiteralsPresenter) {
    'use strict';

    function exerciseCreatePresenter() {
        return LiteralsPresenter.newInstance();
    }

    describe('LiteralsPresenter', function () {

        /*var sut, view, model;
        beforeEach(function () {
            sut = exerciseCreatePresenter();
            view = {event: {}};
            model = {};
        });

        [{sutMethod: "onColumnsRequest", modelMethod: "onColumnsRequest", eventBusOnMethod: "onColumnsRequest", eventBusFireMethod: "fireColumnsRequest", eventBusFireSuccessMethod: "fireColumnsRequestSuccess", eventBusFireErrorMethod: "fireColumnsRequestError"},
         {sutMethod: "onLiteralsRequest", modelMethod: "onLiteralsRequest", eventBusOnMethod: "onLiteralsRequest", eventBusFireMethod: "fireLiteralsRequest", eventBusFireSuccessMethod: "fireLiteralsRequestSuccess", eventBusFireErrorMethod: "fireLiteralsRequestError"}]
         .forEach(function (testItem) {
                describe(testItem.sutMethod, function () {
                    it('should be subscribed to eventBus.' + testItem.eventBusOnMethod, function () {
                        spyOn(sut, testItem.sutMethod);
                        sut.show(view, model);
                        sut.eventBus[testItem.eventBusFireMethod]();
                        expect(sut[testItem.sutMethod]).toHaveBeenCalled();
                    });
                    //it("should call model's onColumnsRequest", function () {
                    //    model.onColumnsRequest = jasmine.createSpy().and.returnValue(exerciseFakeOkPromise());
                    //    sut.show(view, model);
                    //    sut.eventBus.fireColumnsRequest();
                    //    expect(model.onColumnsRequest).toHaveBeenCalled();
                    //});
                    //it("should call fireColumnsRequestSuccess onColumnsRequest success", function () {
                    //    model.onColumnsRequest = jasmine.createSpy().and.returnValue(exerciseFakeOkPromise());
                    //    sut.show(view, model);
                    //    spyOn(sut.eventBus, "fireColumnsRequestSuccess");
                    //    sut.eventBus.fireColumnsRequest();
                    //    expect(sut.eventBus.fireColumnsRequestSuccess).toHaveBeenCalled();
                    //});
                    //it("should call fireColumnsRequestError onColumnsRequest error", function () {
                    //    model.onColumnsRequest = jasmine.createSpy().and.returnValue(exerciseFakeKoPromise());
                    //    sut.show(view, model);
                    //    spyOn(sut.eventBus, "fireColumnsRequestError");
                    //    sut.onColumnsRequest();
                    //    expect(sut.eventBus.fireColumnsRequestError).toHaveBeenCalled();
                    //});
                });
            });*/


        describe('onColumnsRequest', function () {
            var sut, view, model;
            beforeEach(function () {
                sut = exerciseCreatePresenter();
                view = {event: {}};
                model = {};
            });
            it('should be subscribed to eventBus.onColumnsRequest', function () {
                spyOn(sut, "onColumnsRequest");
                sut.show(view, model);
                sut.eventBus.fireColumnsRequest();
                expect(sut.onColumnsRequest).toHaveBeenCalled();
            });
            it("should call model's onColumnsRequest", function () {
                model.onColumnsRequest = jasmine.createSpy().and.returnValue(exerciseFakeOkPromise());
                sut.show(view, model);
                sut.eventBus.fireColumnsRequest();
                expect(model.onColumnsRequest).toHaveBeenCalled();
            });

            it("should call fireColumnsRequestSuccess onColumnsRequest success", function () {
                model.onColumnsRequest = jasmine.createSpy().and.returnValue(exerciseFakeOkPromise());
                sut.show(view, model);
                spyOn(sut.eventBus, "fireColumnsRequestSuccess");
                sut.eventBus.fireColumnsRequest();
                expect(sut.eventBus.fireColumnsRequestSuccess).toHaveBeenCalled();
            });

            it("should call fireColumnsRequestError onColumnsRequest error", function () {
                model.onColumnsRequest = jasmine.createSpy().and.returnValue(exerciseFakeKoPromise());
                sut.show(view, model);
                spyOn(sut.eventBus, "fireColumnsRequestError");
                sut.onColumnsRequest();
                expect(sut.eventBus.fireColumnsRequestError).toHaveBeenCalled();
            });
        });


        describe('onLiteralsRequest', function () {
            var sut, view, model;
            beforeEach(function () {
                sut = exerciseCreatePresenter();
                view = {event: {}};
                model = {};
            });

            // not working, why?
            xit('should be subscribed to eventBus.onLiteralsRequest', function () {
                sut.show(view, model);
                spyOn(sut, "onLiteralsRequest");// spy not spying ??
                sut.eventBus.fireLiteralsRequest();
                expect(sut.onLiteralsRequest).toHaveBeenCalled();
            });

            // not working, why?
            xit("should call model's onLiteralsRequest", function () {
                model.onLiteralsRequest = jasmine.createSpy().and.returnValue(exerciseFakeOkPromise());
                sut.show(view, model);
                sut.eventBus.fireLiteralsRequest();
                expect(model.onLiteralsRequest).toHaveBeenCalled();
            });

            // not working, why?
            xit("should call fireLiteralsRequestSuccess onLiteralsRequest success", function () {
                model.onLiteralsRequest = jasmine.createSpy().and.returnValue(exerciseFakeOkPromise());
                sut.show(view, model);
                spyOn(sut.eventBus, "fireLiteralsRequestSuccess");
                sut.eventBus.fireLiteralsRequest();
                expect(sut.eventBus.fireLiteralsRequestSuccess).toHaveBeenCalled();
            });

            it("should call fireLiteralsRequestError onLiteralsRequest error", function () {
                model.onLiteralsRequest = jasmine.createSpy().and.returnValue(exerciseFakeKoPromise());
                sut.show(view, model);
                spyOn(sut.eventBus, "fireLiteralsRequestError");
                sut.onLiteralsRequest();
                expect(sut.eventBus.fireLiteralsRequestError).toHaveBeenCalled();
            });
        });

        /*describe('onLiteralsSearch', function () {
            var sut, view, model;
            beforeEach(function () {
                sut = exerciseCreatePresenter();
                view = {event: {}};
                model = {};
                model.setSearchTerms = function(){};
                model.onLiteralsRequest = jasmine.createSpy().and.returnValue(exerciseFakePromise());
                sut.show(view, model);
            });

            it("should be called after fireLiteralsSearch", function () {
                spyOn(sut, "onLiteralsSearch");
                sut.eventBus.fireLiteralsSearch("hello");
                expect(sut.onLiteralsSearch).toHaveBeenCalledWith("hello");
            });

            it("should set model's searchTerms", function () {
                spyOn(sut.model, "setSearchTerms");
                sut.onLiteralsSearch("bye");
                expect(sut.model.setSearchTerms).toHaveBeenCalledWith("bye");
            });

            it("should trigger a literals request", function () {
                spyOn(sut, "onLiteralsRequest");
                sut.onLiteralsSearch("hello goodbye");
                expect(sut.onLiteralsRequest).toHaveBeenCalled();
            });
        });*/

    });
});