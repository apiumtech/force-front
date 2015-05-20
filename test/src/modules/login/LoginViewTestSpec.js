/**
 * Created by joanllenas 03/16/15.
 */
define(['modules/login/LoginView'], function (LoginView) {
    'use strict';


    describe('LoginView', function () {
        var view, model, presenter, location;

        function exerciseCreateView(_model, _presenter, _location) {
            var view = LoginView.newInstance({}, _location, _model, _presenter, false, false);

            view.event.onLogIn = jasmine.createSpy();
            return view;
        }

        beforeEach(function () {
            model = {};
            presenter = {
                show: jasmine.createSpy(),
                onLogin: jasmine.createSpy()
            };
            location = {
                path: jasmine.createSpy()
            };
        });


        it("should configureEvents() on instantiation", function () {
            spyOn(LoginView.prototype, 'configureEvents');
            view = exerciseCreateView(model, presenter, location);
            expect(view.configureEvents).toHaveBeenCalled();
        });

        it("should call presenter's show method on show()", function () {
            view = exerciseCreateView(model, presenter, location);
            view.show();
            expect(view.presenter.show).toHaveBeenCalledWith(view, model);
        });

        it("should call presenter's onLogin method on login()", function () {
            view = exerciseCreateView(model, presenter, location);
            view.fn.login();
            expect(view.event.onLogIn).toHaveBeenCalled();
        });

        describe('should have the isLoggingIn value set', function () {
            beforeEach(function () {
                view = exerciseCreateView(model, presenter, location);
            });

            it("to false initially", function () {
                expect(view.isLoggingIn).toBe(false);
            });

            it("to true after calling onLoggingIn()", function () {
                view.onLoggingIn();
                expect(view.isLoggingIn).toBe(true);
            });

            it("to false after calling onLoggedIn()", function () {
                view.onLoggedIn();
                expect(view.isLoggingIn).toBe(false);
            });

            it("to false after calling onLoggingInError()", function () {
                view.onLoggingInError();
                expect(view.isLoggingIn).toBe(false);
            });
        });


        describe('errorMessage', function () {
            beforeEach(function () {
                view = exerciseCreateView(model, presenter, location);
            });

            it('should be null initially', function () {
                expect(view.errorMessage).toBeNull();
            });

            it('should be set to some error string onLoggingInError()', function () {
                var status = 401;
                view.onLoggingInError(401);
                expect(view.errorMessage).not.toBeNull();
            });

            it('should be set to null on login()', function () {
                view.errorMessage = "some error";
                view.fn.login();
                expect(view.errorMessage).toBeNull();
            });
        });

        it("should call locations's path method onLoggedIn", function () {
            view = exerciseCreateView(model, presenter, location);
            view.onLoggedIn();
            expect(location.path).toHaveBeenCalledWith('/accounts');
        });

    });
});