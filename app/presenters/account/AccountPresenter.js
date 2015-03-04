/**
 * Created by kevin on 10/22/14.
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

        /* region table */
        view.event.onFollowToggled = function (field) {
            model.toggleFollow(field).then(view.reloadTableData.bind(view), view.showError.bind(view));
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
            model.nextPage()
                .then(view.addTableData.bind(view), view.showError.bind(view));
        };
        /* endregion */
    };

    AccountPresenter.newInstance = function ($filterChannel) {
        var filterChannel = $filterChannel || FilterChannel.newInstance().getOrElse(throwException("Could not create FilterChannel!"));

        return Some(new AccountPresenter(filterChannel));
    };

    return {newInstance: AccountPresenter.newInstance};
});
