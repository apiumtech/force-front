/**
 * Created by justin on 4/14/15.
 */
define([
    'app',
    'modules/account/widgets/documents/DocumentsWidgetView'
], function (app, DocumentsWidgetView) {

    'use strict';

    function DocumentsController($scope, $injector) {
        $scope.injector = $injector;
        DocumentsController.configureView($scope);
    }

    DocumentsController.configureView = function ($scope) {
        this.view = DocumentsWidgetView.newInstance($scope);
        this.view.show();
    };

    app.register.controller('DocumentsController', ['$scope', '$injector', DocumentsController]);

    return DocumentsController;
});