/**
 * Created by joanllenas on 03/16/15.
 */

define([], function () {

    function LoginPresenter() {
    }

    LoginPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;
        var self = this;

        view.event.onLogIn = function(username, password) {
            model.login(username, password)
                .then(view.onLoggedIn.bind(view), self.onLoggingInError.bind(self));
        };
    };

    LoginPresenter.prototype.onLoggingInError = function (jqXHR) {
        this.view.onLoggingInError(jqXHR.status);
    };

    LoginPresenter.newInstance = function () {
        return new LoginPresenter();
    };

    return LoginPresenter;
});
