/**
 * Created by Justin on 1/5/2015.
 */
describe("WidgetDecoratedPageModel", function () {
    var WidgetDecoratedPageModel = app.getModel("models/WidgetDecoratedPageModel");
    var sut,
        widgetService = {
            getWidgetsForPage: function () {
            }
        },
        storageService = {
            store: function () {
            },
            retrieve: function () {
            },
            remove: function () {
            }
        };

    beforeEach(function () {
        sut = Some(new WidgetDecoratedPageModel(widgetService, storageService)).getOrElse(throwInstantiateException(WidgetDecoratedPageModel));
    });

    describe("_getWidgets", function () {
        beforeEach(function () {
            spyOn(widgetService, 'getWidgetsForPage').and.returnValue(exerciseFakePromise());
        });
        it("should throw exception if pageName not defined", function () {
            expect(function () {
                sut._getWidgets();
            }).toThrow(new Error("Page Name is not defined"));
        });

        it("should call getWidgetsForPage from service", function () {
            sut.pageName = "pageNameHere";
            sut._getWidgets();
            expect(widgetService.getWidgetsForPage).toHaveBeenCalledWith(sut.pageName);
        });
    });
});