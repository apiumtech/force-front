/**
 * Created by Justin on 4/2/2015.
 */
describe("BooleanTypeFilterView", function () {
    var BooleanTypeFilterView = app.getView("views/filters/BooleanTypeFilterView");

    var sut;

    describe("construct", function () {
        it("should call configureEvents", function () {
            spyOn(BooleanTypeFilterView.prototype, 'configureEvents');
            new BooleanTypeFilterView();
            expect(BooleanTypeFilterView.prototype.configureEvents).toHaveBeenCalled();
        });
    });
});