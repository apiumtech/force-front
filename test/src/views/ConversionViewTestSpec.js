
describe("ConversionView", function () {
    var ConversionView = app.getView('views/ConversionView');

    function exerciseCreateView(model, presenter) {
        return ConversionView.newInstance({}, model, presenter || {
            show: function () {
            }
        }, false, false).getOrElse(throwException("Could not create ConversionView!"));
    }

    describe("show() method", function () {
        var view, model;

        function exerciseExecShowMethod() {
            model = {};
            view = exerciseCreateView(model, {show: jasmine.createSpy()});
            view.event.onLoaded = jasmine.createSpy();
            view.show();
        }

        it("should call presenter's show method on show()", function () {
            exerciseExecShowMethod();
            expect(view.presenter.show).toHaveBeenCalledWith(view, model);
        });

        it("should fire event onLoaded", function () {
            exerciseExecShowMethod();
            expect(view.event.onLoaded).toHaveBeenCalled();
        });
    });
});