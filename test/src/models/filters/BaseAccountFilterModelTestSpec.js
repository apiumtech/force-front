/**
 * Created by Justin on 4/3/2015.
 */
describe("BaseAccountFilterModel", function () {
    var BaseAccountFilterModel = app.getModel('models/filters/BaseAccountFilterModel');
    var Configuration = app.getService('Configuration');

    var sut, ajaxService;

    beforeEach(function () {
        ajaxService = {
            rawAjaxRequest: function () {
            }
        };
        sut = new BaseAccountFilterModel(ajaxService);
    });

    describe("getFilterValues", function () {
        describe("getting filter values", function () {
            it("should call rawAjaxService with correct params", function () {
                var filterName = 'accountName';
                var queryFilter = '';
                spyOn(ajaxService, 'rawAjaxRequest');
                sut.getFilterValues(filterName, queryFilter);
                expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.getFilterValues + "?filterName=accountName&queryString=");
            });
        });
    });
});