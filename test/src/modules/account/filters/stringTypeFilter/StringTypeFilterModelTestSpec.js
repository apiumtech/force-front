/**
 * Created by Justin on 4/3/2015.
 */
define([
    'modules/account/filters/stringTypeFilter/StringTypeFilterModel',
    'shared/services/ajax/AjaxService',
], function (StringTypeFilterModel, AjaxService) {
    'use strict';
    describe("StringTypeFilterModel", function () {

        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = mock(AjaxService, 'ajaxService');

            sut = StringTypeFilterModel.newInstance(ajaxService);
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

});