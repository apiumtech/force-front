define([
    'modules/saleAnalytics/widgetAdministration/WidgetAdministrationView',
], function(WidgetAdministrationView) {
    'use strict';

    describe('WidgetAdministrationView Test', function() {

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
    });
});