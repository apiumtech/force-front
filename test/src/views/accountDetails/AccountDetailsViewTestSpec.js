/**
 * Created by justin on 3/9/15.
 */
describe("AccountDetailViews", function () {
    var AccountDetailsView = app.getView('views/accountDetails/AccountDetailsView');

    it("should call presenter's show method on show()", function () {
        var model = {};
        var view = new AccountDetailsView({}, model, {show: jasmine.createSpy()});
        view.show();
        expect(view.presenter.show).toHaveBeenCalledWith(view, model);
    });

    it("should call presenter's showError method on showError()", function () {
        var view = new AccountDetailsView({}, {}, {showError: jasmine.createSpy()});
        view.showError("some error");
        expect(view.presenter.showError).toHaveBeenCalledWith("some error");
    });


});