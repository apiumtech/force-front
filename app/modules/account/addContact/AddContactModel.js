define([
    'app',
    'shared/services/ajax/FakeAjaxService'
], function (app, AjaxService) {
    'use strict';

    function AddContactModel(fakeAjaxService) {
        this.fakeAjaxService = fakeAjaxService || new AjaxService();
    }

    AddContactModel.prototype.saveContact = function (accountId, contactData) {
        return this.fakeAjaxService.rawAjaxRequest({
            result: {
                status: "OK",
                data: contactData
            }
        });
    };

    app.di.register('addContactModel')
        .as(AddContactModel)
        .withConstructor();

    return AddContactModel;
});
