/**
 * Created by joanllenas 03/16/15.
 */

app.registerView(function(container) {
    var BaseView = container.getView('views/BaseView');
    var LoginModel = container.getModel('models/LoginModel');
    var LoginPresenter = container.getPresenter('presenters/LoginPresenter');

    function LoginView($scope, $model, $presenter, $location) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$location = $location;
        this.configureEvents();
    }

    LoginView.prototype = Object.create(BaseView.prototype, {
    	isLoggingIn: {
            get: function () {
                return this.$scope.data.isLoggingIn || (this.$scope.data.isLoggingIn = false);
            },
            set: function (value) {
                this.$scope.data.isLoggingIn = value;
            }
        },
        loginUser: {
            get: function () {
                return this.$scope.data.loginUser;
            },
            set: function (value) {
                this.$scope.data.loginUser = value;
            }
        },
        loginPassword: {
            get: function () {
                return this.$scope.data.loginPassword;
            },
            set: function (value) {
                this.$scope.data.loginPassword = value;
            }
        },
        errorMessage: {
            get: function () {
                return this.$scope.data.errorMessage || (this.$scope.data.errorMessage = null);
            },
            set: function (value) {
                this.$scope.data.errorMessage = value;
            }
        }
    });

    LoginView.prototype.configureEvents = function () {
        var self = this;

        self.fn.login = function () {
			self.errorMessage = null;
            self.presenter.onLogin();
        };
    };


    LoginView.prototype.onLoggingIn = function () {
    	this.isLoggingIn = true;
    };

    LoginView.prototype.onLoggedIn = function () {
    	this.isLoggingIn = false;
        this.$location.path("/accounts");
    };

    LoginView.prototype.onLoggingInError = function (msg) {
    	this.isLoggingIn = false;
        console.log(msg);
    	this.errorMessage = msg;
    };


    LoginView.newInstance = function($scope, $model, $presenter, $location, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var model = $model || LoginModel.newInstance().getOrElse(throwInstantiateException(LoginModel));
        var presenter = $presenter || LoginPresenter.newInstance().getOrElse(throwInstantiateException(LoginPresenter));
        var view = new LoginView(scope, model, presenter, $location);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return LoginView;
});
