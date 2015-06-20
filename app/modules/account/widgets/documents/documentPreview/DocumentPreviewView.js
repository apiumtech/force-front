define([
    'app',
    'shared/BaseView',
    'modules/account/widgets/documents/documentPreview/DocumentPreviewPresenter'
], function (app, BaseView, DocumentPreviewPresenter) {
    'use strict';

    function DocumentPreviewView(documentPreviewPresenter) {
        BaseView.call(this, null, null, documentPreviewPresenter);

        this.$modalInstance = null;
    }

    DocumentPreviewView.inherits(BaseView, {});

    DocumentPreviewView.prototype.configureEvents = function () {
        var self = this;

        self.fn.onStarting = function() {

        };
    };

    DocumentPreviewView.contractName = "documentPreviewView";

    app.di.register(DocumentPreviewView.contractName).as(DocumentPreviewView);

    return DocumentPreviewView;
});