/**
 * Created by Justin on 4/2/2015.
 */
describe("StringTypeFilterView", function () {
    var StringTypeFilterView = app.getView("views/filters/StringTypeFilterView");

    var sut;

    describe("construct", function () {
        it("should call configureEvents", function () {
            spyOn(StringTypeFilterView.prototype, 'configureEvents');
            new StringTypeFilterView();
            expect(StringTypeFilterView.prototype.configureEvents).toHaveBeenCalled();
        });
    });
});