/**
 * Created by joanllenas on 3/31/15.
 */

define([
    'modules/contact/ContactPresenter'
], function (ContactPresenter) {
    'use strict';

    describe("ContactPresenter", function () {
        var presenter, view, model;
        beforeEach(function () {
            view = {
                data: {},
                event: {a:"a"},
                fn: {}
            };
            model = {};
            presenter = ContactPresenter.newInstance();
            presenter.show(view, model);
        });

        describe("loadContacts", function () {
            beforeEach(function () {
                view.onLoadContactsComplete = jasmine.createSpy();
                view.onLoadContactsError = jasmine.createSpy();
            });
            it("should call view's onLoadContactsComplete on loadContacts success", function () {
                model.loadContacts = jasmine.createSpy().and.returnValue(exerciseFakeOkPromise());
                view.event.loadContacts();
                expect(view.onLoadContactsComplete).toHaveBeenCalled();
            });

            it("should call view's onLoadContactsError on loadContacts error", function () {
                model.loadContacts = jasmine.createSpy().and.returnValue(exerciseFakeKoPromise());
                view.event.loadContacts();
                expect(view.onLoadContactsError).toHaveBeenCalled();
            });
        });

        it("should call view's onLoadContactColumnsComplete on loadContactColumns()", function () {
            view.onLoadContactColumnsComplete = jasmine.createSpy();
            model.loadContactColumns = jasmine.createSpy().and.returnValue(exerciseFakeOkPromise());
            view.event.loadContactColumns();
            expect(view.onLoadContactColumnsComplete).toHaveBeenCalled();
        });


    });
});
