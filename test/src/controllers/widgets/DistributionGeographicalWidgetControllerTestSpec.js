/**
 * Created by justin on 2/11/15.
 */
describe("DistributionGeographicalWidgetController", function () {
    var DistributionGeographicalWidgetController = app.getController('controllers/widgets/DistributionGeographicalWidgetController');

    it("should call DistributionGeographicalWidgetController.configureView global method", function () {
        var scope = {someScope: true},
            element = {};

        DistributionGeographicalWidgetController.configureView = jasmine.createSpy();
        var ctrl = new DistributionGeographicalWidgetController(scope, element);
        expect(DistributionGeographicalWidgetController.configureView).toHaveBeenCalledWith(scope, element);
    });
});