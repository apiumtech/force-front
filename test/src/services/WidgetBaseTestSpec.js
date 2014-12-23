/**
 * Created by justin on 12/22/14.
 */
describe("widgetBase", function () {
    var WidgetBase = app.getService("services/WidgetBase");
    var sut;

    beforeEach(function () {
        sut = new WidgetBase();
    });

    it("When fetchPoint is updated, should call reload()", function () {
        sut._reload = jasmine.createSpy();

        sut.fetchPoint = "abcdef";
        expect(sut._reload).toHaveBeenCalled();
    });

    describe("onReloadWidgetRequested", function () {
        it("should throw exception if widgetName is not defined", function () {
            expect(function () {
                sut.widgetName = "";
                sut.widgetType = "has_type";
                sut.onReloadWidgetRequested();
            }).toThrowError();
        });

        it("should throw exception if widgetType is not defined", function () {
            expect(function () {
                sut.widgetName = "has_name";
                sut.widgetType = "";
                sut.onReloadWidgetRequested();
            }).toThrowError();
        });
    })
});