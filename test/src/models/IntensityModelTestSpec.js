/**
 * Created by Justin on 1/5/2015.
 */
describe("IntensityModel", function () {
    var IntensityModel = app.getModel("models/IntensityModel");
    var sut,
        widgetService = {
            getWidgetsForPage: function () {
            }
        };

    beforeEach(function () {
        sut = IntensityModel.newInstance(widgetService).getOrElse(throwInstantiateException(IntensityModel));
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
        it("should be 'intensity'", function () {
            expect(sut.pageName).toEqual('intensity');
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