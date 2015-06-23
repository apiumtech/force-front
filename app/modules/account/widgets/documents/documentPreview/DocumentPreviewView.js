define([
    'app',
    'shared/BaseView',
    'modules/account/widgets/documents/documentPreview/DocumentPreviewPresenter'
], function (app, BaseView, DocumentPreviewPresenter) {
    'use strict';

    function DocumentPreviewView(documentPreviewPresenter, modalDialogAdapter, translatorService) {
        BaseView.call(this, null, null, documentPreviewPresenter);
        this.modalDialogAdapter = modalDialogAdapter;
        this.translator = translatorService;
        this.$modalInstance = null;
    }

    DocumentPreviewView.inherits(BaseView, {
        document: {
            get: function () {
                return this.$scope.document;
            },
            set: function (value) {
                this.$scope.document = value;
            }
        }
    });

    DocumentPreviewView.prototype.show = function () {
        this.__base__.show.call(this);
        this.configureEvents();
    };

    DocumentPreviewView.prototype.configureEvents = function () {
        var self = this;

        self.fn.onStarting = function () {

        };

        self.fn.closePreview = function () {
            self.$modalInstance.dismiss();
        };

        self.fn.deleteDocument = function () {
            self.modalDialogAdapter.confirm("Delete document",
                self.translator.translate("Documents.deleteDocumentConfirmationMsg", {documentName: self.document.name}),
                self.deletionConfirmed.bind(self, self.document),
                doNothing,
                self.translator.translate("Documents.deleteBtnConfirm"),
                self.translator.translate("Documents.cancelDelete"));
        };
    };

    DocumentPreviewView.prototype.deletionConfirmed = function (document) {
        console.log("deletion confirmed", document);
    };

    DocumentPreviewView.contractName = "documentPreviewView";

    app.di.register(DocumentPreviewView.contractName).as(DocumentPreviewView);

    return DocumentPreviewView;
});