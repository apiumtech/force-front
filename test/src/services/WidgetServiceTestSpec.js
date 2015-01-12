/**
 * Created by Justin on 1/5/2015.
 */
describe("WidgetService", function () {
    var WidgetService = app.getService("services/WidgetService");
    var sut,
        ajaxService;

    beforeEach(function () {
        ajaxService = {
            ajax: jasmine.createSpy()
        };
        sut = WidgetService.newInstance(ajaxService).getOrElse(throwInstantiateException(WidgetService));
    });

    describe("getWidgetsForPage", function () {
        it("should throw exception if page name is not defined", function () {
            expect(function () {
                sut.getWidgetsForPage();
            }).toThrow(new Error("Page name cannot be null"));
        });

        it("should call ajax from its ajaxService with correct fetch url", function () {
            var pageName = "ABC";
            sut.getWidgetsForPage(pageName);
            expect(ajaxService.ajax).toHaveBeenCalled();
            expect(ajaxService.ajax.calls.mostRecent().args[0].url).toEqual('/api/widgets/' + pageName);
        });
    });

    describe("getWidget", function () {
        it("should throw exception if widget identifier is not defined", function () {
            expect(function () {
                sut.getWidget();
            }).toThrow(new Error("Widget Id cannot be null"));
        });

        it("should call ajax from its ajaxService with correct fetch url", function () {
            var widgetId = 1;
            sut.getWidget(widgetId);
            expect(ajaxService.ajax).toHaveBeenCalled();
            expect(ajaxService.ajax.calls.mostRecent().args[0].url).toEqual('/api/widget/' + widgetId);
        });
    });

    describe("moveWidget", function () {
        [{
            msg: "should throw exception if widget identifier is null",
            widgetId: null,
            oldIndex: {order: 1, column: 1},
            newIndex: {order: 2, column: 1},
            exceptionMsg: "WidgetId cannot be null"
        }, {
            msg: "should throw exception if oldIndex is null",
            widgetId: 1,
            oldIndex: null,
            newIndex: {order: 2, column: 1},
            exceptionMsg: "OldIndex cannot be null"
        }, {
            msg: "should throw exception if oldIndex is null",
            widgetId: 1,
            oldIndex: {order: 1, column: 1},
            newIndex: null,
            exceptionMsg: "NewIndex cannot be null"
        }]
            .forEach(function (test) {
                var msg = test.msg,
                    widgetId = test.widgetId,
                    oldIndex = test.oldIndex,
                    newIndex = test.newIndex,
                    exception = test.exceptionMsg;

                it(msg, function () {
                    var exerciseMoveWidget = function () {
                        sut.moveWidget(widgetId, oldIndex, newIndex);
                    };
                    expect(exerciseMoveWidget).toThrow(new Error(exception));
                });
            });

        it("should call ajax from its ajaxService with correct arguments", function () {
            var widgetId = 1;
            var oldIndex = {
                order: 1,
                column: 1
            }, newIndex = {
                order: 2,
                column: 1
            };
            sut.moveWidget(widgetId, oldIndex, newIndex);
            expect(ajaxService.ajax).toHaveBeenCalled();
            expect(ajaxService.ajax.calls.mostRecent().args[0].url).toEqual('/api/widget/' + widgetId + '/move');
            expect(ajaxService.ajax.calls.mostRecent().args[0].type).toEqual("post");
            expect(ajaxService.ajax.calls.mostRecent().args[0].data).toEqual({ oldIndex: oldIndex, newIndex: newIndex });
        });
    });
});