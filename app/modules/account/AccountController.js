/**
 * Created by kevin on 10/22/14.
 */
app.registerController(function (container) {
    var AccountView = container.getView("views/account/AccountView");

    function AccountController($scope) {
        AccountController.configureView($scope);
    }

    AccountController.configureView = function ($scope) {
        this.view = AccountView.newInstance($scope);
        this.view.show();
    };

    return AccountController;
});
