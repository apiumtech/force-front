/**
 * Created by apiumtech on 6/19/2015.
 */
define([
    'app',
    'modules/account/widgets/accountList/AccountListController',
    'modules/widgets/WidgetWrapperDirective'
], function (app, AccountListController) {

    function AccountListDirective() {
        return {
            restrict: "EA",
            controller: AccountListController,
            scope: {
                accountId: "="
            },
            templateUrl: "app/modules/account/widgets/accountList/accountList.html"
        };
    }

    app.register.directive('accountList', [AccountListDirective]);

    return AccountListDirective;
});