/**
 * Created by justin on 2/4/15.
 */
describe("DatetimeTypeFilterController", function () {
    var DatetimeTypeFilterController = app.getController('controllers/filters/DatetimeTypeFilterController');

    it("should call DatetimeTypeFilterController.configureView global method", function () {
        var scope = {someScope: true}, $element = {};

        DatetimeTypeFilterController.configureView = jasmine.createSpy();
        var ctrl = new DatetimeTypeFilterController(scope, $element);
        expect(DatetimeTypeFilterController.configureView).toHaveBeenCalledWith(scope, $element);
    });
});