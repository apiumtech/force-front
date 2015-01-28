/**
 * Created by justin on 1/28/15.
 */
describe("BarChartWidgetController", function () {
    var BarChartWidgetController = app.getController('controllers/BarChartWidgetController');

    it("should call BarChartWidgetController.configureView global method", function () {
        var scope = {someScope: true},
            element = {};

        BarChartWidgetController.configureView = jasmine.createSpy();
        var ctrl = new BarChartWidgetController(scope, element);
        expect(BarChartWidgetController.configureView).toHaveBeenCalledWith(scope, element);
    });
});