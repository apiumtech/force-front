/**
 * Created by justin on 3/9/15.
 */
app.registerPresenter(function () {
    function AccountDetailsPresenter() {

    }

    AccountDetailsPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;


    };

    AccountDetailsPresenter.newInstance = function () {
        return Some(new AccountDetailsPresenter());
    };

    return AccountDetailsPresenter;
});