/**
 * Created by justin on 3/4/15.
 */

describe("AccountModel", function () {
    var AccountModel = app.getModel('models/account/AccountModel');
    var Configuration = app.getService('Configuration');

    var sut, ajaxService;

    beforeEach(function () {
        ajaxService = {
            rawAjaxRequest: function () {
            }
        };
        sut = AccountModel.newInstance(ajaxService).getOrElse(throwInstantiateException(AccountModel));
    });

    describe("toggleFollow", function () {
        it("should call rawAjaxRequest with correct url", function () {
            var toFollow = {$loki: 10};
            spyOn(ajaxService, 'rawAjaxRequest');
            sut.toggleFollow(toFollow);
            expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.toggleFollow + "/" + 10);
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('post');

        });
    });
});

