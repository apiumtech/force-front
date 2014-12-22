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
        sut.reload = jasmine.createSpy();

        sut.fetchPoint = "abcdef";
        expect(sut.reload).toHaveBeenCalled();
    });

});