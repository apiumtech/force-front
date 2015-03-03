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
    var DataTableService = container.getService("services/DataTableService");
    var Configuration = container.getService('Configuration');

    function AccountView($scope, $model, $presenter, mapService, dataTableService) {
        BaseView.call(this, $scope, $model, $presenter);
        this.mapService = mapService;
        this.dataTableService = dataTableService;

        this.dataTableConfig = {
            bServerSide: true,
            processing: true,
            bSort: true,
            ajax: {
                url: Configuration.api.dataTableRequest,
                type: 'POST'
            },
            "sDom": "<'row'<'col-md-6 col-sm-6'l><'col-md-6 col-sm-6'f>r>t<'row'<'col-md-6 col-sm-6'i><'col-md-6 col-sm-6'p>>",
            "bPaginate": false,
            "columns": [
                {"data": "following", searchable: false, title: "Following", sortable: false},
                {"data": "name", searchable: false, title: "Account Name"},
                {"data": "class", searchable: false, title: "Class."},
                {"data": "contactInfo.country", searchable: false, title: "Country"},
                {"data": "contactInfo.city", searchable: false, title: "City"},
                {"data": "contactInfo.address", searchable: false, title: "Address"},
                {"data": "contactInfo.phoneNumber", searchable: false, title: "Tel. Number"},
                {"data": "modified", searchable: false, title: "Modification Date"},
                {"data": "responsible.name", searchable: false, title: "Owner"}
            ]
        };
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

        self.fn.initTable = function () {
            self.data.table = self.dataTableService.createDatatable("#data-table", self.dataTableConfig);
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

    AccountView.newInstance = function ($scope, $model, $presenter, $mapService, $dataTableService, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var model = $model || AccountModel.newInstance().getOrElse(throwInstantiateException(AccountModel));
        var presenter = $presenter || AccountPresenter.newInstance().getOrElse(throwInstantiateException(AccountPresenter));
        var mapService = $mapService || GoogleMapService.newInstance().getOrElse(throwInstantiateException(GoogleMapService));
        var dataTableService = $dataTableService || DataTableService.newInstance().getOrElse(throwInstantiateException(DataTableService));

        var view = new AccountView(scope, model, presenter, mapService, dataTableService);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return {newInstance: AccountView.newInstance};
});
