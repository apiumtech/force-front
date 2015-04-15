/**
 * Created by Justin on 4/3/2015.
 */
describe("StringTypeFilterModel", function () {
    var StringTypeFilterModel = app.getModel('models/filters/StringTypeFilterModel');
    var AjaxService = app.getService('services/AjaxService');

    var sut, ajaxService;

    beforeEach(function () {
        ajaxService = jasmineMock(AjaxService, 'ajaxService');

        sut = StringTypeFilterModel.newInstance(ajaxService).getOrElse(throwInstantiateException(StringTypeFilterModel));
    });

    describe("getFilterValues", function () {
        it("should call ajax.rawAjaxRequest", function () {
            ajaxService.rawAjaxRequest = function () {
            };
            spyOn(sut, 'decorateResponseData');
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
            sut.getFilterValues();
            expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
        });

        it('should call decorateResponseData upon success of ajax request', function () {
            ajaxService.rawAjaxRequest = function () {
            };
            spyOn(sut, 'decorateResponseData');
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
            sut.getFilterValues();
            expect(sut.decorateResponseData).toHaveBeenCalled();
        });
    });
});