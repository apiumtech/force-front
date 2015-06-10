define([
    'app',
    'shared/services/ajax/FakeAjaxService'
], function (app, AjaxService) {
    'use strict';

    function AddContactModel(ajaxService) {
        this.ajaxService = ajaxService || new AjaxService();
    }

    AddContactModel.prototype.saveContact = function (accountId, contactData) {
        return this.ajaxService.rawAjaxRequest({
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
