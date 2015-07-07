/**
 * Created by justin on 3/16/15.
 */
define([
    'config',
    'shared/services/ajax/AjaxService',
    'underscore'
], function (Configuration, AjaxService, _) {

    'use strict';

    function DocumentsWidgetModel(ajaxService) {
        this.authAjaxService = ajaxService || AjaxService._diResolve();
    }

    DocumentsWidgetModel.inherits(Object, {});

    DocumentsWidgetModel.prototype.loadDocumentsData = function (accountId) {
        var self = this;

        var params = {
            url: Configuration.api.getDocuments.format(accountId),
            type: 'GET',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.authAjaxService.rawAjaxRequest(params)
            .then(self.decorateDocumentData.bind(self), self.decorateError.bind(self));
    };

    DocumentsWidgetModel.prototype.updateDocument = function (document) {
        var params = {
            url: Configuration.api.updateDocument.format(document.id),
            type: 'PUT',
            contentType: 'application/json',
            accept: 'application/json',
            data: document
        };
        return this.authAjaxService.rawAjaxRequest(params);
    };

    DocumentsWidgetModel.prototype.deleteDocument = function (documentId) {
        var params = {
            url: Configuration.api.deleteDocument.format(documentId),
            type: 'DELETE',
            contentType: 'application/json',
            accept: 'application/json'
        };
        return this.authAjaxService.rawAjaxRequest(params);
    };

    DocumentsWidgetModel.prototype.decorateDocumentData = function (data) {
        // TODO: Fake for now
        return data;
    };

    DocumentsWidgetModel.prototype.decorateError = function (error) {
        return error;
    };

    DocumentsWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AjaxService._diResolve();

        return new DocumentsWidgetModel(ajaxService);
    };

    return DocumentsWidgetModel;
});