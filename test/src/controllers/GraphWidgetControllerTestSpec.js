/**
 * Created by justin on 12/30/14.
 */
describe("GraphWidgetController", function () {
    var GraphWidgetController = app.getController('controllers/GraphWidgetController');

    it("should call GraphWidgetController.configureView global method", function () {
        var scope = {someScope: true},
            element = {};

        GraphWidgetController.configureView = jasmine.createSpy();
        var ctrl = new GraphWidgetController(scope, element);
        expect(GraphWidgetController.configureView).toHaveBeenCalledWith(scope, element);
    });
});