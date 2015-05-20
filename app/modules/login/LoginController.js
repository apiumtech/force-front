/**
 * Created by joanllenas on 03/16/15.
 */

define([
    'app',
    'modules/login/LoginView'
], function (app, LoginView) {

    function LoginController($scope, $location) {
        LoginController.configureView($scope, $location);
    }

    LoginController.configureView = function ($scope, $location) {
        this.view = LoginView.newInstance($scope, $location);
        this.view.show();
    };

    app.register.controller('LoginController', ['$scope', '$location', LoginController]);

    return LoginController;
});
