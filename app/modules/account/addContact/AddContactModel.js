define([
    'app',
    'shared/services/ajax/AjaxService',
    'modules/account/AccountService',
    'config'
], function (app, AjaxService, AccountService, Configuration) {
    'use strict';

    function AddContactModel(ajaxService, accountService, $uploadService) {
        this.ajaxService = ajaxService || new AjaxService();
        this.accountService = accountService || new AccountService();
        // @autowired
        this.$uploadService = $uploadService;
    }

    AddContactModel.prototype.getAccountData = function (id) {
        var self = this;
        return self.accountService.getAccountDetail(id);
    };

    AddContactModel.prototype.saveContact = function (accountId, contactData) {
        var self = this;
        var params = {
            url: Configuration.api.addAccountRelatedContact.format(accountId),
            type: 'post',
            contentType: 'application/json',
            accept: 'application/json',
            data: contactData
        };

        return self.ajaxService.rawAjaxRequest(params);
    };

    AddContactModel.prototype.uploadFile = function (file) {
        var self = this;
        return self.$uploadService.upload({
            url: Configuration.api.uploadFile,
            method: 'POST',
            file: file
        }).then(function (response) {
            return response.data;
        });
    };

    return AddContactModel;
});
