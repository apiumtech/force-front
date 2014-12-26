/**
 * Created by justin on 12/22/14.
 */
describe("widgetBase", function () {
    var WidgetBase = app.getService("services/WidgetBase");
    var sut;

    it("When fetchPoint is updated, should call reload()", function () {
        sut = new WidgetBase();
        sut._reload = jasmine.createSpy();

        sut.fetchPoint = "abcdef";
        expect(sut._reload).toHaveBeenCalled();
    });

    describe("reloadWidget", function () {
        it("should throw exception if widgetId is not defined", function () {
            sut = new WidgetBase();
            expect(function () {
                sut.reloadWidget();
            }).toThrowError();
        });
    })
});