define([
    'app',
    'modules/saleAnalytics/reports/reportItem/ReportItemDirective',
    'modules/saleAnalytics/reports/reportItem/ReportItemController'
], function (app, ReportItemDirective, ReportItemController) {
    'use strict';

    describe('ReportItemDirective', function () {
        describe("Getting directive object", function () {
            var directiveObj;
            beforeEach(function () {
                directiveObj = new ReportItemDirective();
            });

            it("should restrict directive to Element and Attribute", function () {
                expect(directiveObj.restrict).toEqual("EA");
            });

            it("should link the ReportItemDirective to its controller", function () {
                expect(directiveObj.controller).toEqual('ReportItemController');
            });

            it("should assign correct templateUrl", function () {
                expect(directiveObj.templateUrl).toEqual('app/modules/saleAnalytics/reports/reportItem/reportItem.html');
            });
        });
    });
});