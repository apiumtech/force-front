define([
    'app',
    'shared/services/ajax/AuthAjaxService',
    'modules/account/AccountService',
    'config'
], function (app, AuthAjaxService, AccountService, Configuration) {
    'use strict';

    function AddContactModel(authAjaxService, accountService, $uploadService) {
        this.authAjaxService = authAjaxService || AuthAjaxService._diResolve();
        this.accountService = accountService || AccountService._diResolve();
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

        return self.authAjaxService.rawAjaxRequest(params);
    };

    AddContactModel.prototype.uploadFile = function (file) {
        var self = this;

        var dev_token = "VNLSEIRUNSVLDNVHMCLSKD.JCMLSKJCRNXLKJSCRNXLSKJC.NXSKJDCRMNXKSJCDMNXC";


        return self.$uploadService.upload({
            url: Configuration.api.uploadFile,
            method: 'POST',
            file: file,
            headers: {
                token:dev_token
            }
        }).then(function (response) {
            return response.data;
        });
    };

    return AddContactModel;
});
