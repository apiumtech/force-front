define([
    'modules/saleAnalytics/widgetAdministration/WidgetAdministrationView',
], function(WidgetAdministrationView) {
    'use strict';

    describe('WidgetAdministrationView', function() {

        function exerciseCreateView(){
            return new WidgetAdministrationView( mockAngularScope() );
        };

        describe('configureEvents', function(){
            it("should resgister to WidgetAdministrationEventBus.onToggleWidgetAdministration", function () {
                var sut = exerciseCreateView();
                spyOn(sut, "onToggleWidgetAdministration");
                sut.widgetAdministrationEventBus.fireToggleWidgetAdministration();
                expect( sut.onToggleWidgetAdministration ).toHaveBeenCalled();
            });
        });

        describe('onToggleWidgetAdministration', function(){
            beforeEach(function () {
                $.fx.off = true;//disable jquery animations to avoid async issues
            });
            function mockContainer(isVisible) {
                var containerId = "WidgetAdministrationContainer";
                var visibility = isVisible ? '' : 'display:none';
                $('body').append('<div id="'+ containerId +'" style="'+ visibility +'"></div>');
                return $('#'+containerId);
            };
            it('should make container div invisible when visible', function () {
                var sut = exerciseCreateView();
                var isVisible = true;
                var container = mockContainer(isVisible);
                sut.onToggleWidgetAdministration();
                expect( container.css("display") ).toBe("none");
            });
            it('should make container div visible when invisible', function () {
                var sut = exerciseCreateView();
                var isVisible = false;
                var container = mockContainer(isVisible);
                sut.onToggleWidgetAdministration();
                expect( container.css("display")).not.toBe("none");
            });
        });


        it('widgetsAvailable should be false initially', function () {
            var sut = exerciseCreateView();
            expect(sut.data.widgetsAvailable).toBe(false);
        });

        describe('onWidgetsLoaded', function(){
            var payload;
            beforeEach(function () {
                payload = {
                    pageName: "",
                    widgets: [1,2,3]
                };
            });
            it('should be called when eventBus fires WidgetsLoaded', function () {
                var sut = exerciseCreateView();
                spyOn(sut, "onWidgetsLoaded");
                sut.widgetAdministrationEventBus.fireWidgetsLoaded(payload);
                expect(sut.onWidgetsLoaded).toHaveBeenCalledWith(payload);
            });
            it('widgetsAvailable should be true', function () {
                var sut = exerciseCreateView();
                sut.widgetAdministrationEventBus.fireWidgetsLoaded(payload);
                expect(sut.data.widgetsAvailable).toBe(true);
            });
        });

    });
});