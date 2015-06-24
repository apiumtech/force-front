define([
    'app',
    'modules/account/widgets/agenda/addEventDialog/AddEventDialogView',
], function (app, AddEventDialogView) {
    'use strict';

    function AddEventDialogController($scope, $modalInstance, eventType) {
        $scope.event = {
            type: eventType
        };
        AddEventDialogController.configureView($scope, $modalInstance);
    }

    AddEventDialogController.configureView = function ($scope, $modalInstance) {
        this.view = AddEventDialogView.newInstance($scope, $modalInstance);
        this.view.show();
    };

    app.register.controller('AddEventDialogController', ['$scope', '$modalInstance', 'eventType', AddEventDialogController]);

    return AddEventDialogController;
});