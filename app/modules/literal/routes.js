/**
 * Created by apium on 5/20/15.
 */

define([], function () {
    return {
        register: function ($routeProvider, resolveRoute) {
            $routeProvider


                .when('/literal-list', {
                    templateUrl: 'templates/literalList.html',
                    controller: 'LiteralListController'
                })
                .when('/literal/:literalId/edit', {
                    templateUrl: 'templates/literal/literal.html',
                    controller: 'LiteralController'
                })
                .when('/literal', {
                    templateUrl: 'templates/literal/literal.html',
                    controller: 'LiteralController'
                })


            ;
        }
    };
});