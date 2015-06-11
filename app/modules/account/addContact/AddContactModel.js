define([
    'app',
    'shared/services/ajax/AjaxService',
    'modules/account/AccountService'
], function (app, AjaxService, AccountService) {
    'use strict';

    function AddContactModel(ajaxService, accountService) {
        this.ajaxService = ajaxService;
        this.accountService = accountService || new AccountService();
    }

    AddContactModel.prototype.getAccountData = function(id){
        var self = this;
        return self.accountService.getAccountDetail(id);
    };

    AddContactModel.prototype.saveContact = function(contactData){
        var self = this;
        return self.ajaxService.rawAjaxRequest({
            result: {
            }
        });
    };

    app.di.register('addContactModel')
        .as(AddContactModel)
        .withConstructor();

    return AddContactModel;
});
