/**
 * Created by justin on 12/30/14.
 */
describe("DistributionHourLineWidgetController", function () {
    var DistributionHourLineWidgetController = app.getController('controllers/widgets/DistributionHourLineWidgetController');

    it("should call DistributionHourLineWidgetController.configureView global method", function () {
        var scope = {someScope: true},
            element = {};

        DistributionHourLineWidgetController.configureView = jasmine.createSpy();
        var ctrl = new DistributionHourLineWidgetController(scope, element);
        expect(DistributionHourLineWidgetController.configureView).toHaveBeenCalledWith(scope, element);
    });
});