/**
 * Created by justin on 2/4/15.
 */
define([
    'modules/account/filters/BooleanTypeFilter/BooleanTypeFilterController'
], function (BooleanTypeFilterController) {
    'use strict';
    describe("BooleanTypeFilterController", function () {

        it("should call BooleanTypeFilterController.configureView global method", function () {
            var scope = {someScope: true}, $element = {};

            BooleanTypeFilterController.configureView = jasmine.createSpy();
            var ctrl = new BooleanTypeFilterController(scope, $element);
            expect(BooleanTypeFilterController.configureView).toHaveBeenCalledWith(scope, $element);
        });
    });

});