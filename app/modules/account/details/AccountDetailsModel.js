/**
 * Created by justin on 3/9/15.
 */
define([
    'shared/services/ajax/AjaxService',
    'shared/services/ajax/FakeAjaxService',
    'config'
], function (AjaxService, FakeAjaxService, Configuration) {

    function AccountDetailsModel(ajaxService, fakeAjaxService) {
        this.ajaxService = ajaxService || new AjaxService();
        this.fakeAjaxService = fakeAjaxService || new FakeAjaxService();
    }

    AccountDetailsModel.inherits(Object);

    AccountDetailsModel.prototype.getAccountDetail = function (id) {
        var self = this;
        var params = {
            url: Configuration.api.getAccount.format(id),
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return self.ajaxService.rawAjaxRequest(params).then(self.decorateAccountDetailData.bind(self));
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

    AccountDetailsModel.prototype.deleteAccount = function(){
        console.log("Account deleted");
        return this.fakeAjaxService.rawAjaxRequest({
            result: {
            }
        });
    };

    AccountDetailsModel.prototype.saveRelatedCompany = function(accountId, relatedCompany){
        return this.fakeAjaxService.rawAjaxRequest({
            result: {
                relatedCompany: relatedCompany
            }
        });
    };

    AccountDetailsModel.prototype.decorateAccountDetailData = function (data) {
        // TODO: Fake for now
        return data;
    };

    return AccountDetailsModel;
});