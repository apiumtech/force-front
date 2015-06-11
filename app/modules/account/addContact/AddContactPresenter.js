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

        view.event.getAccountData = function(accountId){
            model.getAccountData(accountId).then(view.onAccountDataLoaded.bind(view), view.showError.bind(view));
        };

        view.event.onSaveContact = function(contactData){
            model.saveContact(contactData).then(view.onContactSaved.bind(view), view.showError.bind(view));
        };
    };

    app.di.register('addContactPresenter').as(AddContactPresenter).withConstructor();

    return AddContactPresenter;
});