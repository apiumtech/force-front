/**
 * Created by kevin on 10/22/14.
 */

app.registerPresenter(function (container) {
    var QueryBuilder = container.getService('services/QueryBuilder');

    function AccountPresenter() {
    }

    AccountPresenter.prototype.show = function (view, model) {
        view.event.onInit = function () {
            model.getAccounts().then(view.showTableData.bind(view), view.showError.bind(view));
        }.bind(this);

        //view.event.onNameFilterChange = function (currentValue) {
        //    if (currentValue != '') {
        //        model.getNameAutocompletion(currentValue)
        //            .then(view.showAccountAutocomplete.bind(view), view.showError.bind(view));
        //    }
        //}.bind(this);

        view.event.onNameFilterChanged = function (currentValue) {
            model.setFilter({columnKey: "name"}, currentValue)
                .then(view.showTableDataFilteredByName.bind(view), view.showError.bind(view))
        }.bind(this);

        view.event.onFilterKeyUp = function (name, currentValue) {
            model.setFilter(name, currentValue)
                .then(view.showTableData.bind(view), view.showError.bind(view));
        }.bind(this);

        view.event.onShowAvailableFilters = function () {
            model.getAvailableFilters()
                .then(view.showAvailableFilters.bind(view), view.showError.bind(view));
        }.bind(this);

        view.event.onAddFilter = function (column) {
            model.addFilter(column, undefined)
                .then(view.showFilters.bind(view), view.showError.bind(view));
        }.bind(this);

        view.event.onSelectNameAutocompletion = function (value) {
            model.setFilter(name, value)
                .then(view.showTableDataFilteredByName.bind(view), view.showError.bind(view));
        }.bind(this);

        view.event.onSort = function (field) {
            model.sortByField(field)
                .then(view.showTableData.bind(view), view.showError.bind(view));
        }.bind(this);

        view.event.onRemoveColumn = function (column) {
            model.removeField(column)
                .then(view.showTableData.bind(view), view.showError.bind(view));
        }.bind(this);

        view.event.onRemoveFilter = function (filter) {
            model.removeFilter(filter)
                .then(view.showTableDataWithoutFilter.bind(view, filter), view.showError.bind(view))
        }.bind(this);

        view.event.onToggleOwnerFilter = function (owner) {
            model.toggleOwnerFilter(owner)
                .then(view.showTableData.bind(view), view.showError.bind(view));
        }.bind(this);

        view.event.onShowAvailableOwners = function (nameFilter) {
            model.getAvailableOwners(nameFilter)
                .then(view.showAvailableOwners.bind(view), view.showError.bind(view));
        }.bind(this);

        view.event.onAddColumn = function (column) {
            model.addField(column)
                .then(view.showTableData.bind(view));
        }.bind(this);

        view.event.onShowAvailableColumns = function () {
            model.getAllFields()
                .then(view.showColumnList.bind(view), view.showError.bind(view));
        }.bind(this);

        view.event.onAccountsNextPage = function () {
            model.nextPage()
                .then(view.addTableData.bind(view), view.showError.bind(view));
        }.bind(this);
    };

    AccountPresenter.newInstance = function ($defaultSorting, $queryBuilder, $defaultUsedFilters, $selectedOwners) {
        var s = $defaultSorting || {'field': 'name', 'dir': 'asc'};
        var qb = $queryBuilder || QueryBuilder.newInstance().getOrElse(throwException("Could not create QueryBuilder!!"));
        var filters = $defaultUsedFilters || [];
        var owners = $selectedOwners || [];

        return Some(new AccountPresenter(s, qb, filters, owners));
    };

    return { newInstance: AccountPresenter.newInstance };
});
