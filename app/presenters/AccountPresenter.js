/**
 * Created by kevin on 10/22/14.
 */

app.registerPresenter(function (container) {
    function AccountPresenter() {
    }

    AccountPresenter.prototype.show = function (view, model) {
        view.event.onInit = function () {
            model.getAccounts().then(view.showTableData.bind(view), view.showError.bind(view));
        };

        view.event.onNameFilterKeyUp = function ($event, currentValue) {
            if ($event.which == 13) {
                model.setFilter("name", currentValue)
                    .then(view.showTableDataFilteredByName.bind(view), view.showError.bind(view))
            } else if (currentValue != '') {
                model.getNameAutocompletion(currentValue)
                    .then(view.showAccountAutocomplete.bind(view), view.showError.bind(view));
            }
        };

        view.event.onFilterKeyUp = function ($event, name, currentValue) {
            if ($event.which == 13) {
                model.setFilter(name, currentValue)
                    .then(view.showTableData.bind(view), view.showError.bind(view));
            }
        };

        view.event.onShowAvailableFilters = function () {
            model.getAvailableFilters()
                .then(view.showAvailableFilters.bind(view), view.showError.bind(view));
        };

        view.event.onAddFilter = function (column) {
            model.addFilter(column, undefined)
                .then(view.showFilters.bind(view), view.showError.bind(view));
        };

        view.event.onSelectNameAutocompletion = function (value) {
            model.setFilter(name, value)
                .then(view.showTableDataFilteredByName.bind(view), view.showError.bind(view));
        };

        view.event.onSort = function (field) {
            model.sortByField(field)
                .then(view.showTableData.bind(view), view.showError.bind(view));
        };

        view.event.onToggleColumn = function (column) {
            model.toggleField(column)
                .then(view.showTableData.bind(view), view.showError.bind(view));
        };

        view.event.onRemoveColumn = function (column) {
            model.removeField(column)
                .then(view.showTableData.bind(view), view.showError.bind(view));
        };

        view.event.onRemoveFilter = function (filter) {
            model.removeFilter(filter)
                .then(view.showTableDataWithoutFilter.bind(view, filter), view.showError.bind(view))
        };

        view.event.onToggleOwnerFilter = function (owner) {
            model.toggleOwnerFilter(owner)
                .then(view.showTableData.bind(view), view.showError.bind(view));
        };

        view.event.onShowAvailableOwners = function (nameFilter) {
            model.getAvailableOwners(nameFilter)
                .then(view.showAvailableOwners.bind(view), view.showError.bind(view));
        };

        view.event.onAddColumn = function (column) {
            model.addField(column)
                .then(view.showTableData.bind(view));
        };

        view.event.onShowAvailableColumns = function () {
            model.getAllFields()
                .then(view.showColumnList.bind(view), view.showError.bind(view));
        };

        view.event.onAccountsNextPage = function () {
            model.nextPage()
                .then(view.addTableData.bind(view), view.showError.bind(view));
        };
    };

    AccountPresenter.newInstance = function () {
        return Some(new AccountPresenter());
    };

    return { newInstance: AccountPresenter.newInstance };
});
