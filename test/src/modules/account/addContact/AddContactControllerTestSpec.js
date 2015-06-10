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
                register: function () {
                },
                resolve: function () {
                    return view;
                }
            };
        });
        afterEach(function () {
            app.di = app._di;
        });

        var $controller;
        var scope, routeParams;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$routeParams_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
            routeParams = _$routeParams_;
        }));
        describe("loading asynchronously", function () {
            beforeEach(inject(function () {
                sinon.stub(AddContactController.prototype, 'configureView');
            }));
            afterEach(function () {
                AddContactController.prototype.configureView.restore();
            });
            it("should register the controller to app", function () {
                var ctrl = $controller('AddContactController', {$scope: scope, $routeParams: routeParams});
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
                new AddContactController(scope, routeParams);
                expect(AddContactController.prototype.configureView).toHaveBeenCalledWith(scope);
            });
        });


        describe("configureView", function () {
            beforeEach(function () {
                spyOn(app.di, 'resolve').and.callThrough();
                sinon.stub(BaseController.prototype, 'triggerView');
            });
            afterEach(function () {
            });
            it("should create new instance of AddContactView", function () {
                var sut = new AddContactController(scope, routeParams);
                expect(app.di.resolve).toHaveBeenCalledWith('addContactView');
                expect(sut.view).toEqual(view);
                expect(BaseController.prototype.triggerView).toHaveBeenCalledWith(sut.view, scope);
            });
        });
    });
});