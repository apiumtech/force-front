/**
 * Created by trung.dang on 02/13/2015
 */
define([
    'modules/account/filters/AccountFilter/AccountFilterController'
], function (FilterController) {
    'use strict';
    describe("AccountFilterController", function () {

        it("should call AccountFilterController.configureView global method", function () {
            var scope = {someScope: true};

            FilterController.configureView = jasmine.createSpy();
            var ctrl = new FilterController(scope);
            expect(FilterController.configureView).toHaveBeenCalledWith(scope);
        });
    });

});