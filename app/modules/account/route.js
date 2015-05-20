/**
 * Created by apium on 5/20/15.
 */

define([], function () {
    return {
        register: function ($routeProvider, resolveRoute) {
            $routeProvider.when('/account', resolveRoute('modules/account/AccountController', 'modules/account/account'));
        }
    };
});