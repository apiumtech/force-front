/**
 * Created by justin on 3/9/15.
 */
describe("AccountDetailsController", function () {
    var AccountDetailsController = app.getController("controllers/accountDetails/AccountDetailsController");

    var sut;

    it("should call configureView with correct params", function () {
        var scope = {thisIsFakeScope: true},
            routeParams = {account_id: 10};
        AccountDetailsController.configureView = jasmine.createSpy();

        sut = new AccountDetailsController(scope, routeParams);
        expect(AccountDetailsController.configureView).toHaveBeenCalledWith(scope, routeParams.account_id);
    });

    it("should assign accountId to scope for later use in View", function () {
        var scope = {thisIsFakeScope: true},
            routeParams = {account_id: 10};
        AccountDetailsController.configureView = jasmine.createSpy();

        sut = new AccountDetailsController(scope, routeParams);
        expect(scope.accountId).not.toBeNull();
        expect(scope.accountId).toEqual(10);
    });
});