/**
 * Created by justin on 2/4/15.
 */
describe("BooleanTypeFilterController", function () {
    var BooleanTypeFilterController = app.getController('controllers/filters/BooleanTypeFilterController');

    it("should call BooleanTypeFilterController.configureView global method", function () {
        var scope = {someScope: true}, $element = {};

        BooleanTypeFilterController.configureView = jasmine.createSpy();
        var ctrl = new BooleanTypeFilterController(scope, $element);
        expect(BooleanTypeFilterController.configureView).toHaveBeenCalledWith(scope, $element);
    });
});