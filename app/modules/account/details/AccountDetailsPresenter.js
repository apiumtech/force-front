/**
 * Created by justin on 3/9/15.
 */
define([
    'modules/account/details/AccountDetailsModel'
], function (AccountDetailsModel) {

    function AccountDetailsPresenter(accountDetailsModel) {
        this.model = accountDetailsModel || AccountDetailsModel._diResolve();
    }

    AccountDetailsPresenter.prototype.show = function (view) {
        var self = this;
        view.event = view.event || {};

        self.view = view;

        view.event.onLoadAccount = function () {
            self.model.getAccountDetail(view.accountId)
                .then(view.onAccountLoaded.bind(view), view.showError.bind(view));
        };

        view.event.onToggleFollow = function () {
            self.model.toggleFollow(view.accountId)
                .then(view.onFollowToggled.bind(view), view.showError.bind(view));
        };

        view.event.onUpdateEmail = function (accountData) {
            self.model.updateAccountData(view.accountId, accountData)
                .then(view.onAccountUpdated.bind(view), view.showError.bind(view));
        };

        view.event.onRelateContactRequest = function (accountId, callback) {
            self.model.getAccountSummary(accountId)
                .then(callback.bind(view), view.showError.bind(view));
        };

        view.event.onDeleteAccount = function(accountId, callback){
            self.model.deleteAccount(accountId)
                .then(callback, view.showError.bind(view));
        };

        view.event.onSaveRelatedCompany = function(accountId, relatedCompany, callback){
            self.model.saveRelatedCompany(accountId, relatedCompany)
                .then(callback, view.showError.bind(view));
        };

        view.event.onLoadingRelatedContact = function(accountId){
            self.model.loadRelatedContact(accountId)
                .then(view.onRelatedContactLoaded.bind(view), view.showError.bind(view));
        }

        view.event.onLoadingRelatedCompany = function(accountId){
            self.model.loadRelatedCompany(accountId)
                .then(view.onRelatedCompanyLoaded.bind(view), view.showError.bind(view));
        }

    };

    return AccountDetailsPresenter;
});