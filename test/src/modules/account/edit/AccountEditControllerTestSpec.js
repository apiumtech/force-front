/**
 * Created by justin on 3/19/15.
 */
define([
    'modules/account/edit/AccountEditController'
], function (AccountEditController) {
    'use strict';
    describe("AccountEditController", function () {

        var sut;

        it("should call configureView with correct params", function () {
            var scope = {thisIsFakeScope: true},
                $routeParams = {account_id: 10},
                $injector = {
                    get: function () {
                    }
                };
            AccountEditController.configureView = jasmine.createSpy();

            sut = new AccountEditController(scope, $routeParams, $injector);
            expect(AccountEditController.configureView).toHaveBeenCalledWith(scope);
        });
    });

});