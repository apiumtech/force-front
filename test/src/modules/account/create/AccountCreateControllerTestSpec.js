/**
 * Created by justin on 3/19/15.
 */
define([
    'app',
    'modules/account/create/AccountCreateView',
    'modules/account/create/AccountCreateController'
], function (app, AccountCreateView, AccountCreateController) {
    'use strict';

    describe("AccountCreateController", function () {
        var appName = app.name;
        beforeEach(module(appName));

        var $controller;
        var scope, $injector;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$injector_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
            $injector = _$injector_;
        }));
        describe("loading asynchronously", function () {
            it("should register the controller to app", function () {
                var ctrl = $controller('AccountCreateController', {$scope: scope, $injector: $injector});
                expect(ctrl).not.toBeNull();
                expect(ctrl).not.toBeUndefined();
            });
        });


        describe("construct", function () {
            beforeEach(inject(function () {
                sinon.stub(AccountCreateController, 'configureView');
            }));
            afterEach(function () {
                AccountCreateController.configureView.restore();
            });
            it("should call AccountCreateController.configureView global method", function () {
                new AccountCreateController(scope, $injector);
                expect(AccountCreateController.configureView).toHaveBeenCalledWith(scope);
            });
        });


        describe("configureView", function () {
            var view = mock(AccountCreateView);
            beforeEach(function () {
                sinon.stub(AccountCreateView, 'newInstance').returns(view);
            });
            afterEach(function () {
                AccountCreateView.newInstance.restore();
            });
            it("should create new instance of AccountCreateView", function () {
                AccountCreateController.configureView(scope);
                expect(AccountCreateView.newInstance).toHaveBeenCalled();
                expect(view.show).toHaveBeenCalled();
            });
        });
    });

});