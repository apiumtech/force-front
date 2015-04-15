/**
 * Created by justin on 3/16/15.
 */
app.registerModel(function (container) {
    var AjaxService = container.getService("services/FakeAjaxService");
    var Configuration = container.getService('Configuration');
    var _ = container.getFunction("underscore");

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
        this.ajaxService = ajaxService;
    }

    DocumentsWidgetModel.prototype = Object.create(Object.prototype);

    DocumentsWidgetModel.prototype.loadDocumentsData = function (accountId) {
        var self = this;

        var params = {
            url: Configuration.api.getDocuments.format(accountId),
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json',
            result: hardcodedData
        };

        return this.ajaxService.rawAjaxRequest(params)
            .then(self.decorateAgendaData.bind(self), function (error) {
                return error;
            });
    };

    DocumentsWidgetModel.prototype.updateDocument = function (documentId, data) {
        var params = {
            url: Configuration.api.updateDocument.format(documentId),
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json',
            result: {
                message: "ok"
            }
        };
        return this.ajaxService.rawAjaxRequest(params);
    };

    DocumentsWidgetModel.prototype.decorateAgendaData = function (data) {
        // TODO: Fake for now
        return data;
    };

    DocumentsWidgetModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));

        return Some(new DocumentsWidgetModel(ajaxService));
    };

    return DocumentsWidgetModel;
});