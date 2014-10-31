/**
 * Created by kevin on 10/22/14.
 */
app.registerController(function (container) {
    var AccountView = container.getView("views/AccountView");

    function AccountController($scope) {
        this.view = AccountView.newInstance($scope).getOrElse(throwException("Could not create AccountView!"));
        this.view.show();
    }

    return AccountController;
});
