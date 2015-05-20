/**
 * Created by joanllenas on 03/16/15.
 */

define([], function (container) {

    function LoginPresenter() {
    }

    LoginPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;
    };


    LoginPresenter.prototype.onLogin = function () {
        this.view.onLoggingIn();

        this.model.login(this.view.loginUser, this.view.loginPassword)
            .then(
            this.view.onLoggedIn.bind(this.view),
            this.onLoggingInError.bind(this)
        );
    };

    LoginPresenter.prototype.onLoggingInError = function (jqXHR) {
        this.view.onLoggingInError(jqXHR.status);
    };

    LoginPresenter.newInstance = function () {
        return new LoginPresenter();
    };

    return LoginPresenter;
});
