define([
    'modules/saleAnalytics/filters/userFilter/UserFilterModel'
], function (UserFilterModel) {
    'use strict';

    function UserFilterPresenter($model) {
        this.model = $model || new UserFilterModel();
    }

    UserFilterPresenter.inherits(Object, {});

    UserFilterPresenter.prototype.showError = function (error) {
        console.log(error);
    };

    UserFilterPresenter.prototype.show = function (view) {
        var self = this;
        self.$view = view;
        var model = self.model;

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

    return UserFilterPresenter;
});