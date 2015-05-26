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
    });
});