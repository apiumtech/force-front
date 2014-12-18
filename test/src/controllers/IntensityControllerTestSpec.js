/**
 * Created by justin on 12/17/14.
 */
describe("IntensityController", function () {
    var IntensityController = app.getController('controllers/IntensityController');

    it("should call IntensityController.configureView global method", function () {
        var scope = {someScope: true};

        IntensityController.configureView = jasmine.createSpy();
        var ctrl = new IntensityController(scope);
        expect(IntensityController.configureView).toHaveBeenCalledWith(scope);
    });
});