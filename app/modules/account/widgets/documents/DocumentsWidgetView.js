/**
 * Created by justin on 4/14/15.
 */
define([
    'shared/BaseView',
    'shared/services/ModalDialogAdapter',
    'shared/services/TranslatorService',

    'shared/services/bus/AccountDetailWidgetEventBus',
    'modules/account/widgets/documents/DocumentsWidgetModel',
    'modules/account/widgets/documents/DocumentsWidgetPresenter',
    'modules/account/widgets/documents/documentPreview/DocumentPreviewController'
], function (BaseView, ModalDialogAdapter, TranslatorService, AccountDetailWidgetEventBus, DocumentsWidgetModel, DocumentsWidgetPresenter) {

    'use strict';

    function DocumentsWidgetView($scope, model, presenter, modalDialogService) {
        BaseView.call(this, $scope, model, presenter);
        this.modalDialogService = modalDialogService;
        this.data.documentsList = [];
        this.translator = TranslatorService.newInstance();
    }

    DocumentsWidgetView.inherits(BaseView, {
        eventChannel: {
            get: function () {
                return this.$scope.eventChannel || (this.$scope.eventChannel = AccountDetailWidgetEventBus.newInstance());
            },
            set: function (value) {
                this.$scope.eventChannel = value;
            }
        }
    });

    DocumentsWidgetView.prototype.show = function () {
        this.__base__.show.call(this);
        this.configureEvents();
    };

    DocumentsWidgetView.prototype.configureEvents = function () {
        var self = this;
        var eventChannel = self.eventChannel;

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));
        self.fn.saveRecordName = function (record) {
            self.event.onSaveDocument(record);
            record.editing = false;
        };

        self.fn.startEditing = function (record) {
            record._name = record.name;
            record.editing = true;
        };

        self.fn.cancelEditing = function (record) {
            record.name = record._name;
            record.editing = false;
            delete record._name;
        };

        self.fn.deleteDocument = function (record) {
            debugger;
            self.modalDialogService.confirm("Delete document",
                self.translator.translate("Documents.deleteDocumentConfirmationMsg", {documentName: record.name}),
                self.deletionConfirmed.bind(self, record),
                doNothing,
                self.translator.translate("Documents.deleteBtnConfirm"),
                self.translator.translate("Documents.cancelDelete"));
        };

        self.fn.openAddDocumentDialog = function () {
            var option = {
                templateUrl: 'app/modules/account/widgets/documents/documentUpload/documentUpload.html',
                //backdrop: 'static',
                keyboard: true,
                controller: 'DocumentUploadController',
                size: 'lg'
            };
            var modalInstance = self.modalDialogService.open(option);
            modalInstance.result.then(self.onAddDocumentDialogClosed.bind(self));
        };

        self.fn.previewDocument = function (document) {
            self.modalDialogService.open({
                templateUrl: 'app/modules/account/widgets/documents/documentPreview/previewDialog.html',
                windowTemplateUrl: 'app/modules/account/widgets/documents/documentPreview/previewDialogWindow.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'DocumentPreviewController',
                resolve: {
                    document: function () {
                        return document;
                    }
                }
            });
        };

        self.$scope.$watch("accountId", self.onAccountIdChanged.bind(self));
        self.$scope.$on("$destroy", self.onDisposing.bind(self));
    };

    DocumentsWidgetView.prototype.onAddDocumentDialogClosed = function (status) {
        var self = this;
        if (status === "success") {
            self.eventChannel.sendReloadCommand();
        }
    };

    DocumentsWidgetView.prototype.deletionConfirmed = function (record) {
        var self = this;
        self.event.onDeletionConfirmed(record.id);
    };

    DocumentsWidgetView.prototype.onDocumentDeleted = function () {
        var self = this;
        self.eventChannel.sendReloadCommand();
    };

    DocumentsWidgetView.prototype.onDocumentUpdated = function () {
        var self = this;
        self.eventChannel.sendReloadCommand();
    };

    DocumentsWidgetView.prototype.onAccountIdChanged = function () {
        var self = this;
        var value = self.$scope.accountId;

        value && self.eventChannel.sendReloadCommand();
    };

    DocumentsWidgetView.prototype.onReloadCommandReceived = function () {
        var self = this;
        self.event.onLoadDocument(self.$scope.accountId);
    };

    DocumentsWidgetView.prototype.onDocumentsLoaded = function (data) {
        var self = this;
        self.eventChannel.sendReloadCompleteCommand();
        self.data.documentsList = data.map(function (record) {
            record.editing = false;
            return record;
        });
    };

    DocumentsWidgetView.prototype.onDisposing = function () {
        var self = this;
        self.eventChannel.unsubscribeReloadCommand();
        self.eventChannel.unsubscribeReloadCompleteCommand();
        self.eventChannel = null;
    };

    DocumentsWidgetView.newInstance = function ($scope, model, presenter, viewRepaintAspect, logErrorAspect) {
        var modal = $scope.injector.get("$modal");

        var modalDialog = ModalDialogAdapter.newInstance(modal);

        model = model || DocumentsWidgetModel.newInstance();
        presenter = presenter || DocumentsWidgetPresenter.newInstance();

        var view = new DocumentsWidgetView($scope, model, presenter, modalDialog);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return DocumentsWidgetView;
});