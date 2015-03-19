/**
 * Created by kevin on 10/22/14.
 * Updated by trung.dang on 02/12/2015
 */
app.registerController(function (container) {
    var AccountView = container.getView("views/account/AccountView");

    function AccountController($scope, $modal) {
        AccountController.configureView($scope, $modal);
    }

    AccountController.configureView = function ($scope, $modal) {
        this.view = AccountView.newInstance($scope, $modal).getOrElse(throwException("Could not create AccountView!"));
        this.view.show();
    };

    return AccountController;
});
