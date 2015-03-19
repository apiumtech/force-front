/**
 * Created by justin on 2/3/15.
 */
describe("SalesAnalyticsFilterController", function () {
    var SalesAnalyticsFilterController = app.getController('controllers/filters/SalesAnalyticsFilterController');

    it("should call SalesAnalyticsFilterController.configureView global method", function () {
        var scope = {someScope: true},
            filter = {filter : true};

        SalesAnalyticsFilterController.configureView = jasmine.createSpy();
        var ctrl = new SalesAnalyticsFilterController(scope, filter);
        expect(SalesAnalyticsFilterController.configureView).toHaveBeenCalledWith(scope, filter);
    });
});