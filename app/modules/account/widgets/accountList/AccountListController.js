/**
 * Created by justin on 3/13/15.
 */
define([
    'app',
    'modules/account/widgets/accountList/AccountListView'
], function (app, AccountListView) {

    function AccountListController($scope, $element) {
        AccountListController.configureView($scope, $element);
    }

    AccountListController.configureView = function ($scope, $element) {
        this.view = AccountListView.newInstance($scope, $element);
        this.view.show();
    };

    app.register.controller('AccountListController', ['$scope', '$element', AccountListController]);

    return AccountListController;
});