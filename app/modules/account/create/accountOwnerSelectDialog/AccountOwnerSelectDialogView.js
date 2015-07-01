define([
    'shared/BaseView',
    'modules/account/create/accountOwnerSelectDialog/AccountOwnerSelectDialogPresenter'
], function (BaseView, AccountOwnerSelectDialogPresenter) {
    'use strict';

    function AccountOwnerSelectDialogView($scope, presenter) {
        presenter = presenter || new AccountOwnerSelectDialogPresenter();
        BaseView.call(this, $scope, null, presenter);
    }

    AccountOwnerSelectDialogView.inherits(BaseView, {});

    AccountOwnerSelectDialogView.newInstance = function ($scope, model, presenter, viewRepaintAspect, logErrorAspect) {
        var view = new AccountOwnerSelectDialogView($scope, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return AccountOwnerSelectDialogView;
});