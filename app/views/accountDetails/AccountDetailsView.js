/**
 * Created by justin on 3/9/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');
    var AccountDetailsModel = container.getModel("models/accountDetails/AccountDetailsModel");
    var AccountDetailsPresenter = container.getPresenter("presenters/accountDetails/AccountDetailsPresenter");

    function AccountDetailsView(scope, model, presenter) {
        BaseView.call(this, scope, model, presenter);
        AccountDetailsView.configureEvents(this);
    }

    AccountDetailsView.prototype = Object.create(BaseView.prototype, {
        accountId: {
            get: function () {
                return this.$scope.accountId;
            },
            set: function (value) {
                this.$scope.accountId = value;
            }
        },
        accountData: {
            get: function () {
                return this.$scope.accountData;
            },
            set: function (value) {
                this.$scope.accountData = value;
            }
        }
    });

    AccountDetailsView.configureEvents = function (instance) {
        var self = instance;

        self.fn.loadAccountData = function () {
            self.event.onLoadAccount();
        };
    };

    AccountDetailsView.prototype._show = BaseView.prototype.show;
    AccountDetailsView.prototype.show = function () {
        var self = this;
        BaseView.prototype.show.call(this);
        self.fn.loadAccountData();
    };

    AccountDetailsView.prototype.onAccountLoaded = function (data) {
        var self = this;
        self.accountData = data;
        console.log(self.accountData);
    };

    AccountDetailsView.newInstance = function (scope, model, presenter, $viewRepAspect, $logErrorAspect) {
        model = model || AccountDetailsModel.newInstance().getOrElse(AccountDetailsModel);
        presenter = presenter || AccountDetailsPresenter.newInstance().getOrElse(AccountDetailsPresenter);
        var view = new AccountDetailsView(scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return AccountDetailsView;
});