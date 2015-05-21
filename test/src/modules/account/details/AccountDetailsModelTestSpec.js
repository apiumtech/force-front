/**
 * Created by justin on 3/9/15.
 */
define([
    'modules/account/details/AccountDetailsModel',
    'config'
], function (AccountDetailsModel, Configuration) {
    'use strict';
    describe("AccountDetailsModel", function () {

        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = {
                rawAjaxRequest: function () {
                }
            };

            sut = AccountDetailsModel.newInstance(ajaxService);
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

        describe("getAccountSummary", function () {
            it("should call ajaxRequest with correct params", function () {
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                var id = 100;
                sut.getAccountSummary(id);
                expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.getAccountSummary.format(id));
                expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
            });
        });

        describe("updateAccountData", function () {
            it("should call ajaxRequest with correct params", function () {
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                var id = 100;
                var data = {name: "updatedname"};
                sut.updateAccountData(id, data);
                expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.updateAccount.format(id));
                expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('put');
                expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].data).toEqual(data);
            });
        });


        describe("toggleFollow", function () {
            it("should call rawAjaxRequest with correct url", function () {
                var toFollow = 10;
                spyOn(ajaxService, 'rawAjaxRequest');
                sut.toggleFollow(toFollow);
                expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.toggleFollow.format(10));
                expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('post');

            });
        });
    });

});