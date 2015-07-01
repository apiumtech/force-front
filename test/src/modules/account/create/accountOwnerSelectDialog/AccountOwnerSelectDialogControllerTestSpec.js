define([
    'app',
    'modules/account/create/accountOwnerSelectDialog/AccountOwnerSelectDialogView',
    'modules/account/create/accountOwnerSelectDialog/AccountOwnerSelectDialogController'
], function(app, AccountOwnerSelectDialogView, AccountOwnerSelectDialogController){
    'use strict';

    describe("AccountOwnerSelectDialogController", function () {
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
                    var ctrl = $controller('AccountOwnerSelectDialogController', {$scope: scope});
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(AccountOwnerSelectDialogController, 'configureView');
                }));
                afterEach(function () {
                    AccountOwnerSelectDialogController.configureView.restore();
                });
                it("should call AccountOwnerSelectDialogController.configureView global method", function () {
                    new AccountOwnerSelectDialogController(scope);
                    expect(AccountOwnerSelectDialogController.configureView).toHaveBeenCalledWith(scope);
                });
            });


            describe("configureView", function () {
                var view = mock(AccountOwnerSelectDialogView);
                beforeEach(function () {
                    sinon.stub(AccountOwnerSelectDialogView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    AccountOwnerSelectDialogView.newInstance.restore();
                });
                it("should create new instance of AccountOwnerSelectDialogView", function () {
                    AccountOwnerSelectDialogController.configureView(scope);
                    expect(AccountOwnerSelectDialogView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });
});