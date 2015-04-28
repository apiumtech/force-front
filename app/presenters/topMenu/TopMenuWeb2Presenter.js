/**
 * Created by joanllenas on 4/21/15.
 */

app.registerPresenter(function(container) {

    function TopMenuWeb2Presenter() {}


    TopMenuWeb2Presenter.prototype.show = function(view, model) {
        this.view = view;
        this.model = model;
    };


    TopMenuWeb2Presenter.prototype.getUserDataInfo = function () {
        this.model.getUserDataInfo().then(
            this.view.onGetUserDataInfo.bind(this.view),
            this.view.onGetUserDataInfoError.bind(this.view)
        );
    };


    TopMenuWeb2Presenter.prototype.getUserSections = function () {
        return this.model.getUserSections();
    };

    TopMenuWeb2Presenter.prototype.getUserOptions = function () {
        return this.model.getUserOptions();
    };

    TopMenuWeb2Presenter.prototype.getUserData = function () {
        return this.model.getUserData();
    };

    TopMenuWeb2Presenter.prototype.getUserNotifications = function () {
        return this.model.getUserNotifications();
    };


    TopMenuWeb2Presenter.newInstance = function() {
        return Some(new TopMenuWeb2Presenter());
    };


    return {
        newInstance: TopMenuWeb2Presenter.newInstance
    };
});
