/**
 * Created by kevin on 11/6/14.
 */
describe("AccountController", function () {
    var AccountController = app.getController('controllers/account/AccountController');

    it("should call AccountController.configureView global method", function () {
        var scope = {someScope: true};

        AccountController.configureView = jasmine.createSpy();
        var ctrl = new AccountController(scope);
        expect(AccountController.configureView).toHaveBeenCalledWith(scope);
    });
});