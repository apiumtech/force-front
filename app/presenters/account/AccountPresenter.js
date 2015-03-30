/**
 * Created by justin on 3/5/15
 */

app.registerPresenter(function (container) {
    var FilterChannel = container.getService('services/bus/FilterChannel');
    var AccountEventBus = container.getService('services/AccountEventBus');

    function AccountPresenter(filterEventChannel, accountEventBus) {
        this.filterChannel = filterEventChannel;
        this.accountEventBus = accountEventBus;
    }

    AccountPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;
        var self = this;
        var channel = this.filterChannel;
        var eventBus = this.accountEventBus;

        eventBus.onTableFieldsLoaded(self.tableFieldsLoaded.bind(self));

        view.event.onOwnerToggled = function (owner) {
            view.updateOwnerFilter(owner);
            view.reloadTableData();
        };
        channel.onOwnerToggleReceived(view.event.onOwnerToggled);

        view.event.onTableFieldsRequested = function () {
            model.loadTableFields()
                .then(eventBus.fireTableFieldsLoaded, view.showError.bind(view));
        };

        view.event.onSearchQueryChanged = function (queryString) {
            view.updateQueryingString(queryString);
            view.reloadTableData();
        };
        channel.onQueryingData(view.event.onSearchQueryChanged);

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

        view.event.onToggleColumn = function (column) {
            column.visible = !column.visible;
            view.reloadTableColumns();
        };

        view.event.onFieldsRestoreDefault = function () {
            view.resetTableColumns();
        };

        view.event.onDelete = function (account) {
            if (confirm("Do you want to delete " + account.value)) {
                model.deleteAccount(account.id)
                    .then(view.reloadTableData.bind(view), view.showError.bind(view));
            }
        };

        view.event.onAccountsNextPage = function () {

        };
        /* endregion */
    };

    AccountPresenter.prototype.tableFieldsLoaded = function (data) {
        var self = this;
        self.view.onTableFieldsLoaded(data);
    };

    AccountPresenter.newInstance = function ($filterChannel, accountEventBus) {
        var filterChannel = $filterChannel || FilterChannel.newInstance().getOrElse(throwException("Could not create FilterChannel!"));
        accountEventBus = accountEventBus || AccountEventBus.getInstance();

        return Some(new AccountPresenter(filterChannel, accountEventBus));
    };

    return AccountPresenter;
});
