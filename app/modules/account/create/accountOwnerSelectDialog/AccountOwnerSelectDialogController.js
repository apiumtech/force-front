define([
    'app',
    'modules/account/create/accountOwnerSelectDialog/AccountOwnerSelectDialogView'
], function (app, AccountOwnerSelectDialogView) {
    'use strict';

    function AccountOwnerSelectDialogController($scope) {
        AccountOwnerSelectDialogController.configureView($scope);
    }

    AccountOwnerSelectDialogController.configureView = function ($scope) {
        this.view = AccountOwnerSelectDialogView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('AccountOwnerSelectDialogController', ['$scope', AccountOwnerSelectDialogController]);

    return AccountOwnerSelectDialogController;
});