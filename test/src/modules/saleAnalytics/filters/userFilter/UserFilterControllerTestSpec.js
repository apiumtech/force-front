define([
    'modules/saleAnalytics/filters/userFilter/UserFilterController'
], function (UserFilterController) {
    'use strict';

    describe('UserFilterController', function () {
        it("should call UserFilterController.configureView global method", function () {
            var scope = {someScope: true};
            sinon.stub(UserFilterController, 'configureView');

            var ctrl = new UserFilterController(scope);
            expect(UserFilterController.configureView).toHaveBeenCalledWith(scope);
            UserFilterController.configureView.restore();
        });

    });
});