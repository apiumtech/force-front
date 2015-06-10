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
    };

    app.di.register('addContactPresenter').as(AddContactPresenter).withConstructor();

    return AddContactPresenter;
});