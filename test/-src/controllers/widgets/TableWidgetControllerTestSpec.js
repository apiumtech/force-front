/**
 * Created by justin on 12/30/14.
 */
describe("TableWidgetController", function () {
    var TableWidgetController = app.getController('controllers/widgets/IntensityRankingWidgetController');

    it("should call TableWidgetController.configureView global method", function () {
        var scope = {someScope: true},
            element = {};

        TableWidgetController.configureView = jasmine.createSpy();
        var ctrl = new TableWidgetController(scope, element);
        expect(TableWidgetController.configureView).toHaveBeenCalledWith(scope, element);
    });
});