/**
 * Created by justin on 3/9/15.
 */
define([
    'modules/account/AccountService',
    'shared/services/ajax/AjaxService',
    'config'
], function (AccountService, AjaxService, Configuration) {
    'use strict';
    describe("AccountService", function () {

        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = mock(AjaxService);
            sut = new AccountService(ajaxService);
        });

        describe("getAccountDetail", function () {
            it("should call ajaxRequest with correct params", function () {
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                var id = 100;
                sut.getAccountDetail(id);
                expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.getAccount.format(id));
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

});