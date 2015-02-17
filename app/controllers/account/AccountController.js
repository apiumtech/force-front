/**
 * Created by kevin on 10/22/14.
 * Updated by trung.dang on 02/12/2015
 */
app.registerController(function (container) {
    var AccountView = container.getView("views/account/AccountView");

    function AccountController($scope) {
        AccountController.configureView($scope);
    }

    AccountController.configureView = function ($scope) {
        this.view = AccountView.newInstance($scope).getOrElse(throwException("Could not create AccountView!"));
        this.view.show();
    };

    return AccountController;
});
