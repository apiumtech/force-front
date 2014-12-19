/**
 * Created by xavi on 12/19/14.
 */
describe("IntensityView", function () {
    var IntensityView = app.getView('views/IntensityView');

    function exerciseCreateView(presenter) {
        return IntensityView.newInstance({}, {}, presenter || {
            show: function () {
            }
        }, false, false).getOrElse(throwException("Could not create IntensityView!"));
    }

    it("should call presenter's show method on show()", function () {
        var view = exerciseCreateView({show: jasmine.createSpy()});
        view.show();
        expect(view.presenter.show).toHaveBeenCalledWith(view);
    });

});