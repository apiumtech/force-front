describe("DistributionView", function () {
    var DistributionView = app.getView('views/DistributionView');

    var view, model, presenter;

    function exerciseCreateView(_model, _presenter) {
        return DistributionView.newInstance({}, _model, _presenter || {
            show: function () {
            }
        }, false, false).getOrElse(throwException("Could not create DistributionView!"));
    }

    describe("show() method", function () {
        beforeEach(function () {
            model = {};
            presenter = {
                show: jasmine.createSpy()
            };
            view = exerciseCreateView(model, presenter);
            view.event.onLoaded = jasmine.createSpy();
            view.show();
        });

        it("should call presenter's show method on show()", function () {
            expect(view.presenter.show).toHaveBeenCalledWith(view, model);
        });

        it("should fire event onLoaded", function () {
            expect(view.event.onLoaded).toHaveBeenCalled();
        });
    });
});