/**
 * Created by justin on 3/9/15.
 */
describe("AccountDetailWidgetWrapperController", function () {
    var AccountDetailWidgetWrapperController = app.getController("controllers/accountDetails/AccountDetailWidgetWrapperController");

    var sut;

    it("should call configureView with correct params", function () {
        var scope = {thisIsFakeScope: true},
            element = {account_id: 10};
        AccountDetailWidgetWrapperController.configureView = jasmine.createSpy();

        sut = new AccountDetailWidgetWrapperController(scope, element);
        expect(AccountDetailWidgetWrapperController.configureView).toHaveBeenCalledWith(scope, element);
    });
});