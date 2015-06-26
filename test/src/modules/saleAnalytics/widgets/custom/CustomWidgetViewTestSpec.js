define([
    'modules/saleAnalytics/widgets/custom/CustomWidgetView',
    'jquery'
], function (CustomWidgetView, $) {
    'use strict';

    var scope, element, compile;
    function exerciseCreateView(){
        scope = {
            $watch:function(){},
            $on:function(){}
        };
        element = {};
        compile = {};
        return CustomWidgetView.newInstance(scope, element, compile, false, false);
    }

    describe('CustomWidgetView', function () {
        it("should listen eventBus' onReloadCommandReceived on configureEvents", function(){
            var configureEvents = CustomWidgetView.prototype.configureEvents;
            spyOn(CustomWidgetView.prototype, "configureEvents")
                .and
                .callFake(
                    function(){
                        var customWidgetView = this;
                        exerciseFakeEventBusCallback(customWidgetView.eventChannel, "ReloadCommandReceived");
                        configureEvents.call(customWidgetView);// call through..
                    }
                );
            var sut = exerciseCreateView();

            //spyOn(sut, "onReloadCommandReceived");//<-- not working, JS inheritance sucks
            sut.event.onReloading = jasmine.createSpy();
            sut.eventChannel.fireReloadCommandReceived();
            expect(sut.event.onReloading).toHaveBeenCalled();
        });

        it('should inject the calculated HTML', function () {
            var sut = exerciseCreateView();
            sut.$compile = function(data){
                return function(){
                    return "<p>"+data+"</p>";
                };
            };
            var htmlElement = $("<div>");
            spyOn(htmlElement, "html");
            spyOn(sut, "getCustomWidgetDiv").and.returnValue(htmlElement);
            sut.onReloadWidgetSuccess("hola");
            expect(htmlElement.html).toHaveBeenCalledWith("<p>hola</p>");
        });

        it('should getCustomWidgetDiv correctly', function () {
            var sut = exerciseCreateView();
            $("<div id='customWidget9'>adios</div>").appendTo("body");
            spyOn(sut, "getCustomWidgetDivId").and.returnValue("#customWidget9");
            expect( sut.getCustomWidgetDiv().attr('id') ).toBe('customWidget9');
        });

        it('should getCustomWidgetDivId correctly', function () {
            var sut = exerciseCreateView();
            sut.widget = {widgetId:9};
            expect( sut.getCustomWidgetDivId() ).toBe('#customWidget9');
        });

    });


});