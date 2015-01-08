
describe("WidgetDecoratedPageView", function () {
    var WidgetDecoratedPageView = app.getView('views/WidgetDecoratedPageView');

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
            var widgetData = [{
                widgetType: "bar"
            }];

            view.decorateWidget(widgetData);
            expect(widgetData[0].template).not.toBeNull();

            expect(widgetData[0].template).toEqual('/templates/widgets/' + widgetData[0].widgetType + '.html');
        });
    });

    describe("onWidgetsLoaded", function () {
        var view, widgetsData;

        beforeEach(function () {
            view = exerciseCreateView({}, {});
            widgetsData = [{
                widgetType: "bars"
            }, {
                widgetType: "lines"
            }, {
                widgetType: "pie"
            }];
        });

        it("should call decorateWidget", function () {
            spyOn(view, 'decorateWidget');
            view.onWidgetsLoaded(widgetsData);
            expect(view.decorateWidget).toHaveBeenCalledWith(widgetsData);
        });

        it("view's scope should have data", function () {
            spyOn(view, 'decorateWidget').and.returnValue(function (data) {
            });
            view.onWidgetsLoaded(widgetsData);
            expect(view.$scope.widgets).toEqual(widgetsData);
        });
    });

});