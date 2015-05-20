/**
 * Created by apium on 5/20/15.
 */

define([], function () {
    return {
        register: function ($routeProvider, resolveRoute) {
            $routeProvider.when('/', resolveRoute('modules/login/LoginController', 'modules/login/login'));
        }
    };
});