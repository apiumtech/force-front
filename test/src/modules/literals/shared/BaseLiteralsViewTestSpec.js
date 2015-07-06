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


        describe('on instantiation', function () {
            it('should have isPagerActive property set to true', function() {
                var sut = exerciseCreateView();
                expect(sut.isPagerActive).toBe(true);
            });
            it('should have lastScrollY property set to 0', function() {
                var sut = exerciseCreateView();
                expect(sut.lastScrollY).toBe(0);
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
            it("should resetScrollState", function () {
                spyOn(sut, "resetScrollState");
                sut.onDisposing();
                expect(sut.resetScrollState).toHaveBeenCalled();
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

        describe("resetScrollState", function () {
            xit("should reset previosly set scroll state", function () {
                var sut = exerciseCreateView();
                $('body').css('min-height', 1900);
                $('html, body').scrollTop( 0 );
            });
        })

	});
});