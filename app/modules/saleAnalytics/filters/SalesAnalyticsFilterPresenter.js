/**
 * Created by justin on 12/22/14.
 */

define([], function () {
    'use strict';

    function SalesAnalyticsFilterPresenter() {
    }

    SalesAnalyticsFilterPresenter.prototype = Object.create(Object.prototype, {});

    SalesAnalyticsFilterPresenter.prototype.showError = function (error) {
        console.log(error);
    };

    SalesAnalyticsFilterPresenter.prototype.show = function (view, model) {
        var self = this;
        self.$view = view;
        self.$model = model;

        view.event.onFilterInitializing = function () {
            view.showLoadingUsers();
            model.getUsers()
                .then(view.onUsersLoadedSuccess.bind(view), view.onUsersLoadedFail.bind(view));
        };

        view.event.onFilterByGroup = function (groupName) {
            model.addQuery(groupName);
            view.event.onFilterInitializing();
        };

        view.event.onFilteringUsers = function (usersList, currentUserFilterGroup, searchQuery) {
            var data = model.getFilteredData(usersList, currentUserFilterGroup, searchQuery);
            view.setFilteredData(data);
        }
    };

    SalesAnalyticsFilterPresenter.newInstance = function () {
        return new SalesAnalyticsFilterPresenter();
    };

    return SalesAnalyticsFilterPresenter;
});