define([
    'modules/literals/global/LiteralsPresenter',
    'modules/literals/shared/LiteralsEventBus'
], function (LiteralsPresenter, LiteralsEventBus) {
    'use strict';

    function exerciseCreatePresenter() {
        var mockEventBus = mock(LiteralsEventBus);
        return LiteralsPresenter.newInstance(mockEventBus);
    }

    describe('LiteralsPresenter', function () {

        describe('onColumnsRequest', function () {
            var sut, view, model;
            beforeEach(function () {
                sut = exerciseCreatePresenter();
                view = {event: {}};
                model = {};
                spyOn(sut.eventBus, "onColumnsRequest").and.callFake(function(callbackMethod){
                    sut.eventBus.fireColumnsRequest = function() {
                        callbackMethod();
                    };
                });
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
                spyOn(sut.eventBus, "onLiteralsRequest").and.callFake(function(callbackMethod){
                    sut.eventBus.fireLiteralsRequest = function() {
                        callbackMethod();
                    };
                });
            });

            it('should be subscribed to eventBus.onLiteralsRequest', function () {
                spyOn(sut, "onLiteralsRequest");
                sut.show(view, model);
                sut.eventBus.fireLiteralsRequest();
                expect(sut.onLiteralsRequest).toHaveBeenCalled();
            });

            it("should call model's onLiteralsRequest", function () {
                model.onLiteralsRequest = jasmine.createSpy().and.returnValue(exerciseFakeOkPromise());
                sut.show(view, model);
                sut.eventBus.fireLiteralsRequest();
                expect(model.onLiteralsRequest).toHaveBeenCalled();
            });

            it("should call fireLiteralsRequestSuccess onLiteralsRequest success", function () {
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

        describe('onLiteralsSearch', function () {
            var sut, view, model;
            beforeEach(function () {
                sut = exerciseCreatePresenter();
                view = {event: {}};
                model = {
                    setSearchTerms: function(){},
                    onLiteralsRequest: jasmine.createSpy().and.returnValue(exerciseFakePromise())
                };
                spyOn(sut.eventBus, "onLiteralsSearch").and.callFake(function(callbackMethod){
                    sut.eventBus.fireLiteralsSearch = function(param) {
                        callbackMethod(param);
                    };
                });
            });

            it("should be called after fireLiteralsSearch", function () {
                spyOn(sut, "onLiteralsSearch");
                sut.show(view, model);
                sut.eventBus.fireLiteralsSearch("hello");
                expect(sut.onLiteralsSearch).toHaveBeenCalledWith("hello");
            });

            it("should set model's searchTerms", function () {
                spyOn(model, "setSearchTerms");
                sut.show(view, model);
                sut.onLiteralsSearch("bye");
                expect(sut.model.setSearchTerms).toHaveBeenCalledWith("bye");
            });

            it("should trigger a literals request", function () {
                spyOn(sut, "onLiteralsRequest");
                sut.show(view, model);
                sut.onLiteralsSearch("hello goodbye");
                expect(sut.onLiteralsRequest).toHaveBeenCalled();
            });
        });

    });
});