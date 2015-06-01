/**
 * Created by justin on 2/4/15.
 */
define([
    'app',
    'modules/account/filters/booleanTypeFilter/BooleanTypeFilterView',
    'modules/account/filters/booleanTypeFilter/BooleanTypeFilterController',
    'angular'
], function (app, BooleanTypeFilterView, BooleanTypeFilterController, angular) {
    'use strict';
    describe("BooleanTypeFilterController", function () {
        var appName = app.name;
        beforeEach(module(appName));
        describe("BooleanTypeFilterController", function () {
            var $controller;
            var scope, element;

            beforeEach(inject(function (_$controller_, _$rootScope_) {
                $controller = _$controller_;
                scope = _$rootScope_.$new();
                element = angular.element("<div/>");
            }));
            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = $controller('BooleanTypeFilterController', {
                        $scope: scope, $element: element
                    });
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(BooleanTypeFilterController, 'configureView');
                }));
                afterEach(function () {
                    BooleanTypeFilterController.configureView.restore();
                });
                it("should call BooleanTypeFilterController.configureView global method", function () {
                    new BooleanTypeFilterController(scope, element);
                    expect(BooleanTypeFilterController.configureView).toHaveBeenCalledWith(scope, element);
                });
            });


            describe("configureView", function () {
                var view = mock(BooleanTypeFilterView);
                beforeEach(function () {
                    sinon.stub(BooleanTypeFilterView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    BooleanTypeFilterView.newInstance.restore();
                });
                it("should create new instance of BooleanTypeFilterView", function () {
                    BooleanTypeFilterController.configureView(scope, element);
                    expect(BooleanTypeFilterView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });
    });

});