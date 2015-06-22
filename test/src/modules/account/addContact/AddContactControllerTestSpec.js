define([
    'app',
    'modules/account/addContact/AddContactView',
    'modules/account/addContact/AddContactController',
    'shared/BaseController'
], function (app, AddContactView, AddContactController, BaseController) {
    'use strict';

    describe("AddContactController", function () {
        var appName = app.name;
        var view;
        beforeEach(module(appName));
        beforeEach(function () {
            view = mock(AddContactView);
            app._di = app.di;
            app.di = {
                register: app._di.register,
                resolve: function () {
                    return view;
                },
                contains: app._di.contains
            };
        });
        afterEach(function () {
            app.di = app._di;
        });

        var $controller;
        var scope, routeParams, $upload;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$routeParams_, _$upload_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
            routeParams = _$routeParams_;
            $upload = _$upload_;
        }));
        describe("loading asynchronously", function () {
            beforeEach(inject(function () {
                sinon.stub(AddContactController.prototype, 'configureView');
            }));
            afterEach(function () {
                AddContactController.prototype.configureView.restore();
            });
            it("should register the controller to app", function () {
                var ctrl = $controller('AddContactController', {
                    $scope: scope,
                    $routeParams: routeParams,
                    $upload: $upload
                });
                expect(ctrl).not.toBeNull();
                expect(ctrl).not.toBeUndefined();
            });
        });


        describe("construct", function () {
            beforeEach(inject(function () {
                sinon.stub(AddContactController.prototype, 'configureView');
            }));
            afterEach(function () {
                AddContactController.prototype.configureView.restore();
            });
            it("should call AddContactController.configureView global method", function () {
                new AddContactController(scope, routeParams, $upload);
                expect(AddContactController.prototype.configureView).toHaveBeenCalledWith(scope);
            });
        });


        describe("configureView", function () {
            beforeEach(function () {
                spyOn(app.di, 'resolve').and.callThrough();
                sinon.stub(BaseController.prototype, 'triggerView');
            });
            afterEach(function () {
                BaseController.prototype.triggerView.restore();
            });
            it("should create new instance of AddContactView", function () {
                var sut = new AddContactController(scope, routeParams, $upload);
                expect(app.di.resolve).toHaveBeenCalledWith('addContactView');
                expect(sut.view).toEqual(view);
                expect(BaseController.prototype.triggerView).toHaveBeenCalledWith(sut.view, scope);
            });
        });
    });
});