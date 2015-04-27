/**
 * Created by joanllenas on 4/21/15.
 */

app.registerPresenter(function(container) {

    function TopMenuPresenter() {}


    TopMenuPresenter.prototype.show = function(view, model) {
        this.view = view;
        this.model = model;
    };


    TopMenuPresenter.prototype.getUserDataInfo = function () {
        this.model.getUserDataInfo().then(
            this.view.onGetUserDataInfo.bind(this.view),
            this.view.onGetUserDataInfoError.bind(this.view)
        );
    };


    TopMenuPresenter.prototype.getUserSections = function () {
        return this.model.getUserSections();
    };

    TopMenuPresenter.prototype.getUserOptions = function () {
        return this.model.getUserOptions();
    };

    TopMenuPresenter.prototype.getUserData = function () {
        return this.model.getUserData();
    };

    TopMenuPresenter.prototype.getUserNotifications = function () {
        return this.model.getUserNotifications();
    };


    TopMenuPresenter.newInstance = function() {
        return Some(new TopMenuPresenter());
    };


    return {
        newInstance: TopMenuPresenter.newInstance
    };
});
