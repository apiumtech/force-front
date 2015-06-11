define([
    'app',
    'modules/account/addContact/AddContactModel'
], function (app, AddContactModel) {
    'use strict';

    function AddContactPresenter(addContactModel) {
        this.addContactModel = addContactModel;
    }

    AddContactPresenter.prototype.show = function (view) {
        var self = this;
        var model = self.addContactModel;

        view.event = view.event || {};

        view.event.onSaveContact = function (accountId, contactData) {
            model.saveContact(accountId, contactData)
                .then(view.onSaveContactSuccess.bind(view), view.showError.bind(view));
        };
    };

    app.di.register('addContactPresenter').as(AddContactPresenter).withConstructor();

    return AddContactPresenter;
});