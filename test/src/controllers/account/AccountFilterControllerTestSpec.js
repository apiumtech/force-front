/**
 * Created by trung.dang on 02/13/2015
 */
describe("AccountFilterController", function () {
    var FilterController = app.getController('controllers/account/AccountFilterController');

    it("should call AccountFilterController.configureView global method", function () {
        var scope = {someScope: true};

        FilterController.configureView = jasmine.createSpy();
        var ctrl = new FilterController(scope);
        expect(FilterController.configureView).toHaveBeenCalledWith(scope);
    });
});