/**
 * Created by kevin on 11/6/14.
 */
define([
    'app',
    'modules/account/AccountView',
    'modules/account/AccountController'
], function(app, AccountView, AccountController){

    'use strict';

    describe("AccountController", function () {
        var appName = app.name;
        beforeEach(module(appName));

        var $controller;
        var scope;

        beforeEach(inject(function (_$controller_, _$rootScope_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
        }));
        describe("loading asynchronously", function () {
            it("should register the controller to app", function () {
                var ctrl = $controller('AccountController', {$scope: scope});
                expect(ctrl).not.toBeNull();
                expect(ctrl).not.toBeUndefined();
            });
        });


        describe("construct", function () {
            beforeEach(inject(function () {
                sinon.stub(AccountController, 'configureView');
            }));
            afterEach(function () {
                AccountController.configureView.restore();
            });
            it("should call AccountController.configureView global method", function () {
                new AccountController(scope);
                expect(AccountController.configureView).toHaveBeenCalledWith(scope);
            });
        });


        describe("configureView", function () {
            var view = mock(AccountView);
            beforeEach(function () {
                sinon.stub(AccountView, 'newInstance').returns(view);
            });
            afterEach(function () {
                AccountView.newInstance.restore();
            });
            it("should create new instance of AccountView", function () {
                AccountController.configureView(scope);
                expect(AccountView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });

});