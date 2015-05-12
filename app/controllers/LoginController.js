/**
 * Created by joanllenas on 03/16/15.
 */

app.registerController(function(container) {
    var LoginView = container.getView("views/LoginView");

    function LoginController($scope, $location) {
        LoginController.configureView($scope, $location);
    }

    LoginController.configureView = function($scope, $location) {
        this.view = LoginView.newInstance($scope, undefined, undefined, $location);
        this.view.show();
    };


    return LoginController;
});
