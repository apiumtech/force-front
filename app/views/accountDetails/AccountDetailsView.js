/**
 * Created by justin on 3/9/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');
    var AccountDetailsModel = container.getModel("models/accountDetails/AccountDetailsModel");
    var AccountDetailsPresenter = container.getPresenter("presenters/accountDetails/AccountDetailsPresenter");

    function AccountDetailsView(scope, model, presenter) {
        BaseView.call(this, scope, model, presenter);
        console.log(this.accountId);
    }

    AccountDetailsView.prototype = Object.create(BaseView.prototype, {
        accountId: {
            get: function () {
                return this.$scope.accountId;
            },
            set: function (value) {
                this.$scope.accountId = value;
            }
        }
    });

    AccountDetailsView.newInstance = function (scope, model, presenter, $viewRepAspect, $logErrorAspect) {
        model = model || AccountDetailsModel.newInstance().getOrElse(AccountDetailsModel);
        presenter = presenter || AccountDetailsPresenter.newInstance().getOrElse(AccountDetailsPresenter);
        var view = new AccountDetailsView(scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return AccountDetailsView;
});