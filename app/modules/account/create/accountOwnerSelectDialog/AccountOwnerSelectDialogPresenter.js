define([
    'modules/account/create/accountOwnerSelectDialog/AccountOwnerSelectDialogModel'
], function (AccountOwnerSelectDialogModel) {
    'use strict';

    function AccountOwnerSelectDialogPresenter(model) {
        this.model = model || new AccountOwnerSelectDialogModel();
    }

    AccountOwnerSelectDialogPresenter.prototype.show = function(view) {

    };

    return AccountOwnerSelectDialogPresenter;
});