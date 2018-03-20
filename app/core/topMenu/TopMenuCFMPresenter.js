define([], function () {
    'use strict';

    function TopMenuCFMPresenter() {}

    TopMenuCFMPresenter.prototype.show = function (view, model) {
        view.event.getUserSections = function () {
            return model.getUserSections();
        };

        view.event.getUserData = function () {
            return model.getUserData();
        };

        view.event.getUserDataInfo = function () {
            model.getUserDataInfo().then(
                view.onGetUserDataInfo.bind(view),
                view.onGetUserDataInfoError.bind(view)
            );
        };

        view.event.logout = function () {
            model.logout().then(
                view.onLogout.bind(view),
                view.onLogoutError.bind(view)
            );
        };
    };


    TopMenuCFMPresenter.newInstance = function () {
        return new TopMenuCFMPresenter();
    };

    return {newInstance: TopMenuCFMPresenter.newInstance};
});