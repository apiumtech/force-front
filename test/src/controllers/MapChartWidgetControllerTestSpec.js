/**
 * Created by justin on 2/11/15.
 */
describe("MapChartWidgetController", function () {
    var MapChartWidgetController = app.getController('controllers/MapChartWidgetController');

    it("should call MapChartWidgetController.configureView global method", function () {
        var scope = {someScope: true},
            element = {};

        MapChartWidgetController.configureView = jasmine.createSpy();
        var ctrl = new MapChartWidgetController(scope, element);
        expect(MapChartWidgetController.configureView).toHaveBeenCalledWith(scope, element);
    });
});