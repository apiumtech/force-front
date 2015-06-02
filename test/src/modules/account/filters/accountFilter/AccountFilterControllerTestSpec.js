/**
 * Created by Kate on 06/01/15
 */
define([
    'app',
    'modules/account/filters/accountFilter/AccountFilterView',
    'modules/account/filters/accountFilter/AccountFilterController'
], function (app, AccountFilterView, AccountFilterController) {
    'use strict';
    describe("AccountFilterController", function () {

        var appName = app.name;
        beforeEach(module(appName));
        describe("AccountFilterController", function () {
            var $controller;
            var scope;

            beforeEach(inject(function (_$controller_, _$rootScope_) {
                $controller = _$controller_;
                scope = _$rootScope_.$new();
            }));
            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = $controller('AccountFilterController', {$scope: scope});
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(AccountFilterController, 'configureView');
                }));
                afterEach(function () {
                    AccountFilterController.configureView.restore();
                });
                it("should call AccountFilterController.configureView global method", function () {
                    new AccountFilterController(scope);
                    expect(AccountFilterController.configureView).toHaveBeenCalledWith(scope);
                });
            });


            describe("configureView", function () {
                var view = mock(AccountFilterView);
                beforeEach(function () {
                    sinon.stub(AccountFilterView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    AccountFilterView.newInstance.restore();
                });
                it("should create new instance of AccountFilterView", function () {
                    AccountFilterController.configureView(scope);
                    expect(AccountFilterView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });

    });

});