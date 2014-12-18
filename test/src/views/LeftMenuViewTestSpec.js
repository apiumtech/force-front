/**
 * Created by kevin on 11/6/14.
 */
describe("LeftMenuView", function () {
    var LeftMenuView = app.getView('views/LeftMenuView');

    function exerciseCreateView(presenter) {
        return LeftMenuView.newInstance({}, presenter || {
            show: function () {
            }
        }, false, false).getOrElse(throwException("Could not create LeftMenuView!"));
    }

    it("should call presenter's show method on show()", function () {
        var view = exerciseCreateView({show: jasmine.createSpy()});
        view.show();
        expect(view.presenter.show).toHaveBeenCalledWith(view);
    });

});