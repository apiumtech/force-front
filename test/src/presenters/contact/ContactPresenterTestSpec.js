/**
 * Created by joanllenas on 3/31/15.
 */

describe("ContactPresenter", function () {
    var ContactPresenter = app.getView('presenters/contact/ContactPresenter');

    var presenter, view, model;

    beforeEach(function () {
        view = {
            event: {},
            fn: {}
        };
        model = {};
        presenter = ContactPresenter.newInstance().getOrElse(throwInstantiateException(ContactPresenter));
        presenter.show(view, model);
    });

    describe('show', function(){
        /*it("should call resetTableColumns on onFieldsRestoreDefault", function () {
            view.onFieldsRestoreDefault = jasmine.createSpy();
            view.event.onFieldsRestoreDefault();
            expect(view.onFieldsRestoreDefault).toHaveBeenCalled();
        });*/
    });
});