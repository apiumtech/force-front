/**
 * Created by Justin on 3/19/2015.
 */
app.registerController(function (container) {
    var AccountCreateView = container.getView("views/accountDetails/AccountCreateView");

    function AccountCreateController($scope, $injector) {
        $scope.$injector = $injector;
        $scope.$upload = $injector.get('$upload');
        $scope.$validation = $injector.get('$validation');
        AccountCreateController.configureView($scope);
    }

    AccountCreateController.configureView = function ($scope) {
        this.view = AccountCreateView.newInstance($scope).getOrElse(throwInstantiateException(AccountCreateView));
        this.view.show();
    };

    return AccountCreateController;
});