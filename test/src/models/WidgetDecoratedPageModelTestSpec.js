/**
 * Created by Justin on 1/5/2015.
 */
describe("WidgetDecoratedPageModel", function () {
    var WidgetDecoratedPageModel = app.getModel("models/WidgetDecoratedPageModel");
    var sut,
        widgetService = {
            getWidgetsForPage: function () {
            }
        };

    beforeEach(function () {
        sut = Some(new WidgetDecoratedPageModel(widgetService)).getOrElse(throwInstantiateException(WidgetDecoratedPageModel));
    });
    function fakeAjax() {
        return {
            then: function (a) {
                a({data: null});
                return fakeAjax();
            },
            fail: function (a) {
                a();
            }
        }
    }

    describe("_getWidgets", function () {
        it("should throw exception if pageName not defined", function() {
            spyOn(widgetService, 'getWidgetsForPage').and.returnValue(fakeAjax());
            expect(function(){
                sut._getWidgets();
            }).toThrow(new Error("Page Name is not defined"));
        });

        it("should call getWidgetsForPage from service", function () {
            spyOn(widgetService, 'getWidgetsForPage').and.returnValue(fakeAjax());
            sut.pageName = "pageNameHere";
            sut._getWidgets();
            expect(widgetService.getWidgetsForPage).toHaveBeenCalledWith(sut.pageName);
        });
    });
});