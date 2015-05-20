/**
 * Created by joanllenas on 3/31/15.
 */

describe("ContactPresenter", function () {
    var ContactPresenter = app.getPresenter('presenters/contact/ContactPresenter');

    var presenter, view, model;

    beforeEach(function () {
        view = {
            data: {},
            event: {},
            fn: {}
        };
        model = {};
        presenter = ContactPresenter.newInstance();
    });

    it("should set view and model on show()", function(){
        expect(presenter.view).not.toBeDefined();
        expect(presenter.model).not.toBeDefined();
        presenter.show(view, model);
        expect(presenter.view).toBe(view);
        expect(presenter.model).toBe(model);
    });

    describe("loadContacts",function(){
        beforeEach(function(){
            presenter.view = view;
            presenter.model = model;
            view.onLoadContactsComplete = jasmine.createSpy("onLoadContactsComplete");
            view.onLoadContactsError = jasmine.createSpy("onLoadContactsError");
        });

        it("should call view's onLoadContactsComplete on loadContacts success", function () {
            model.loadContacts = jasmine.createSpy("loadContacts").and.returnValue( exerciseFakeOkPromise() );
            presenter.loadContacts();
            expect(view.onLoadContactsComplete).toHaveBeenCalled();
        });

        it("should call view's onLoadContactsError on loadContacts error", function () {
            model.loadContacts = jasmine.createSpy("loadContacts").and.returnValue( exerciseFakeKoPromise() );
            presenter.loadContacts();
            expect(view.onLoadContactsError).toHaveBeenCalled();
        });
    });


    describe("loadContactColumns",function(){
        beforeEach(function(){
            presenter.view = view;
            presenter.model = model;
            view.onLoadContactColumnsComplete = jasmine.createSpy("onLoadContactColumnsComplete");
        });

        it("should call view's onLoadContactColumnsComplete on loadContactColumns()", function(){
            model.loadContactColumns = jasmine.createSpy("loadContactColumns").and.returnValue( exerciseFakeOkPromise() );
            presenter.loadContactColumns();
            expect(view.onLoadContactColumnsComplete).toHaveBeenCalled();
        });
    });


});