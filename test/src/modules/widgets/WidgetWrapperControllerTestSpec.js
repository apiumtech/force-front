/**
 * Created by justin on 3/9/15.
 */

define([
    'modules/widgets/WidgetWrapperController'
], function (WidgetWrapperController) {
    'use strict';
    describe("WidgetWrapperController", function () {

        var sut;

        it("should call configureView with correct params", function () {
            var scope = {thisIsFakeScope: true},
                element = {account_id: 10};

            WidgetWrapperController.configureView = jasmine.createSpy();

            sut = new WidgetWrapperController(scope, element);
            expect(WidgetWrapperController.configureView).toHaveBeenCalledWith(scope, element);
        });
    });

});

