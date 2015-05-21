/**
 * Created by Justin on 4/3/2015.
 */
define([
    'modules/account/filters/BaseAccountFilterModel',
    'config'
], function (BaseAccountFilterModel, Configuration) {
    'use strict';
    describe("BaseAccountFilterModel", function () {

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
                    expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.getFilterValues + "?fieldName=accountName&queryString=");
                });
            });
        });
    });

});