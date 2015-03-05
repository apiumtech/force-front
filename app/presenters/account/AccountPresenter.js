/**
 * Created by justin on 3/5/15
 */

app.registerPresenter(function (container) {
    var FilterChannel = container.getService('services/bus/FilterChannel');

    function AccountPresenter(filterEventChannel) {
        this.filterChannel = filterEventChannel;
    }

    AccountPresenter.prototype.show = function (view, model) {
        var channel = this.filterChannel;

        view.event.onOwnerToggled = function (owner) {
            view.updateOwnerFilter(owner);
            view.reloadTableData();
        };
        channel.onOwnerToggleReceived(view.event.onOwnerToggled);

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

    AccountPresenter.newInstance = function ($filterChannel) {
        var filterChannel = $filterChannel || FilterChannel.newInstance().getOrElse(throwException("Could not create FilterChannel!"));

        return Some(new AccountPresenter(filterChannel));
    };

    return {newInstance: AccountPresenter.newInstance};
});
