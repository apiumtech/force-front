define([
    'modules/account/widgets/accountList/AccountListModel',
    'shared/services/bus/FilterChannel',
    'shared/services/AccountEventBus'
], function (AccountListModel, FilterChannel, AccountEventBus) {
    'use strict';

    function AccountListPresenter(model, filterChannel, accountEventBus) {
        this.model = model || new AccountListModel();
        this.filterChannel = filterChannel || FilterChannel.newInstance();
        this.accountEventBus = accountEventBus || AccountEventBus.getInstance();
    }

    AccountListPresenter.prototype.show = function (view) {
        var self = this;
        self.view = view;
        var model = self.model;
        var eventBus = self.accountEventBus;
        var channel = self.filterChannel;

        eventBus.onFilterValueChanged(self.filterChanged.bind(self));

        eventBus.onTableFieldsFilterDeselected(self.onTableFieldsFilterDeselected.bind(self));

        view.event.onOwnerToggled = function (owner) {
            view.updateOwnerFilter(owner);
            view.reloadTableData();
        };
        channel.onOwnerToggleReceived(view.event.onOwnerToggled);

        view.event.onTableFieldsRequested = function () {
            model.loadTableFields()
                .then(view.onTableFieldsLoaded.bind(view), view.showError.bind(view));
        };

        view.event.onSearchQueryChanged = function (queryString) {
            view.updateQueryingString(queryString);
            view.reloadTableData();
        };
        //channel.onQueryingData(view.event.onSearchQueryChanged);
        eventBus.onQueryChanged(view.event.onSearchQueryChanged);

        view.event.onEnvironmentToggled = function (environment) {
            view.updateEnvironmentFilter(environment);
            view.reloadTableData();
        };
        channel.onEnvironmentToggleReceived(view.event.onEnvironmentToggled);

        view.event.onAccountTypesToggled = function (accountType) {
            view.updateAccountTypesFilter(accountType);
            view.reloadTableData();
        };
        channel.onAccountTypeToggledReceived(view.event.onAccountTypesToggled);

        view.event.onViewChanged = function (viewFilter) {
            view.updateViewFilter(viewFilter);
            view.reloadTableData();
        };
        channel.onViewChangedReceived(view.event.onViewChanged);

        view.event.onFollowToggled = function (field) {
            model.toggleFollow(field)
                .then(view.reloadTableData.bind(view), view.showError.bind(view));
        };

        view.event.getLatLongData = function (data, callback) {
            model.getLatLongData(data)
                .then(callback.bind(view), view.showError.bind(view));
        };

        view.event.onToggleColumn = function (column) {
            column.visible = !column.visible;
            view.reloadTableColumns();
        };

        view.event.onFieldsRestoreDefault = function () {
            view.resetTableColumns();
        };

        view.event.onDeleteAccount = function (account) {
            model.deleteAccount(account)
                .then(view.onAccountDeleted.bind(view), view.showError.bind(view));
        };

        view.event.onTableDataRequesting = function (option, requestData, callback, settings) {
            model.loadAccountsList(option, requestData, settings).then(callback.bind(view), view.requestTableDataFailure.bind(view));
        };

        view.event.onAccountsNextPage = function () {

        };

        view.event.onDisposing = function () {
        };
    };

    AccountListPresenter.prototype.tableFieldsLoaded = function (data) {
        var self = this;
        self.view.onTableFieldsLoaded(data);
    };

    AccountListPresenter.prototype.onTableFieldsFilterDeselected = function (fields) {
        var self = this;
        self.view.updateCustomFilters(fields);
        self.view.reloadTableData();
    };

    AccountListPresenter.prototype.filterChanged = function (filterKey, filterValue) {
        var self = this;
        self.view.mapCustomFilter(filterKey, filterValue);
        self.view.reloadTableData();
    };

    AccountListPresenter.prototype.showError = function (error) {

    };

    return AccountListPresenter;
});