/**
 * Created by joanllenas 03/16/15.
 */

define([
    'modules/login/LoginPresenter'
], function (LoginPresenter) {
    'use strict';
    describe('LoginPresenter', function () {

        var view, model, presenter;

        beforeEach(function () {
            model = {
                login: function (usr, pass) {
                    return {
                        then: function (a, b) {
                            a();
                        }
                    }
                }
            };
            view = {
                event: {},
                onLoggingIn: function () {
                },
                onLoggedIn: function () {
                },
                onLoggingInError: function () {
                }
            };
            presenter = LoginPresenter.newInstance();
            presenter.show(view, model);
        });
        //
        //describe("onLogin method", function () {
        //    var user = "fmuser";
        //    var password = "fmpassword";
        //
        //    beforeEach(function () {
        //        view.loginUser = user;
        //        view.loginPassword = password;
        //    });
        //
        //    it("should call views's onLoggingIn method", function () {
        //        spyOn(view, 'onLoggingIn');
        //        presenter.onLogin();
        //        expect(view.onLoggingIn).toHaveBeenCalled();
        //    });
        //
        //    it("should call model's login method with credentials", function () {
        //        spyOn(model, 'login').and.callThrough();
        //        presenter.onLogin();
        //        expect(model.login).toHaveBeenCalledWith(user, password);
        //    });
        //
        //    it("should call view's onLoggedIn method on success", function () {
        //        spyOn(model, 'login').and.returnValue(exerciseFakeOkPromise());
        //        spyOn(view, 'onLoggedIn').and.callThrough();
        //        presenter.onLogin();
        //        expect(view.onLoggedIn).toHaveBeenCalled();
        //    });
        //
        //    it("should call presenter's onLoggingInError method on fail", function () {
        //        spyOn(model, 'login').and.returnValue(exerciseFakeKoPromise());
        //        spyOn(presenter, 'onLoggingInError');
        //        presenter.onLogin();
        //        expect(presenter.onLoggingInError).toHaveBeenCalled();
        //    });
        //
        //    it("should call view's onLoggingInError method on fail", function () {
        //        var jqXHR = {
        //            status: 200
        //        };
        //        spyOn(model, 'login').and.returnValue(exerciseFakeKoPromiseWithArg(jqXHR));
        //        spyOn(presenter, 'onLoggingInError').and.callThrough();
        //        spyOn(view, 'onLoggingInError');
        //        presenter.onLogin();
        //        expect(view.onLoggingInError).toHaveBeenCalled();
        //    });
        //});

    });
});
