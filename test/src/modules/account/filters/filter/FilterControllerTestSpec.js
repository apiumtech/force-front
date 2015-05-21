/**
 * Created by kevin on 11/6/14.
 */
define([
    'modules/account/filters/filter/FilterController'
], function (FilterController) {
    'use strict';
    describe("FilterController", function () {

        it("should call FilterController.configureView global method", function () {
            var scope = {someScope: true};

            FilterController.configureView = jasmine.createSpy();
            var ctrl = new FilterController(scope);
            expect(FilterController.configureView).toHaveBeenCalledWith(scope);
        });
    });

});