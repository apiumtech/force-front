/**
 * Created by justin on 2/4/15.
 */

define([
    'modules/account/filters/stringTypeFilter/StringTypeFilterController'
], function (StringTypeFilterController) {
    'use strict';
    describe("StringTypeFilterController", function () {

        it("should call StringTypeFilterController.configureView global method", function () {
            var scope = {someScope: true}, $element = {};

            StringTypeFilterController.configureView = jasmine.createSpy();
            var ctrl = new StringTypeFilterController(scope, $element);
            expect(StringTypeFilterController.configureView).toHaveBeenCalledWith(scope, $element);
        });
    });

});

