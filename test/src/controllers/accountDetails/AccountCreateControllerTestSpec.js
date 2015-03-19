/**
 * Created by justin on 3/19/15.
 */
describe("AccountCreateController", function () {
    var AccountCreateController = app.getController("controllers/accountDetails/AccountCreateController");

    var sut;

    it("should call configureView with correct params", function () {
        var scope = {thisIsFakeScope: true},
            $modalInstance = {};
        AccountCreateController.configureView = jasmine.createSpy();

        sut = new AccountCreateController(scope, $modalInstance);
        expect(AccountCreateController.configureView).toHaveBeenCalledWith(scope, $modalInstance);
    });
});