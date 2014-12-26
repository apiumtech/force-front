/**
 * Created by xavi on 12/19/14.
 */
describe("BaseView", function () {
    var BaseView = app.getView('views/BaseView');

    it("should call presenter's show method on show()", function () {
        var model = {};
        var view = new BaseView({}, model, {show: jasmine.createSpy()});
        view.show();
        expect(view.presenter.show).toHaveBeenCalledWith(view, model);
    });

    it("should call presenter's showError method on showError()", function () {
        var view = new BaseView({}, {}, {showError: jasmine.createSpy()});
        view.showError("some error");
        expect(view.presenter.showError).toHaveBeenCalledWith("some error");
    });
});