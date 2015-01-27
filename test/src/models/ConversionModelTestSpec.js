/**
 * Created by Justin on 1/5/2015.
 */
describe("ConversionModel", function () {
    var ConversionModel = app.getModel("models/ConversionModel");
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
        sut = ConversionModel.newInstance(widgetService, storageService).getOrElse(throwInstantiateException(ConversionModel));
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

    describe("sut.pageName", function () {
        it("should be 'conversion'", function () {
            expect(sut.pageName).toEqual('conversion');
        });
    });

    describe("_getWidgets", function () {
        it("should call getWidgetsForPage from service", function () {
            spyOn(widgetService, 'getWidgetsForPage').and.returnValue(fakeAjax());
            sut._getWidgets();
            expect(widgetService.getWidgetsForPage).toHaveBeenCalledWith(sut.pageName);
        });
    });
});