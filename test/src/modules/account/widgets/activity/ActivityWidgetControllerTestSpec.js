/**
 * Created by justin on 3/9/15.
 */
define([
    'modules/account/widgets/activity/ActivityWidgetController'
], function (ActivityWidgetController) {
    'use strict';
    describe("ActivityWidgetController", function () {

        var sut;

        it("should call configureView with correct params", function () {
            var scope = {thisIsFakeScope: true},
                element = {find: 10};
            ActivityWidgetController.configureView = jasmine.createSpy();

            sut = new ActivityWidgetController(scope, element);
            expect(ActivityWidgetController.configureView).toHaveBeenCalledWith(scope, element);
        });
    });
});