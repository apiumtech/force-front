/**
 * Created by justin on 2/4/15.
 */

define([
    'app',
    'modules/account/filters/stringTypeFilter/StringTypeFilterView',
    'modules/account/filters/stringTypeFilter/StringTypeFilterController',
    'angular'
], function (app, StringTypeFilterView, StringTypeFilterController, angular) {
    'use strict';
    describe("StringTypeFilterController", function () {

        var appName = app.name;
        beforeEach(module(appName));
        describe("StringTypeFilterController", function () {
            var $controller;
            var scope, element;

            beforeEach(inject(function (_$controller_, _$rootScope_) {
                $controller = _$controller_;
                scope = _$rootScope_.$new();
                element = angular.element("<div/>");
            }));
            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = $controller('StringTypeFilterController', {
                        $scope: scope, $element: element
                    });
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(StringTypeFilterController, 'configureView');
                }));
                afterEach(function () {
                    StringTypeFilterController.configureView.restore();
                });
                it("should call StringTypeFilterController.configureView global method", function () {
                    new StringTypeFilterController(scope, element);
                    expect(StringTypeFilterController.configureView).toHaveBeenCalledWith(scope, element);
                });
            });


            describe("configureView", function () {
                var view = mock(StringTypeFilterView);
                beforeEach(function () {
                    sinon.stub(StringTypeFilterView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    StringTypeFilterView.newInstance.restore();
                });
                it("should create new instance of StringTypeFilterView", function () {
                    StringTypeFilterController.configureView(scope, element);
                    expect(StringTypeFilterView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });

    });

});

