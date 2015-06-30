/**
 * Created by justin on 3/9/15.
 */
define([
    'modules/account/AccountService',
    'shared/services/ajax/AjaxService',
    'shared/services/ajax/FakeAjaxService',
    'config'
], function (AccountService, AjaxService, FakeAjaxService, Configuration) {

    function AccountDetailsModel(accountService, ajaxService, fakeAjaxService) {
        this.accountService = accountService || new AccountService();
        this.ajaxService = ajaxService || new AjaxService();
        this.fakeAjaxService = fakeAjaxService || new FakeAjaxService();
    }

    AccountDetailsModel.inherits(Object);

    AccountDetailsModel.prototype.getAccountDetail = function (id) {
        var self = this;
        return self.accountService.getAccountDetail(id);
    };

    AccountDetailsModel.prototype.getAccountSummary = function (id) {
        var self = this;
        var params = {
            url: Configuration.api.getAccountSummary.format(id),
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return self.ajaxService.rawAjaxRequest(params);
    };

    AccountDetailsModel.prototype.toggleFollow = function (accountId) {
        var self = this;
        var params = {
            url: Configuration.api.toggleFollow.format(accountId),
            type: 'post',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return self.ajaxService.rawAjaxRequest(params);
    };

    AccountDetailsModel.prototype.updateAccountData = function (accountId, accountData) {
        var self = this;
        var params = {
            url: Configuration.api.updateAccount.format(accountId),
            type: 'put',
            contentType: 'application/json',
            accept: 'application/json',
            data: accountData
        };

        return self.ajaxService.rawAjaxRequest(params);
    };

    AccountDetailsModel.prototype.loadRelatedContact = function (accountId) {
        var self = this;
        var params = {
            url: Configuration.api.getAccountRelatedContact.format(accountId),
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return self.ajaxService.rawAjaxRequest(params);
    };

    AccountDetailsModel.prototype.loadRelatedCompany = function (accountId) {
        var self = this;
        var params = {
            url: Configuration.api.getAccountRelatedCompany.format(accountId),
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return self.ajaxService.rawAjaxRequest(params);
    };

    AccountDetailsModel.prototype.deleteAccount = function(){
        console.log("Account deleted");
        return this.fakeAjaxService.rawAjaxRequest({
            result: {
            }
        });
    };

    AccountDetailsModel.prototype.saveRelatedCompany = function(accountId, relatedCompany){
        var self = this;
        var params = {
            url: Configuration.api.addAccountRelatedCompany.format(accountId),
            type: 'post',
            contentType: 'application/json',
            accept: 'application/json',
            data: relatedCompany
        };

        return self.ajaxService.rawAjaxRequest(params);
    };

    return AccountDetailsModel;
});