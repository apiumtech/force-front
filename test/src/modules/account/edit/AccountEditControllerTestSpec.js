/**
 * Created by justin on 3/19/15.
 */
define([
    'app',
    'modules/account/edit/AccountEditView',
    'modules/account/edit/AccountEditController'
], function (app, AccountEditView, AccountEditController) {
    'use strict';
    describe("AccountEditController", function () {

        var appName = app.name;
        beforeEach(module(appName));
        describe("AccountEditController", function () {
            var $controller;
            var scope, $routeParams, $injector, $upload, $validation;

            beforeEach(inject(function (_$controller_, _$rootScope_, _$routeParams_, _$injector_) {
                $controller = _$controller_;
                scope = _$rootScope_.$new();
                $routeParams = _$routeParams_;
                $routeParams.account_id = 123;
                $upload = $validation = {};
                $injector = _$injector_;
            }));
            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = $controller('AccountEditController', {$scope: scope, $routeParams: $routeParams,
                        $upload: $upload, $validation: $validation, $injector: $injector});
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(AccountEditController, 'configureView');
                }));
                afterEach(function () {
                    AccountEditController.configureView.restore();
                });
                it("should call AccountEditController.configureView global method", function () {
                    new AccountEditController(scope, $routeParams, $upload, $validation, $injector);
                    expect(AccountEditController.configureView).toHaveBeenCalledWith(scope);
                });
            });


            describe("configureView", function () {
                var view = mock(AccountEditView);
                beforeEach(function () {
                    sinon.stub(AccountEditView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    AccountEditView.newInstance.restore();
                });
                it("should create new instance of AccountEditView", function () {
                    AccountEditController.configureView(scope);
                    expect(AccountEditView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });

    });

});