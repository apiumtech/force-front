
describe("DistributionView", function () {
    var DistributionView = app.getView('views/DistributionView');

    function exerciseCreateView(model, presenter) {
        return DistributionView.newInstance({}, model, presenter || {
            show: function () {
            }
        }, false, false).getOrElse(throwException("Could not create DistributionView!"));
    }

    describe("loadWidgets method", function () {
        it("should fire event 'onLoaded'", function () {
            var model = {};
            var view = exerciseCreateView(model, {show: jasmine.createSpy()});
            view.event.onLoaded = jasmine.createSpy();
            view.fn.loadWidgets();
            expect(view.event.onLoaded).toHaveBeenCalled();
        });
    });

    describe("show() method", function () {
        var view, model;

        function exerciseExecShowMethod() {
            model = {};
            view = exerciseCreateView(model, {show: jasmine.createSpy()});
            view.fn.loadWidgets = jasmine.createSpy();
            view.show();
        }

        it("should call presenter's show method on show()", function () {
            exerciseExecShowMethod();
            expect(view.presenter.show).toHaveBeenCalledWith(view, model);
        });

        it("should call load widget()", function () {
            exerciseExecShowMethod();
            expect(view.fn.loadWidgets).toHaveBeenCalled();
        });
    });
});