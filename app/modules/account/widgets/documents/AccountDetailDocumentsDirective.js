/**
 * Created by justin on 3/13/15.
 */
define([
    'app',
    'modules/account/widgets/documents/DocumentsController'
], function (app, DocumentsController) {

    'use strict';

    function AccountDetailDocumentsDirective() {
        return {
            restrict: "EA",
            controller: DocumentsController,
            scope: {
                accountId: "="
            },
            templateUrl: "app/modules/account/widgets/documents/documentsWidget.html"
        };

    }

    app.register.directive('accountDetailDocuments', [AccountDetailDocumentsDirective]);

    return AccountDetailDocumentsDirective;
});