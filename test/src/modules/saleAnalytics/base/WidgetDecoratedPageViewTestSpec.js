define([
    'modules/saleAnalytics/base/WidgetDecoratedPageView'
], function (WidgetDecoratedPageView) {
    'use strict';
    describe("WidgetDecoratedPageView", function () {
        function exerciseCreateView(model, presenter) {
            return new WidgetDecoratedPageView({}, model, presenter || {
                    show: function () {
                    }
                });
        }

        it("should call presenter's show method on show()", function () {
            var model = {};
            var view = exerciseCreateView(model, {show: jasmine.createSpy()});
            view.event.onLoaded = jasmine.createSpy();
            view.show();
            expect(view.presenter.show).toHaveBeenCalledWith(view, model);
        });

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
        });

    });
});
