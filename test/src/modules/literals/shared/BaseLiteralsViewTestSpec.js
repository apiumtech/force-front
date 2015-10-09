define([
	'modules/literals/shared/BaseLiteralsView',
	'modules/literals/shared/BaseLiteralsModel',
    'shared/services/bus/ScrollEventBus'
], function(BaseLiteralsView, BaseLiteralsModel, ScrollEventBus) {
	'use strict';

    function exerciseCreateView(model, presenter){
        return new BaseLiteralsView(mockAngularScope(), model, presenter);
    }

	describe('LiteralsView', function() {

        describe('configureEvents', function() {
            it('should be called on instantiation', function() {
                spyOn(BaseLiteralsView.prototype, 'configureEvents').and.callThrough();
                var sut = exerciseCreateView();
                expect(sut.configureEvents).toHaveBeenCalled();
            });
            it('should listen to ScrollEventBus.onScrolledToBottom', function () {
                var testCallback;
                spyOn(ScrollEventBus, "onScrolledToBottom").and.callFake(function(callback){
                    testCallback = function(){
                        callback();
                    };
                });
                spyOn(BaseLiteralsView.prototype, "onPageScrolledToBottom");
                var sut = exerciseCreateView();
                testCallback();
                expect(sut.onPageScrolledToBottom).toHaveBeenCalled();
            });
        });


        describe("onDisposing", function () {
            var sut, model;
            beforeEach(function () {
                model = mock(BaseLiteralsModel);
                spyOn(ScrollEventBus, "dispose");
                sut = exerciseCreateView(model);
                sut.disposer = function(){};
            });
            it("should call event's onDisposing", function () {
                spyOn(sut.event, "onDisposing");
                sut.onDisposing();
                expect(sut.event.onDisposing).toHaveBeenCalled();
            });
            it("should dispose ScrollEventBus", function () {
                sut.onDisposing();
                expect(ScrollEventBus.dispose).toHaveBeenCalled();
            });
            it("should dispose $destroy handler", function () {
                spyOn(sut, "disposer");
                sut.onDisposing();
                expect(sut.disposer).toHaveBeenCalled();
            });
        });

        describe("showError", function () {
            it('should set curretError', function () {
                var sut = exerciseCreateView();
                sut.showError("an error");
                expect(sut.data.currentError).toBe("an error");
            })
        });

        describe("onPageScrolledToBottom", function () {
            it("should call event's nextPage when isPagerActive is true", function () {
                var sut = exerciseCreateView();
                spyOn(sut.event, "nextPage");
                sut.isPagerActive = true;
                sut.onPageScrolledToBottom();
                expect(sut.event.nextPage).toHaveBeenCalled();
            });
            it("should not call event's nextPage when isPagerActive is false", function () {
                var sut = exerciseCreateView();
                spyOn(sut.event, "nextPage");
                sut.isPagerActive = false;
                sut.onPageScrolledToBottom();
                expect(sut.event.nextPage).not.toHaveBeenCalled();
            });
        });

	});
});