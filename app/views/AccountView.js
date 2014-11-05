/**
 * Created by kevin on 10/22/14.
 */

app.registerView(function (container) {
    var AccountPresenter = container.getPresenter('presenters/AccountPresenter');
    var AccountModel = container.getModel('models/AccountModel');
    var ViewRepaintAspect = container.getService('aspects/ViewRepaintAspect');
    var LogErrorAspect = container.getService('aspects/LogErrorAspect');

    function AccountView($scope, $model, $presenter) {
        this.data = {};
        this.event = {};
        this.fn = {};

        this.$scope = $scope;

        $scope.data = this.data;
        $scope.event = this.event;
        $scope.fn = this.fn;

        this.model = $model;
        this.presenter = $presenter;

        this.fn.isImageHeader = function (header) {
            return header.name.charAt(0) == '/';
        }
    }

    AccountView.prototype.show = function () {
        this.presenter.show(this, this.model);
    };

    AccountView.prototype.showTableData = function (data) {
        this.data.headers = data.headers;
        this.data.accounts = data.elements;
    };

    AccountView.prototype.showTableDataFilteredByName = function (data) {
        this.showTableData(data);
        this.data.autocomplete = [];
    };

    AccountView.prototype.showTableDataWithoutFilter = function (filter, data) {
        this.showTableData(data);
        this.data.customFilters = this.data.customFilters.filter(function (k) {
            return k.columnKey != filter.columnKey
        });
    };

    AccountView.prototype.addTableData = function (data) {
        this.data.accounts = this.data.accounts.concat(data.elements);
    };

    AccountView.prototype.showError = function (error) {
        this.data.currentError = error;
    };

    AccountView.prototype.showColumnList = function (list) {
        this.data.currentHiddenColumns = list;
    };

    AccountView.newInstance = function ($scope, $model, $presenter) {
        var scope = $scope || {};
        var model = $model || AccountModel.newInstance().getOrElse(throwException("AccountModel could not be instantiated!!"));
        var presenter = $presenter || AccountPresenter.newInstance().getOrElse(throwException("AccountPresenter could not be instantiated!!"));

        var view = new AccountView(scope, model, presenter);

        ViewRepaintAspect.weave(view);
        LogErrorAspect.weave(view);

        return Some(view);
    };

    return {newInstance: AccountView.newInstance};
});
