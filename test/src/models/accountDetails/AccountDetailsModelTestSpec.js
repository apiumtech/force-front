/**
 * Created by justin on 3/9/15.
 */
describe("AccountDetailsModel", function () {
    var AccountDetailsModel = app.getModel("models/accountDetails/AccountDetailsModel");
    var Configuration = app.getService('Configuration');

    var sut, ajaxService;

    beforeEach(function () {
        ajaxService = {
            rawAjaxRequest: function () {
            }
        };

        sut = AccountDetailsModel.newInstance(ajaxService).getOrElse(throwInstantiateException(AccountDetailsModel));
    });

    describe("getAccountDetail", function () {
        it("should call ajaxRequest with correct params", function () {
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
            var id = 100;
            sut.getAccountDetail(id);
            expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.getAccount + '/' + id);
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
        });

        it("should call decorateAccountDetailData to decorate response data", function () {
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
            spyOn(sut, 'decorateAccountDetailData');
            var id = 100;
            sut.getAccountDetail(id);
            expect(sut.decorateAccountDetailData).toHaveBeenCalled();
        });
    });
});