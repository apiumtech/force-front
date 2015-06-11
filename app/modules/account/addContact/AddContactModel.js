define([
    'app',
    'shared/services/ajax/FakeAjaxService',
    'modules/account/AccountService',
    'config'
], function (app, AjaxService, AccountService, Configuration) {
    'use strict';

    function AddContactModel(fakeAjaxService, accountService, $uploadService) {
        this.fakeAjaxService = fakeAjaxService || new AjaxService();
        this.accountService = accountService || new AccountService();
        // @autowired
        this.$uploadService = $uploadService;
    }

    AddContactModel.prototype.getAccountData = function (id) {
        var self = this;
        return self.accountService.getAccountDetail(id);
    };

    AddContactModel.prototype.saveContact = function (contactData) {
        return this.fakeAjaxService.rawAjaxRequest({
            result: {
                status: "OK",
                data: contactData
            }
        });
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

    app.di.register('addContactModel')
        .as(AddContactModel)
        .withConstructor();

    return AddContactModel;
});
