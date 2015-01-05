/**
 * Created by Justin on 1/5/2015.
 */
describe("DistributionModel", function () {
    var DistributionModel = app.getModel("models/DistributionModel");
    var sut,
        widgetService = {
            getWidgetsForPage: function () {
            }
        };

    beforeEach(function () {
        sut = DistributionModel.newInstance(widgetService).getOrElse(throwInstantiateException(DistributionModel));
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
        it("should be 'distribution'", function () {
            expect(sut.pageName).toEqual('distribution');
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