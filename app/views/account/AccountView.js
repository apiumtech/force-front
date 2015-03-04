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
        this.data.map = null;
        this.data.table = null;

        this.data.availableColumns = [
            {data: "following", title: "Following", sortable: false, visible: true},
            {data: "name", title: "Account Name", visible: true},
            {data: "class", title: "Class.", visible: true},
            {data: "$loki", title: '<i class="fa ic-checkin-filled brand-green-text"></i>', visible: true},
            {data: "contactInfo.country", title: "Country", visible: true},
            {data: "contactInfo.city", title: "City", visible: true},
            {data: "contactInfo.address", title: "Address", visible: true},
            {data: "contactInfo.phoneNumber", title: "Tel. Number", visible: true},
            {data: "modified", title: "Modification Date", visible: true},
            {data: "responsible.name", title: "Owner", visible: true}
        ];

        this.data.filters = {
            owner: {
                filtering: false,
                values: []
            },
            view: {
                filtering: false,
                value: ""
            },
            environments: {
                filtering: false,
                values: []
            },
            accountType: {
                filtering: false,
                values: []
            },
            query: {
                filtering: false,
                value: ""
            }
        };

        var self = this;
        this.data.dataTableConfig = {
            bServerSide: true,
            processing: true,
            bSort: true,
            ajax: {
                url: Configuration.api.dataTableRequest,
                type: 'POST'
            },
            sDom: "<'row'<'col-md-6 col-sm-6'l><'col-md-6 col-sm-6'f>r>t<'row'<'col-md-6 col-sm-6'i><'col-md-6 col-sm-6'p>>",
            bPaginate: false,
            columns: this.data.availableColumns,
            fnServerParams: this.onServerRequesting.bind(this),
            columnDefs: [
                {
                    targets: 0,
                    render: function (data, type, row) {
                        var activeClass = data ? 'active' : '';
                        return '<button type="button" function-togglefollow ng-click="event.onFollowToggled(row)" class="btn btn-default btn-sm btn-follow btn-squared btn-squared ' + activeClass + '">' +
                            '<i class="fa ic-flag"></i>' +
                            '</button>';
                    }
                },
                {
                    targets: 3,
                    render: function (data, type, row) {
                        return '<a ng-click=""><i class="fa ic-checkin-filled brand-green-text"></i></a>';
                    }
                }
            ],
            fnRowCallback: self.onRowRenderedCallback.bind(self)
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
        };

        self.fn.initTable = function () {
            self.data.table = self.dataTableService.createDatatable("#data-table", self.data.dataTableConfig);
        };

        self.fn.isImageHeader = function (header) {
            return header.charAt(0) === '<' && header.charAt(header.length - 1) === '>';
        };
    };

    AccountView.prototype.onRowRenderedCallback = function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        var self = this;
        $(nRow).on("click", "[function-togglefollow]", function (e) {
            e.preventDefault();
            self.event.onFollowToggled(aData);
        });
    };

    AccountView.prototype.onServerRequesting = function (aoData) {
        if (!aoData.customFilter) aoData.customFilter = {};

        var filters = this.data.filters;
        if (filters.owner.filtering) {
            aoData.customFilter['owners'] = filters.owner.values;
        }
        if (filters.query.filtering) {
            aoData.customFilter['searchQuery'] = filters.query.value;
        }
    };

    AccountView.prototype.updateOwnerFilter = function (owner) {
        var self = this;
        var ownerFilter = self.data.filters.owner;
        if (owner.selected) {
            ownerFilter.filtering = true;
            if (ownerFilter.values.indexOf(owner.name) == -1)
                ownerFilter.values.push(owner.name);
        } else {
            ownerFilter.values = ownerFilter.values.filter(function (value) {
                return value != owner.name;
            });
            ownerFilter.filtering = !!ownerFilter.values.length;
        }
    };

    AccountView.prototype.updateQueryingString = function (queryString) {
        var self = this;
        if (queryString) {
            self.data.filters.query.filtering = true;
            self.data.filters.query.value = queryString;
        } else {
            self.data.filters.query.filtering = false;
            self.data.filters.query.value = "";
        }
    };

    AccountView.prototype.reloadTableColumns = function () {
        var self = this;
        for (var i = 0; i < self.data.availableColumns.length; i++) {
            var column = self.data.table.column(i);

            column.visible(self.data.availableColumns[i].visible);
        }
    };

    AccountView.prototype.reloadTableData = function () {
        this.data.table.draw();
    };

    AccountView.prototype.resetTableColumns = function () {
        var self = this;
        for (var i = 0; i < self.data.availableColumns.length; i++) {
            self.data.availableColumns[i].visible = true;

            var column = self.data.table.column(i);
            column.visible(self.data.availableColumns[i].visible);
        }
    };

    AccountView.prototype.showError = function (error) {
        this.data.currentError = error;
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
