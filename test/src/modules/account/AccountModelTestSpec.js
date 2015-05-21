/**
 * Created by justin on 3/4/15.
 */

define([
    'modules/account/AccountModel',
    'config'
], function(AccountModel, Configuration){

    'use strict';

    describe("AccountModel", function () {

        var sut;

        beforeEach(function () {
            sut = AccountModel.newInstance();
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

        describe("loadAccountsList", function () {
            var option = {
                startFilter: true
            };
            var requestData;
            beforeEach(function () {
                requestData = {};
                spyOn(sut, 'remapAccountListData');
            });
            describe("truthy option.startFilter", function () {
                it("should clear accountsList", function () {
                    sut.accountsList = [{
                        data: "something"
                    }];
                    sut.loadAccountsList(option, {}, doNothing, {});
                    expect(sut.accountsList).toEqual([]);
                });
            });

            it("should call ajaxRequest", function () {
                spyOn(sut.ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                sut.loadAccountsList(option, requestData, doNothing, {});
                expect(sut.ajaxService.rawAjaxRequest).toHaveBeenCalled();
                expect(sut.ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.dataTableRequest);
                expect(sut.ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('POST');
            });
        });
    });
});