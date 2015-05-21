/**
 * Created by justin on 12/30/14.
 */
describe("DistributionSegmentPieWidgetController", function () {
    var DistributionSegmentPieWidgetController = app.getController('controllers/widgets/DistributionSegmentPieWidgetController');

    it("should call DistributionSegmentPieWidgetController.configureView global method", function () {
        var scope = {someScope: true},
            element = {};

        DistributionSegmentPieWidgetController.configureView = jasmine.createSpy();
        var ctrl = new DistributionSegmentPieWidgetController(scope, element);
        expect(DistributionSegmentPieWidgetController.configureView).toHaveBeenCalledWith(scope, element);
    });
});