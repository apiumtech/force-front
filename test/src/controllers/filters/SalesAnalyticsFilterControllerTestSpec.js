/**
 * Created by justin on 2/3/15.
 */
describe("SalesAnalyticsFilterController", function () {
    var SalesAnalyticsFilterControllerClass = app.getController('controllers/filters/SalesAnalyticsFilterController');
    var SalesAnalyticsFilterController = SalesAnalyticsFilterControllerClass[SalesAnalyticsFilterControllerClass.length - 1];

    it("should call SalesAnalyticsFilterController.configureView global method", function () {
        var scope = {someScope: true},
            filter = {filter: true}, someCompileThings={};

        SalesAnalyticsFilterController.configureView = jasmine.createSpy();
        var ctrl = new SalesAnalyticsFilterController(scope, filter, someCompileThings);
        expect(SalesAnalyticsFilterController.configureView).toHaveBeenCalledWith(scope, filter, someCompileThings);
    });
});