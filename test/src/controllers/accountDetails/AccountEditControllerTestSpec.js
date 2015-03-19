/**
 * Created by justin on 3/19/15.
 */
describe("AccountEditController", function () {
    var AccountEditController = app.getController("controllers/accountDetails/AccountEditController");

    var sut;

    it("should call configureView with correct params", function () {
        var scope = {thisIsFakeScope: true},
            $modalInstance = {},
            $modal = {},
            accountId = 10;
        AccountEditController.configureView = jasmine.createSpy();

        sut = new AccountEditController(scope, $modalInstance, $modal, accountId);
        expect(AccountEditController.configureView).toHaveBeenCalledWith(scope, $modalInstance);
    });

    it("should assign accountId to scope for later use in View", function () {
        var scope = {thisIsFakeScope: true},
            $modalInstance = {},
            $modal = {},
            accountId = 10;
        AccountEditController.configureView = jasmine.createSpy();

        sut = new AccountEditController(scope, $modalInstance, $modal, accountId);
        expect(scope.accountId).not.toBeNull();
        expect(scope.accountId).toEqual(10);
    });
});