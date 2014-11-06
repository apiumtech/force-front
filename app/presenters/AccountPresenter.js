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
        view.event.onInit = function () {
            model.getAccounts().then(view.showTableData.bind(view), view.showError.bind(view));
        };

        channel.listen(function (event) {
            if (!event.remove) {
                model.setFilters(event)
                    .then(view.showTableData.bind(view), view.showError.bind(view));
            }
        });

        /** region table **/
        view.event.onNameFilterChanged = function (value) {
            model.setNameFilter(value)
                .then(view.showTableData.bind(view), view.showError.bind(view));
        };

        view.event.onSort = function (field) {
            model.sortByField(field)
                .then(view.showTableData.bind(view), view.showError.bind(view));
        };

        view.event.onToggleColumn = function (column) {
            channel.send({ remove: column });

            model.toggleField(column)
                .then(view.showTableData.bind(view), view.showError.bind(view));
        };

        view.event.onShowAvailableColumns = function () {
            model.getAllFields()
                .then(view.showColumnList.bind(view), view.showError.bind(view));
        };

        view.event.onAccountsNextPage = function () {
            model.nextPage()
                .then(view.addTableData.bind(view), view.showError.bind(view));
        };
        /** end region **/
    };

    AccountPresenter.newInstance = function ($filterChannel) {
        var filterChannel = $filterChannel || FilterChannel.newInstance().getOrElse(throwException("Could not create FilterChannel!"));

        return Some(new AccountPresenter(filterChannel));
    };

    return { newInstance: AccountPresenter.newInstance };
});
