/**
 * Created by justin on 3/9/15.
 */
define([
    'modules/account/details/AccountDetailsController'
], function (AccountDetailsController) {
    'use strict';
    describe("AccountDetailsController", function () {

        var sut;

        it("should call configureView with correct params", function () {
            var scope = {thisIsFakeScope: true},
                modal = {},
                routeParams = {account_id: 10};
            AccountDetailsController.configureView = jasmine.createSpy();

            sut = new AccountDetailsController(scope, modal, routeParams);
            expect(AccountDetailsController.configureView).toHaveBeenCalledWith(scope, modal);
        });

        it("should assign accountId to scope for later use in View", function () {
            var scope = {thisIsFakeScope: true},
                modal = {},
                routeParams = {account_id: 10};
            AccountDetailsController.configureView = jasmine.createSpy();

            sut = new AccountDetailsController(scope, modal, routeParams);
            expect(scope.accountId).not.toBeNull();
            expect(scope.accountId).toEqual(10);
        });
    });

});