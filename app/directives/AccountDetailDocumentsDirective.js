/**
 * Created by justin on 3/13/15.
 */
app.registerDirective(function (container) {
    var DocumentsController = container.getController('controllers/accountDetails/DocumentsController');

    function AccountDetailDocumentsDirective() {
        return {
            restrict: "EA",
            controller: DocumentsController,
            scope: {
                accountId: "="
            },
            templateUrl: "templates/accountDetails/directives/documentsWidget.html"
        };

    }

    return AccountDetailDocumentsDirective;
});