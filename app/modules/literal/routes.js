/**
 * Created by apium on 5/20/15.
 */

define([], function () {
    return {
        register: function ($routeProvider, resolveRoute) {
            $routeProvider

                .when('/literal-list', resolveRoute('modules/literal/LiteralListController', 'modules/literal/literalList'))

                .when('/literal/:literalId/edit', resolveRoute('modules/literal/edit-create/LiteralController', 'modules/literal/edit-create/literal'))

                .when('/literal', resolveRoute('modules/literal/edit-create/LiteralController', 'modules/literal/edit-create/literal'))
            ;
        }
    };
});