/**
 * Created by joanllenas on 3/31/15.
 */

describe("ContactView", function () {
    var ContactView = app.getView('views/contact/ContactView');

    function exerciseCreateView(scope, model, presenter, mapService, dataTableService, templateParser) {
        return ContactView.newInstance(scope, model, presenter, mapService, dataTableService, templateParser, false, false).getOrElse(throwInstantiateException(ContactView));
    }

    it("should call presenter's show method on show()", function () {
        var view = exerciseCreateView({}, {}, {show: jasmine.createSpy()}, {}, {}, {});
        view.show();
        expect(view.presenter.show).toHaveBeenCalledWith(view, view.model);
    });

});