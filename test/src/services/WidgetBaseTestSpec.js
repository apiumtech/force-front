/**
 * Created by justin on 12/22/14.
 */
describe("widgetBase", function () {
    var WidgetBase = app.getService("services/WidgetBase");
    var sut;

    describe("reloadWidget", function () {
        it("should throw exception if widgetId is not defined", function () {
            sut = new WidgetBase();
            expect(function () {
                sut.reloadWidget();
            }).toThrowError();
        });
    })
});