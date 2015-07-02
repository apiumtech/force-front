/**
 * Created by justin on 3/27/15.
 */
define([
    'shared/services/DataTableDataProvider'
], function (DataTableDataProvider) {
    'use strict';
    describe("DataTableDataProvider", function () {
        var sut;

        beforeEach(function () {
            sut = DataTableDataProvider.newInstance();
        });

        describe("getTableFields", function () {
            it("should return the fields configured in data", function () {
                spyOn(sut.authAjaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                sut.getTableFields();
                expect(sut.authAjaxService.rawAjaxRequest).toHaveBeenCalled();
            });
            it("should call decorateTableFields in return", function () {
                spyOn(sut.authAjaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                spyOn(sut, 'decorateTableFields').and.returnValue(exerciseFakeOkPromise());
                sut.getTableFields();
                expect(sut.decorateTableFields).toHaveBeenCalled();
            });
        });
    });
});