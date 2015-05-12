/**
 * Created by justin on 4/16/15.
 */
describe("DocumentsWidgetModel", function () {
    var DocumentsWidgetModel = app.getModel("models/accountDetails/DocumentsWidgetModel");
    var Configuration = app.getService('Configuration');

    var sut, ajaxService;

    beforeEach(function () {
        ajaxService = {
            rawAjaxRequest: exerciseFakeOkPromise
        };

        sut = DocumentsWidgetModel.newInstance(ajaxService);
    });

    describe("loadDocumentsData", function () {
        it("should call ajaxRequest from service with correct params", function () {
            spyOn(ajaxService, 'rawAjaxRequest').and.callThrough();
            sut.loadDocumentsData(1);
            expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.getDocuments.format(1));
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('GET');
        });

        it("should call decorateDocumentData upon success", function () {
            spyOn(ajaxService, 'rawAjaxRequest').and.callFake(function () {
                var promise = {
                    then: function (a, b) {
                        a();
                        return promise;
                    }
                };
                return promise;
            });

            spyOn(sut, 'decorateDocumentData');

            sut.loadDocumentsData(1);
            expect(sut.decorateDocumentData).toHaveBeenCalled();
        });
    });

    describe("updateDocument", function () {
        it("should call ajaxRequest from service with correct params", function () {
            spyOn(ajaxService, 'rawAjaxRequest').and.callThrough();
            var document = {id: 1, name: "newName"};
            sut.updateDocument(document);
            expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.updateDocument.format(1));
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('PUT');
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].data).toEqual(document);
        });
    });

    describe("deleteDocument", function () {
        it("should call ajaxRequest from service with correct params", function () {
            spyOn(ajaxService, 'rawAjaxRequest').and.callThrough();
            sut.deleteDocument(1);
            expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.deleteDocument.format(1));
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('DELETE');
        });
    });
});