/**
 * Created by kevin on 10/22/14.
 */
define([
    'app',
    'modules/account/AccountView',
    'modules/account/filters/accountFilter/AccountFilterController',
    'shared/components/sortableComponent/ng-sortable',
    'modules/account/widgets/accountList/AccountListDirective'
], function (app, AccountView) {

    function AccountController($scope) {
        AccountController.configureView($scope);
    }

    AccountController.configureView = function ($scope) {
        this.view = AccountView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('AccountController', ['$scope', AccountController]);

    return AccountController;
});
