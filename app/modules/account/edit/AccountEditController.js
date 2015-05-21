/**
 * Created by Justin on 3/19/2015.
 */
define([
    'app',
    'modules/account/edit/AccountEditView'
], function (app, AccountEditView) {

    function AccountEditController($scope, $routeParams, $injector) {
        $scope.accountId = $routeParams.account_id;
        $scope.$injector = $injector;
        $scope.$upload = $injector.get('$upload');
        $scope.$validation = $injector.get('$validation');
        AccountEditController.configureView($scope);
    }

    AccountEditController.configureView = function ($scope) {
        this.view = AccountEditView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('AccountEditController', ['$scope', '$element', AccountEditController]);

    return AccountEditController;
});