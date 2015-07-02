/**
 * Created by justin on 3/16/15.
 */
define([
    'config',
    // TODO: Change to this in production code
    //'shared/services/ajax/AjaxService',
    'shared/services/ajax/FakeAjaxService',
    'underscore'
], function (Configuration, AjaxService, _) {

    'use strict';

    // TODO: Remove in production code
    var hardcodedData = [{
        "id": 1,
        "name": "Nombre documento",
        "date": "2015-04-14T17:00:00.000Z"
    }, {
        id: 2,
        name: "Nombre documento",
        date: "2015-04-14T17:00:00.000Z"
    }, {
        "id": 3,
        "name": "Nombre documento",
        "date": "2015-04-14T17:00:00.000Z"
    }, {
        "id": 4,
        "name": "Nombre documento",
        "date": "2015-04-14T17:00:00.000Z"
    }];

    function DocumentsWidgetModel(ajaxService) {
        this.authAjaxService = ajaxService;
    }

    DocumentsWidgetModel.inherits(Object, {});

    DocumentsWidgetModel.prototype.loadDocumentsData = function (accountId) {
        var self = this;

        var params = {
            url: Configuration.api.getDocuments.format(accountId),
            type: 'GET',
            contentType: 'application/json',
            accept: 'application/json'
            // TODO : Remove in production code
            , result: hardcodedData
        };

        return this.authAjaxService.rawAjaxRequest(params)
            .then(self.decorateDocumentData.bind(self), self.decorateError.bind(self));
    };

    DocumentsWidgetModel.prototype.updateDocument = function (document) {
        // TODO : Remove in production code
        (function () {
            var d = _.find(hardcodedData, function (r) {
                return r.id == document.id;
            });

            d.name = document.name;
        })();

        var params = {
            url: Configuration.api.updateDocument.format(document.id),
            type: 'PUT',
            contentType: 'application/json',
            accept: 'application/json',
            data: document

            // TODO : Remove in production code
            , result: {
                message: "ok"
            }
        };
        return this.authAjaxService.rawAjaxRequest(params);
    };

    DocumentsWidgetModel.prototype.deleteDocument = function (documentId) {
        // TODO : Remove in production code
        (function () {
            hardcodedData = _.filter(hardcodedData, function (r) {
                return r.id !== documentId;
            });
        })();
        var params = {
            url: Configuration.api.deleteDocument.format(documentId),
            type: 'DELETE',
            contentType: 'application/json',
            accept: 'application/json'

            // TODO : Remove in production code
            , result: {
                message: "ok"
            }
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
        ajaxService = ajaxService || AjaxService.newInstance();

        return new DocumentsWidgetModel(ajaxService);
    };

    return DocumentsWidgetModel;
});