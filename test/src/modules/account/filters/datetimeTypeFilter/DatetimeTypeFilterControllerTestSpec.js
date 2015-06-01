/**
 * Created by justin on 2/4/15.
 */
define([
    'app',
    'modules/account/filters/datetimeTypeFilter/DatetimeTypeFilterView',
    'modules/account/filters/datetimeTypeFilter/DatetimeTypeFilterController',
    'angular'
], function (app, DatetimeTypeFilterView, DatetimeTypeFilterController, angular) {
    'use strict';
    describe("DatetimeTypeFilterController", function () {

        var appName = app.name;
        beforeEach(module(appName));
        describe("DatetimeTypeFilterController", function () {
            var $controller;
            var scope, element;

            beforeEach(inject(function (_$controller_, _$rootScope_) {
                $controller = _$controller_;
                scope = _$rootScope_.$new();
                element = angular.element("<div/>");
            }));
            describe("loading asynchronously", function () {
                it("should register the controller to app", function () {
                    var ctrl = $controller('DatetimeTypeFilterController', {
                        $scope: scope, $element: element
                    });
                    expect(ctrl).not.toBeNull();
                    expect(ctrl).not.toBeUndefined();
                });
            });


            describe("construct", function () {
                beforeEach(inject(function () {
                    sinon.stub(DatetimeTypeFilterController, 'configureView');
                }));
                afterEach(function () {
                    DatetimeTypeFilterController.configureView.restore();
                });
                it("should call DatetimeTypeFilterController.configureView global method", function () {
                    new DatetimeTypeFilterController(scope, element);
                    expect(DatetimeTypeFilterController.configureView).toHaveBeenCalledWith(scope, element);
                });
            });


            describe("configureView", function () {
                var view = mock(DatetimeTypeFilterView);
                beforeEach(function () {
                    sinon.stub(DatetimeTypeFilterView, 'newInstance').returns(view);
                });
                afterEach(function () {
                    DatetimeTypeFilterView.newInstance.restore();
                });
                it("should create new instance of DatetimeTypeFilterView", function () {
                    DatetimeTypeFilterController.configureView(scope, element);
                    expect(DatetimeTypeFilterView.newInstance).toHaveBeenCalled();
                    expect(view.show).toHaveBeenCalled();
                });
            });
        });

    });

});