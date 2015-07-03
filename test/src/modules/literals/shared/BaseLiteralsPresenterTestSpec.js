define([
    'modules/literals/shared/BaseLiteralsView',
    'modules/literals/shared/BaseLiteralsPresenter',
    'modules/literals/shared/BaseLiteralsModel',
    'modules/literals/shared/LiteralsEventBus'
], function (BaseLiteralsView, BaseLiteralsPresenter, BaseLiteralsModel, LiteralsEventBus) {
    'use strict';

    function exerciseCreatePresenter() {
        var mockEventBus = mock(LiteralsEventBus);
        return new BaseLiteralsPresenter(mockEventBus);
    }

    function mockView(){
        var view = mock(BaseLiteralsView);
        view.event = {};
        return view;
    }

    function mockModel() {
        return mock(BaseLiteralsModel);
    }


    describe('BaseLiteralsPresenter', function () {

        describe('onColumnsRequest', function () {
            var sut, view, model;
            beforeEach(function () {
                sut = exerciseCreatePresenter();
                view = mockView();
                model = mockModel();
                exerciseFakeEventBusCallback(sut.eventBus, "ColumnsRequest");
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
                view = mockView();
                model = mockModel();
                exerciseFakeEventBusCallback(sut.eventBus, "LiteralsRequest");
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
                view = mockView();
                model = mockModel();
                spyOn(model, "onLiteralsRequest").and.returnValue(exerciseFakePromise());
                exerciseFakeEventBusCallback(sut.eventBus, "LiteralsSearch");
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

            it("should fire a literals request", function () {
                spyOn(sut.eventBus, "fireLiteralsRequest");
                sut.show(view, model);
                sut.onLiteralsSearch("hello goodbye");
                expect(sut.eventBus.fireLiteralsRequest).toHaveBeenCalled();
            });
        });

        describe("onDisposing", function(){
            it("should dispose eventBus", function(){
                var sut = exerciseCreatePresenter();
                spyOn(sut.eventBus, "dispose");
                sut.onDisposing();
                expect(sut.eventBus.dispose).toHaveBeenCalled();
            });
        });

        describe("onLiteralsDeleteRequest", function(){
            var sut, view, model;
            beforeEach(function () {
                sut = exerciseCreatePresenter();
                view = mockView();
                model = mockModel();
                sut.show(view, model);
                spyOn(view, "resetScrollState");
            });
            it("should reset view's scroll state", function(){
                spyOn(model, "onLiteralsDeleteRequest").and.returnValue(exerciseFakePromise());
                sut.onLiteralsDeleteRequest();
                expect(view.resetScrollState).toHaveBeenCalled();
            });

            it("should fire Literals Request when promise succeeds", function(){
                spyOn(model, "onLiteralsDeleteRequest").and.returnValue(exerciseFakeOkPromise());
                spyOn(sut.eventBus, "fireLiteralsRequest");
                sut.onLiteralsDeleteRequest();
                expect(sut.eventBus.fireLiteralsRequest).toHaveBeenCalled();
            });

            it("should call view's showError when promise fails", function(){
                spyOn(model, "onLiteralsDeleteRequest").and.returnValue(exerciseFakeKoPromise());
                sut.onLiteralsDeleteRequest();
                expect(view.showError).toHaveBeenCalled();
            });
        });

        describe("nextPage", function () {
            var sut, view, model;
            beforeEach(function () {
                sut = exerciseCreatePresenter();
                view = mockView();
                model = mockModel();
                sut.show(view, model);
            });
            it("should call model's nextPage", function(){
                sut.nextPage();
                expect(model.nextPage).toHaveBeenCalled();
            });
            it("should call eventBus's fireLiteralsRequest", function(){
                spyOn(sut.eventBus, "fireLiteralsRequest");
                sut.nextPage();
                expect(sut.eventBus.fireLiteralsRequest).toHaveBeenCalled();
            });
        });

    });
});