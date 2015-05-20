/**
 * Created by kevin on 11/6/14.
 */
describe("FilterController", function () {
    var FilterController = app.getController('controllers/filters/FilterController');

    it("should call FilterController.configureView global method", function () {
        var scope = {someScope: true};

        FilterController.configureView = jasmine.createSpy();
        var ctrl = new FilterController(scope);
        expect(FilterController.configureView).toHaveBeenCalledWith(scope);
    });
});