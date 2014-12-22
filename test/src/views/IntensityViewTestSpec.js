/**
 * Created by xavi on 12/19/14.
 */
describe("IntensityView", function () {
    var IntensityView = app.getView('views/IntensityView');

    function exerciseCreateView(model, presenter) {
        return IntensityView.newInstance({}, model, presenter || {
            show: function () {
            }
        }, false, false).getOrElse(throwException("Could not create IntensityView!"));
    }

    it("should call presenter's show method on show()", function () {
        var model = {};
        var view = exerciseCreateView(model, {show: jasmine.createSpy()});
        view.show();
        expect(view.presenter.show).toHaveBeenCalledWith(view, model);
    });

});