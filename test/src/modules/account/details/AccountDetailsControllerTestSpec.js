/**
 * Created by justin on 3/9/15.
 */
define([
    'app',
    'modules/account/details/AccountDetailsController',
    'modules/account/details/AccountDetailsView'
], function (app, AccountDetailsController, AccountDetailsView) {
    'use strict';
    describe("AccountDetailsController", function () {

        var appName = app.name;
        beforeEach(module(appName));
        describe("AccountDetailsController", function () {
            var $controller;
            var scope, $routeParams, $modal;

            beforeEach(inject(function (_$controller_, _$rootScope_, _$routeParams_, _$modal_) {
                $controller = _$controller_;
                scope = _$rootScope_.$new();
                $routeParams = _$routeParams_;
                $routeParams.account_id = 123;
                $modal = _$modal_;
            }));
            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = $controller('AccountDetailsController', {$scope: scope, $modal: $modal, $routeParams: $routeParams});
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(AccountDetailsController, 'configureView');
                }));
                afterEach(function () {
                    AccountDetailsController.configureView.restore();
                });
                it("should call AccountDetailsController.configureView global method", function () {
                    new AccountDetailsController(scope, $modal, $routeParams);
                    expect(AccountDetailsController.configureView).toHaveBeenCalledWith(scope, $modal);
                });
            });


            describe("configureView", function () {
                var view = mock(AccountDetailsView);
                beforeEach(function () {
                    sinon.stub(AccountDetailsView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    AccountDetailsView.newInstance.restore();
                });
                it("should create new instance of AccountDetailsView", function () {
                    AccountDetailsController.configureView(scope, $modal);
                    expect(AccountDetailsView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });


    });

});