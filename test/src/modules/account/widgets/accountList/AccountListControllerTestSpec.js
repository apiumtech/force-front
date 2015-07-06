/**
 * Created by justin on 3/9/15.
 */
define([
    'app',
    'modules/account/widgets/accountList/AccountListView',
    'modules/account/widgets/accountList/AccountListController',
    'angular'
], function (app, AccountListView, AccountListController, angular) {
    'use strict';
    describe("AccountListController", function () {

        var appName = app.name;
        beforeEach(module(appName));
        describe("AccountListController", function () {
            var $controller;
            var scope, element, modal;

            beforeEach(inject(function (_$controller_, _$rootScope_, $modal) {
                $controller = _$controller_;
                scope = _$rootScope_.$new();
                element = angular.element("<div/>");
                modal = $modal;
            }));
            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = $controller('AccountListController', {
                        $scope: scope, $element: element, $modal : modal
                    });
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(AccountListController, 'configureView');
                }));
                afterEach(function () {
                    AccountListController.configureView.restore();
                });
                it("should call AccountListController.configureView global method", function () {
                    new AccountListController(scope, element);
                    expect(AccountListController.configureView).toHaveBeenCalledWith(scope, element);
                });
            });


            describe("configureView", function () {
                var view = mock(AccountListView);
                beforeEach(function () {
                    sinon.stub(AccountListView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    AccountListView.newInstance.restore();
                });
                it("should create new instance of AccountListView", function () {
                    AccountListController.configureView(scope, element);
                    expect(AccountListView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });

    });
});