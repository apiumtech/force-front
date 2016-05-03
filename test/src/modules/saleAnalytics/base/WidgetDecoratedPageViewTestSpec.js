define([
    'modules/saleAnalytics/base/WidgetDecoratedPageView'
], function (WidgetDecoratedPageView) {
    'use strict';
    describe("WidgetDecoratedPageView", function () {
        function exerciseCreateView(model, presenter) {
            return new WidgetDecoratedPageView(mockAngularScope(), model, presenter || {
                    show: function () {
                    }
                });
        }

        describe("decorateWidget", function () {
            it("Should specific template for widgets", function () {
                var view = exerciseCreateView({}, {});
                view.pageName = "page_name_fake";
                var widgetData = [{
                    type: "bar"
                }];

                view.decorateWidget(widgetData);
                expect(widgetData[0].template).not.toBeNull();

                expect(widgetData[0].template).toEqual('app/modules/saleAnalytics/page_name_fake/' + widgetData[0].type + '.html');
            });
        });

        describe("onWidgetsLoaded", function () {
            var view, widgetsData;

            beforeEach(function () {
                view = exerciseCreateView({}, {});
                widgetsData = {
                    id: "page-name",
                    layout: "linear",
                    body: [{
                        type: "bars"
                    }, {
                        type: "lines"
                    }, {
                        type: "pie"
                    }]
                };
            });

            it("should call decorateWidget", function () {
                spyOn(view, 'decorateWidget');
                view.onWidgetsLoaded(widgetsData);
                expect(view.decorateWidget).toHaveBeenCalledWith(widgetsData.body);
            });

            it("view's scope should have data", function () {
                spyOn(view, 'decorateWidget').and.returnValue(function (data) {
                });
                view.onWidgetsLoaded(widgetsData);
                expect(view.widgets).toEqual(widgetsData.body);
            });

            it('should fireWidgetsLoaded', function () {
                spyOn(view.widgetAdministrationEventBus, 'fireWidgetsLoaded');
                view.onWidgetsLoaded(widgetsData);
                expect(view.widgetAdministrationEventBus.fireWidgetsLoaded).toHaveBeenCalled();
            });
        });

        describe("onRequestWidgetsList", function () {
            var view;
            beforeEach(function () {
                view = exerciseCreateView({}, {});
            });
            it('should fireWidgetsLoaded when widgets has been set', function () {
                spyOn(view.widgetAdministrationEventBus, 'fireWidgetsLoaded');
                view.widgets = [1,2,3];
                view.widgetAdministrationEventBus.fireRequestWidgetsList();
                expect(view.widgetAdministrationEventBus.fireWidgetsLoaded).toHaveBeenCalled();
            });
            it('should not fireWidgetsLoaded when widgets has not been set', function () {
                spyOn(view.widgetAdministrationEventBus, 'fireWidgetsLoaded');
                view.widgets = null;
                view.widgetAdministrationEventBus.fireRequestWidgetsList("abc");
                expect(view.widgetAdministrationEventBus.fireWidgetsLoaded).not.toHaveBeenCalledWith("abc");
            });
        });
    });
});
