/**
 * Created by kevin on 11/6/14.
 */
define([
    'modules/account/AccountController'
], function(AccountController){

    'use strict';

    describe("AccountController", function () {

        it("should call AccountController.configureView global method", function () {
            var scope = {someScope: true};

            AccountController.configureView = jasmine.createSpy();
            var ctrl = new AccountController(scope);
            expect(AccountController.configureView).toHaveBeenCalledWith(scope);
        });
    });
})