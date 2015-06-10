/**
 * Created by Justin on 3/19/2015.
 */
define([
    'app',
    'modules/account/create/AccountCreateView'
], function (app, AccountCreateView) {

    function AccountCreateController($scope, $injector) {
        $scope.$injector = $injector;
        $scope.$upload = $injector.get('$upload');
        $scope.$validation = $injector.get('$validation');
        AccountCreateController.configureView($scope);
    }

    AccountCreateController.configureView = function ($scope) {
        if (!app.di.contains("$uploadService")) {
            app.di.register("$uploadService").instance($scope.$upload);
        }

        this.view = AccountCreateView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('AccountCreateController', ['$scope', '$injector', AccountCreateController]);

    return AccountCreateController;
});