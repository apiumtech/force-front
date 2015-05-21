/**
 * Created by justin on 3/19/15.
 */
define([
    'modules/account/create/AccountCreateController'
], function (AccountCreateController) {
    'use strict';
    describe("AccountCreateController", function () {

        var sut;
        var scope = {thisIsFakeScope: true},
            $modalInstance = {},
            $injector = {
                get: function () {
                }
            };

        it("should call configureView with correct params", function () {
            AccountCreateController.configureView = jasmine.createSpy();

            sut = new AccountCreateController(scope, $injector);
            expect(AccountCreateController.configureView).toHaveBeenCalledWith(scope);
        });

        ["$upload", "$validation"].forEach(function (provider) {
            it("should get provider '" + provider + "' from injector and assign to $scope", function () {
                spyOn($injector, 'get').and.returnValue(provider + "Value");
                sut = new AccountCreateController(scope, $injector);
                expect($injector.get).toHaveBeenCalledWith(provider);
                expect(scope[provider]).toEqual(provider + "Value");
            });
        });
    });

});