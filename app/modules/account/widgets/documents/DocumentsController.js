/**
 * Created by justin on 4/14/15.
 */
app.registerController(function (container) {
    var DocumentsWidgetView = container.getView('views/accountDetails/DocumentsWidgetView');

    function DocumentsController($scope, $injector) {
        $scope.injector = $injector;
        DocumentsController.configureView($scope);
    }

    DocumentsController.configureView = function ($scope) {
        this.view = DocumentsWidgetView.newInstance($scope);
        this.view.show();
    };

    return DocumentsController;
});