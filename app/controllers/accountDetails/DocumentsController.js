/**
 * Created by justin on 4/14/15.
 */
app.registerController(function (container) {
    var DocumentsWidgetView = container.getView('views/accountDetails/DocumentsWidgetView');

    function DocumentsController($scope) {
        DocumentsController.configureView($scope);
    }

    DocumentsController.configureView = function ($scope) {
        this.view = DocumentsWidgetView.newInstance($scope).getOrElse(throwInstantiateException(DocumentsWidgetView));
        this.view.show();
    };

    return DocumentsController;
});