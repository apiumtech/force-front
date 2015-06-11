define([
    'app',
    'shared/services/ajax/FakeAjaxService',
    'modules/account/AccountService'
], function (app, AjaxService, AccountService) {
    'use strict';

    function AddContactModel(fakeAjaxService, accountService) {
        this.fakeAjaxService = fakeAjaxService || new AjaxService();
        this.accountService = accountService || new AccountService();
    }

    AddContactModel.prototype.getAccountData = function(id){
        var self = this;
        return self.accountService.getAccountDetail(id);
    };

    AddContactModel.prototype.saveContact = function(contactData){
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
