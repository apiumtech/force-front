/**
 * Created by justin on 12/30/14.
 */
describe("WidgetWrapperController", function () {
    var WidgetWrapperController = app.getController('controllers/WidgetWrapperController');

    it("should call WidgetWrapperController.configureView global method", function () {
        var scope = {someScope: true},
            element = {};

        WidgetWrapperController.configureView = jasmine.createSpy();
        var ctrl = new WidgetWrapperController(scope, element);
        expect(WidgetWrapperController.configureView).toHaveBeenCalledWith(scope, element);
    });
});