/**
 * Created by justin on 12/30/14.
 */
describe("DistributionHourPieWidgetController", function () {
    var DistributionHourPieWidgetController = app.getController('controllers/widgets/DistributionHourPieWidgetController');

    it("should call DistributionHourPieWidgetController.configureView global method", function () {
        var scope = {someScope: true},
            element = {};

        DistributionHourPieWidgetController.configureView = jasmine.createSpy();
        var ctrl = new DistributionHourPieWidgetController(scope, element);
        expect(DistributionHourPieWidgetController.configureView).toHaveBeenCalledWith(scope, element);
    });
});