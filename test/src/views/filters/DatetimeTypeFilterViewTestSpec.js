/**
 * Created by Justin on 4/2/2015.
 */
describe("DatetimeTypeFilterView", function () {
    var DatetimeTypeFilterView = app.getView("views/filters/DatetimeTypeFilterView");

    var sut;

    describe("construct", function () {
        it("should call configureEvents", function () {
            spyOn(DatetimeTypeFilterView.prototype, 'configureEvents');
            new DatetimeTypeFilterView();
            expect(DatetimeTypeFilterView.prototype.configureEvents).toHaveBeenCalled();
        });
    });
});