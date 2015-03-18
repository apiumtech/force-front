/**
 * Created by justin on 3/18/15.
 */
describe("AgendaWidgetModel", function () {
    var AgendaWidgetModel = app.getModel("models/accountDetails/AgendaWidgetModel");
    var Configuration = app.getService('Configuration');

    var sut, ajaxService;

    beforeEach(function () {
        ajaxService = {
            rawAjaxRequest: function () {
            }
        };

        sut = AgendaWidgetModel.newInstance(ajaxService).getOrElse(throwInstantiateException(AgendaWidgetModel));
    });

    describe("loadAgendaData", function () {
        [{
            id: 100,
            expectUrl: Configuration.api.getAgenda + '/100'
        }].forEach(function (test) {
                it("should call ajaxRequest with correct params", function () {
                    spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                    var id = test.id;
                    sut.loadAgendaData(id);
                    expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                    expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.expectUrl);
                    expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
                });
            });

        it("should call decorateAgendaData to decorate response data", function () {
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
            spyOn(sut, 'decorateAgendaData');
            var id = 100;
            sut.loadAgendaData(id);
            expect(sut.decorateAgendaData).toHaveBeenCalled();
        });
    });
});