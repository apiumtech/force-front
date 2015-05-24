/**
 * Created by kevin on 10/22/14.
 * Updated by trung.dang on 02/12/2015
 */
define([
    'app',
    'modules/literal/LiteralView'
], function(app, LiteralView) {

    function LiteralController($routeParams, $scope) {
        LiteralController.configureView($routeParams, $scope);
    }

    LiteralController.configureView = function ($routeParams, $scope) {
        var view = LiteralView.newInstance({scope: $scope, routeParams: $routeParams});
        view.show();
    };

    app.register.controller('LiteralController', ['$routeParams', '$scope', LiteralController]);

    return LiteralController;
});
