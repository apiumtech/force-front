/**
 * Created by justin on 12/30/14.
 */

define([
    'modules/saleAnalytics/widgets/scatterChart/ConversionDiagramActivityWidgetController'
], function (ConversionDiagramActivityWidgetController) {
    'use strict';
    describe("ConversionDiagramActivityWidgetController", function () {

        it("should call ConversionDiagramActivityWidgetController.configureView global method", function () {
            var scope = {someScope: true},
                element = {};

            ConversionDiagramActivityWidgetController.configureView = jasmine.createSpy();
            var ctrl = new ConversionDiagramActivityWidgetController(scope, element);
            expect(ConversionDiagramActivityWidgetController.configureView).toHaveBeenCalledWith(scope, element);
        });
    });
});
