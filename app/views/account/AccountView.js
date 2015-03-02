/**
 * Created by kevin on 10/22/14.
 */

app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var AccountPresenter = container.getPresenter('presenters/account/AccountPresenter');
    var AccountModel = container.getModel('models/account/AccountModel');
    var ViewRepaintAspect = container.getService('aspects/ViewRepaintAspect');
    var LogErrorAspect = container.getService('aspects/LogErrorAspect');
    var GoogleMapService = container.getService("services/GoogleMapService");

    function AccountView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.mapService = GoogleMapService.newInstance().getOrElse(throwInstantiateException(GoogleMapService));

        this.configureEvents();
    }

    AccountView.prototype = Object.create(BaseView.prototype, {});

    AccountView.prototype.configureEvents = function () {
        var self = this;
        self.data.map = null;

        self.fn.initializeChart = function () {
            var mapOptions = {
                zoom: 8,
                center: new self.mapService.LatLng(-34.397, 150.644)
            };
            self.data.map = new self.mapService.Map($('#map-canvas')[0], mapOptions);
            self.event.onShowAvailableColumns();
        };

        self.fn.isImageHeader = function (header) {
            return header.name.charAt(0) === '/';
        };
    };

    AccountView.prototype.show = function () {
        this.presenter.show(this, this.model);
    };

    AccountView.prototype.showTableData = function (data) {
        this.data.headers = data.headers;
        this.data.accounts = data.elements;
    };

    AccountView.prototype.resetFieldColumns = function (data) {
        this.data.headers = [];
        this.data.accounts = [];
        this.data.currentHiddenColumns = [];
    };

    AccountView.prototype.addTableData = function (data) {
        this.data.accounts = (this.data.accounts || []).concat(data.elements);
    };

    AccountView.prototype.showError = function (error) {
        this.data.currentError = error;
    };

    AccountView.prototype.showColumnList = function (list) {
        this.data.currentHiddenColumns = list;
    };

    AccountView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var model = $model || AccountModel.newInstance().getOrElse(throwException("AccountModel could not be instantiated!!"));
        var presenter = $presenter || AccountPresenter.newInstance().getOrElse(throwException("AccountPresenter could not be instantiated!!"));

        var view = new AccountView(scope, model, presenter);

        if ($viewRepAspect !== false) {
            ($viewRepAspect || ViewRepaintAspect).weave(view);
        }

        if ($logErrorAspect !== false) {
            ($logErrorAspect || LogErrorAspect).weave(view);
        }

        return Some(view);
    };

    return {newInstance: AccountView.newInstance};
});
