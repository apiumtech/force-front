/**
 * Created by justin on 12/30/14.
 */
describe("PieChartWidgetController", function () {
    var PieChartWidgetController = app.getController('controllers/PieChartWidgetController');

    it("should call PieChartWidgetController.configureView global method", function () {
        var scope = {someScope: true},
            element = {};

        PieChartWidgetController.configureView = jasmine.createSpy();
        var ctrl = new PieChartWidgetController(scope, element);
        expect(PieChartWidgetController.configureView).toHaveBeenCalledWith(scope, element);
    });
});