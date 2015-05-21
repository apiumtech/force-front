/**
 * Created by justin on 2/4/15.
 */
define([
    'modules/account/filters/datetimeTypeFilter/DatetimeTypeFilterController'
], function (DatetimeTypeFilterController) {
    'use strict';
    describe("DatetimeTypeFilterController", function () {

        it("should call DatetimeTypeFilterController.configureView global method", function () {
            var scope = {someScope: true}, $element = {};

            DatetimeTypeFilterController.configureView = jasmine.createSpy();
            var ctrl = new DatetimeTypeFilterController(scope, $element);
            expect(DatetimeTypeFilterController.configureView).toHaveBeenCalledWith(scope, $element);
        });
    });

});