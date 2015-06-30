/**
 * Created by justin on 3/9/15.
 */
define([
    'shared/services/AccountService',
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
                sut.getDetails(id);
                expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.getAccount.format(id));
                expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
            });
        });
    });

});