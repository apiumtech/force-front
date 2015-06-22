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

    };

    DocumentPreviewView.contractName = "documentPreviewView";

    app.di.register(DocumentPreviewView.contractName).as(DocumentPreviewView);

    return DocumentPreviewView;
});