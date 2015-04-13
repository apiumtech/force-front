/**
 * Created by justin on 3/4/15.
 */

describe("AccountModel", function () {
    var AccountModel = app.getModel('models/account/AccountModel');
    var Configuration = app.getService('Configuration');

    var sut;

    beforeEach(function () {
        sut = AccountModel.newInstance().getOrElse(throwInstantiateException(AccountModel));
    });

    describe("toggleFollow", function () {
        it("should call rawAjaxRequest with correct url", function () {
            var toFollow = {$loki: 10};
            spyOn(sut.ajaxService, 'rawAjaxRequest');
            sut.toggleFollow(toFollow);
            expect(sut.ajaxService.rawAjaxRequest).toHaveBeenCalled();
            expect(sut.ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.toggleFollow.format(10));
            expect(sut.ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('post');

        });
    });

    describe("loadTableFields", function () {
        it("should call getTableFields from data provider", function () {
            var fake = {
                then: function () {
                },
                resolve: function () {
                }
            };
            spyOn(sut.dataTableDataProvider, 'getTableFields').and.returnValue(fake);
            var actual = sut.loadTableFields();
            expect(sut.dataTableDataProvider.getTableFields).toHaveBeenCalled();
            expect(actual).toEqual(fake);
        });
    });
});