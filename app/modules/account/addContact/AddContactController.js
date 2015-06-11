define([
    'app',
    'shared/BaseController',
    'modules/account/addContact/AddContactView'
], function (app, BaseController, AddContactView) {
    'use strict';

    function AddContactController($scope, $routeParams) {
        $scope.accountId = $routeParams.account_id;
        BaseController.call(this);
        this.configureView($scope);
    }

    AddContactController.inherits(BaseController, {});

    AddContactController.prototype.configureView = function ($scope) {
        this.view = app.di.resolve('addContactView');
        this.triggerView(this.view, $scope);
    };

    app.register.controller('AddContactController', ['$scope', '$routeParams', '$route', AddContactController]);

    return AddContactController;
});