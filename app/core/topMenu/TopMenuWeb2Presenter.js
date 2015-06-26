/**
 * Created by joanllenas on 4/21/15.
 */

define([], function () {
    'use strict';

    function TopMenuWeb2Presenter() {}

    TopMenuWeb2Presenter.prototype.show = function (view, model) {
        view.event.getUserSections = function () {
            return model.getUserSections();
        };

        view.event.getUserOptions = function () {
            return model.getUserOptions();
        };

        view.event.getUserData = function () {
            return model.getUserData();
        };

        view.event.getUserNotifications = function () {
            return model.getUserNotifications();
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


    TopMenuWeb2Presenter.newInstance = function () {
        return new TopMenuWeb2Presenter();
    };

    return {newInstance: TopMenuWeb2Presenter.newInstance};
});
