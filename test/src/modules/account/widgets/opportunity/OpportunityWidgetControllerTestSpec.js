/**
 * Created by justin on 3/9/15.
 */
define([
    'modules/account/widgets/opportunity/OpportunityWidgetController'
], function (OpportunityWidgetController) {
    'use strict';
    describe("OpportunityWidgetController", function () {

        var sut;

        it("should call configureView with correct params", function () {
            var scope = {thisIsFakeScope: true},
                element = {find: 10};
            OpportunityWidgetController.configureView = jasmine.createSpy();

            sut = new OpportunityWidgetController(scope, element);
            expect(OpportunityWidgetController.configureView).toHaveBeenCalledWith(scope, element);
        });
    });

});