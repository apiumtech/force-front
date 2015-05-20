/**
 * Created by apium on 5/20/15.
 */

define([], function () {
    return {
        register: function ($routeProvider, resolveRoute) {
            $routeProvider.when('/accounts', resolveRoute('modules/account/AccountController', 'modules/account/account'));

            $routeProvider.when('/accounts/:account_id',
                resolveRoute('modules/account/details/AccountDetailsController', 'modules/account/details/accountDetails'));
        }
    };
});