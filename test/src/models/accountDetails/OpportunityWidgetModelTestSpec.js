/**
 * Created by justin on 3/9/15.
 */
describe("OpportunityWidgetModel", function () {
    var OpportunityWidgetModel = app.getModel("models/accountDetails/OpportunityWidgetModel");
    var Configuration = app.getService('Configuration');

    var sut, ajaxService;

    beforeEach(function () {
        ajaxService = {
            rawAjaxRequest: function () {
            }
        };

        sut = OpportunityWidgetModel.newInstance(ajaxService).getOrElse(throwInstantiateException(OpportunityWidgetModel));
    });

    describe("loadOpportunities", function () {
        [{
            id: 100,
            expectUrl: Configuration.api.getOpportunities + '/100'
        }].forEach(function (test) {
                it("should call ajaxRequest with correct params", function () {
                    spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                    var id = test.id;
                    sut.loadOpportunities(id);
                    expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                    expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.expectUrl);
                    expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
                });
            });

        it("should call decorateOpportunityData to decorate response data", function () {
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
            spyOn(sut, 'decorateOpportunityData');
            var id = 100;
            sut.loadOpportunities(id);
            expect(sut.decorateOpportunityData).toHaveBeenCalled();
        });
    });
});