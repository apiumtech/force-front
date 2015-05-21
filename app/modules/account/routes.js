/**
 * Created by apium on 5/20/15.
 */

define([], function () {
    return {
        register: function ($routeProvider, resolveRoute) {
            $routeProvider

                .when('/accounts', resolveRoute('modules/account/AccountController', 'modules/account/account'))

                .when('/accounts/:account_id', resolveRoute('modules/account/details/AccountDetailsController',
                    'modules/account/details/accountDetails'))

                .when('/accounts/:account_id/edit', resolveRoute('modules/account/edit/AccountEditController',
                    'modules/account/edit/accountEdit'))

                .when('/account/create', resolveRoute('modules/account/create/AccountCreateController',
                    'modules/account/create/accountCreate'))

            ;
        }
    };
});