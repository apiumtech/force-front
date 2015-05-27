define([
    'modules/saleAnalytics/reports/allReport/AllReportView'
], function (AllReportView) {
    'use strict';

    describe('AllReportView', function () {

        describe('construct', function () {
            it("should call configureEvents", function () {
                spyOn(AllReportView.prototype, 'configureEvents').and.callThrough();
                new AllReportView({}, {});
                expect(AllReportView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        var sut, presenter, scope;
        beforeEach(function () {

        });

        describe('configureEvents', function () {
            describe('fn.loadReports', function () {
                
            });
        });
    });
});