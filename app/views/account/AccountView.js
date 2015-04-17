/**
 * Created by kevin on 10/22/14.
 */

app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var AccountPresenter = container.getPresenter('presenters/account/AccountPresenter');
    var AccountModel = container.getModel('models/account/AccountModel');
    var GoogleMapService = container.getService("services/GoogleMapService");
    var PopoverAdapter = container.getService("services/PopoverAdapter");
    var DataTableService = container.getService("services/DataTableService");
    var Configuration = container.getService('Configuration');
    var SimpleTemplateParser = container.getService("services/SimpleTemplateParser");
    var _ = container.getFunction("underscore");
    var $ = container.getFunction("jquery");
    var moment = container.getFunction("moment");
    var ScrollEventBus = container.getService('services/bus/ScrollEventBus').getInstance();

    function AccountView($scope, $model, $presenter, mapService, dataTableService, templateParser) {
        BaseView.call(this, $scope, $model, $presenter);
        this.popupAdapter = PopoverAdapter.newInstance().getOrElse(throwInstantiateException(PopoverAdapter));
        this.mapService = mapService;
        this.dataTableService = dataTableService;
        this.templateParser = templateParser;
        this.isLoading = false;
        this.data.map = null;
        this.data.mapCanvasCollapsed = false;
        this.data.table = null;
        this.data.accountDetailPage = "#/accounts/{id}";
        this.tableOption = {
            pageSize: Configuration.pageSize,
            currentPage: -1,
            stopLoading: false,
            startFilter: false
        };
        this.$scope.resultCounts = 0;

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
            },
            customFilters: {
                values: []
            }
        };

        this.configureEvents();
    }

    AccountView.prototype = Object.create(BaseView.prototype, {
        isLoading: {
            get: function () {
                return this.$scope.isLoading || (this.$scope.isLoading = false);
            },
            set: function (value) {
                this.$scope.isLoading = value;
            }
        }
    });

    AccountView.prototype.configureEvents = function () {
        var self = this;
        self.data.map = null;

        ScrollEventBus.onScrolledToBottom(self.onPageScrolledToBottom.bind(self));

        self.fn.initializeChart = function () {
            var mapOptions = {
                zoom: 8,
                center: self.mapService.getLatLng(-34.397, 150.644)
            };
            self.data.map = self.mapService.createMap($('#map-canvas')[0], mapOptions);
            self.data.latlngbounds = self.mapService.getLatLngBounds();
            self.mapService.bindClickEvent(self.data.map, self.closeInfoWindowInMap.bind(self));
            setTimeout(self.collapseMap.bind(self), 0);
        };

        self.fn.initTable = function () {
            self.event.onTableFieldsRequested();
            self.fn.bindDocumentDomEvents();
        };

        self.fn.isImageHeader = function (header) {
            return header.charAt(0) === '<' && header.charAt(header.length - 1) === '>';
        };

        self.fn.bindDocumentDomEvents = function () {
            $(document).on('click', '.close-pop-over', function (e) {
                self.popupAdapter.closePopover('div.popover');
            });

            $(document).on('click', function (e) {
                self.popupAdapter.closePopover('div.popover');
            });
        };

        self.$scope.$on("$destroy", self.onDisposing.bind(self));
    };

    AccountView.prototype.collapseMap = function () {
        var self = this;
        self.data.mapCanvasCollapsed = true;
    };

    AccountView.prototype.onTableFieldsLoaded = function (data) {
        this.data.availableColumns = data;

        var self = this;
        this.data.dataTableConfig = {
            bServerSide: true,
            processing: true,
            bSort: true,
            columns: this.data.availableColumns,
            ajax: this.requestTableData.bind(this),
            fnServerParams: this.onServerRequesting.bind(this),
            sDom: "<'row'<'col-md-6 col-sm-6'l><'col-md-6 col-sm-6'f>r>tS<'row'<'col-md-6 col-sm-6'i><'col-md-6 col-sm-6'p>>",
            paging: false,
            columnDefs: [
                {
                    targets: 0,
                    render: self.renderFollowColumn.bind(self)
                },
                {
                    targets: 1,
                    render: self.renderNameColumn.bind(self)
                },
                {
                    targets: 2,
                    render: self.renderLogoColumn.bind(self)
                },
                {
                    targets: 4,
                    render: self.renderLocationColumn.bind(self)
                },
                {
                    targets: 9,
                    render: self.renderModifiedColumn.bind(self)
                }
            ],
            rowCallback: self.onRowRenderedCallback.bind(self),
            drawCallback: function () {
                var api = this.api();
                self.$scope.resultCounts = api.context[0]._iRecordsDisplay;
                self.onDataRenderedCallback.call(self, api.data());
            }
        };
        self.data.table = self.dataTableService.createDatatable("#data-table", self.data.dataTableConfig);
    };

    AccountView.prototype.closeInfoWindowInMap = function () {
        var self = this;

        if (self.data.infoWindow)
            self.data.infoWindow.close();
    };

    AccountView.prototype.onPageScrolledToBottom = function () {
        var self = this;
        if (self.tableOption.stopLoading)
            return;

        self.reloadTableData();
    };

    AccountView.prototype.requestTableData = function (requestData, callback, settings) {
        var self = this;

        self.isLoading = true;
        self.event.onTableDataRequesting(self.tableOption, requestData, callback, settings);
    };

    AccountView.prototype.onDataRenderedCallback = function (data) {
        var self = this;
        self.markers = [];
        _.each(data, function (record) {
            self.createMapMarker(record);
        });

        if (self.markerClusterer) {
            self.markerClusterer.clearMarkers();
        }
        self.markerClusterer = new MarkerClusterer(self.data.map, self.markers, {
            maxZoom: 15,
            gridSize: 50
        });
        self.data.map.setCenter(self.data.latlngbounds.getCenter());
        self.data.map.fitBounds(self.data.latlngbounds);
        self.isLoading = false;
    };

    AccountView.prototype.onRowRenderedCallback = function (nRow, aData) {
        var self = this;
        $(nRow).on("click", "[function-togglefollow]", function (e) {
            e.preventDefault();
            self.event.onFollowToggled(aData);
        });

        self.event.getLatLongData(aData, function (data) {
            var popoverTemplate = self.getPopoverTemplate();
            var popoverContentTemplate = self.getPopoverContentTemplate().format('https://maps.googleapis.com/maps/api/staticmap?center='
            + data.latitude + ',' + data.longitude +
            '&zoom=5&size=250x200&markers=' + data.latitude + ',' + data.longitude + '');
            self.popupAdapter.createPopover($("a[function-getlocation]", nRow), popoverTemplate, popoverContentTemplate, 'top');
        });

        $(nRow).on('click', "[function-getlocation]", function (e) {
            e.stopPropagation();
            self.popupAdapter.openPopover($("a[function-getlocation]", nRow));
        });
    };

    AccountView.prototype.onServerRequesting = function (aoData) {
        if (!aoData.customFilter) aoData.customFilter = {};

        var filters = this.data.filters;
        if (filters.owner.filtering) {
            aoData.customFilter['owners'] = filters.owner.values;
        }
        if (filters.environments.filtering) {
            aoData.customFilter['environments'] = filters.environments.values;
        }
        if (filters.accountType.filtering) {
            aoData.customFilter['accountTypes'] = filters.accountType.values;
        }
        if (filters.view.filtering) {
            aoData.customFilter['view'] = filters.view.value;
        }
        if (filters.query.filtering) {
            aoData.customFilter['searchQuery'] = filters.query.value;
        }

        if (filters.customFilters.values.length) {
            filters.customFilters.values.forEach(function (filter) {
                if (filter.value.length)
                    aoData.customFilter[filter.key] = filter.value;
            });
        }
    };

    AccountView.prototype.getPopoverTemplate = function () {
        return $('#popover_template').html();
    };

    AccountView.prototype.getPopoverContentTemplate = function () {
        return $('#popover_content_template').html();
    };

    AccountView.prototype.mapCustomFilter = function (key, values) {
        var self = this;
        var filters = self.data.filters.customFilters.values;

        var filterByKey = _.find(filters, function (filter) {
            return filter.key == key;
        });

        if (!filterByKey) {
            filters.push({
                key: key,
                value: values
            });
        } else {
            filterByKey.value = values;
        }
    };

    AccountView.prototype.createMapMarker = function (accountData) {
        var self = this;

        var latLng = self.mapService.getLatLng(parseFloat(accountData.contactInfo.latitude), parseFloat(accountData.contactInfo.longitude));

        var marker = self.mapService.createMarker({
            position: latLng,
            title: ''
        });
        self.mapService.bindClickEvent(marker, function () {
            self.closeInfoWindowInMap();
            // TODO: remove this when integrate with real server
            accountData.id = accountData.$loki;
            var parsedContent = self.templateParser.parseTemplate(self.getInfoWindowTemplate(), accountData);
            self.data.infoWindow = self.mapService.createInfoWindow(parsedContent);
            self.data.infoWindow.open(self.data.map, marker);
        });
        self.data.latlngbounds.extend(latLng);
        self.markers.push(marker);
    };

    AccountView.prototype.getLatLng = function (lat, lng) {
        return new this.mapService.LatLng(lat, lng);
    };

    AccountView.prototype.renderFollowColumn = function (data) {
        var activeClass = data ? 'active' : '';
        return '<button type="button" function-togglefollow class="btn btn-default btn-sm btn-follow btn-squared btn-squared ' + activeClass + '">' +
            '<i class="fa ic-flag"></i>' +
            '</button>';
    };

    AccountView.prototype.renderLogoColumn = function (data, type, row) {
        var self = this
        var accountNameColTemplate = $(".accountLogoTemplate").html();
        return self.templateParser.parseTemplate(accountNameColTemplate, row);
    };

    AccountView.prototype.renderNameColumn = function (data, type, row) {
        var self = this
        var accountNameColTemplate = $(".accountNameColumnTemplate").html();
        // TODO: Remove $loki when integrate to real server
        row.id = row.$loki;
        return self.templateParser.parseTemplate(accountNameColTemplate, row);
    };

    AccountView.prototype.updateCustomFilters = function (deselectedFields) {
        var self = this;
        var filters = self.data.filters;

        if (filters.customFilters.values.length) {
            filters.customFilters.values = filters.customFilters.values.filter(function (filter) {
                return deselectedFields.indexOf(filter.key) === -1;
            });
        }
    };

    AccountView.prototype.renderModifiedColumn = function (data) {
        return moment(data).format("DD/MM/YYYY");
    };

    AccountView.prototype.renderLocationColumn = function (data) {
        return '<a function-getlocation><i class="fa ic-checkin-filled brand-green-text"></i></a>';
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

    AccountView.prototype.updateEnvironmentFilter = function (environment) {
        var self = this;
        var environmentFilter = self.data.filters.environments;
        if (environment.selected) {
            environmentFilter.filtering = true;
            if (environmentFilter.values.indexOf(environment.name) == -1)
                environmentFilter.values.push(environment.name);
        } else {
            environmentFilter.values = environmentFilter.values.filter(function (value) {
                return value != environment.name;
            });
            environmentFilter.filtering = !!environmentFilter.values.length;
        }
    };

    AccountView.prototype.updateAccountTypesFilter = function (accountType) {
        var self = this;
        var accountTypeFilter = self.data.filters.accountType;
        if (accountType.selected) {
            accountTypeFilter.filtering = true;
            if (accountTypeFilter.values.indexOf(accountType.name) == -1)
                accountTypeFilter.values.push(accountType.name);
        } else {
            accountTypeFilter.values = accountTypeFilter.values.filter(function (value) {
                return value != accountType.name;
            });
            accountTypeFilter.filtering = !!accountTypeFilter.values.length;
        }
    };

    AccountView.prototype.updateViewFilter = function (view) {
        var self = this;
        var viewFilter = self.data.filters.view;
        if (view && view.selected) {
            viewFilter.filtering = true;
            // TODO: update $loki to the identifier of the view object
            viewFilter.value = view.$loki;
        } else {
            viewFilter.value = null;
            viewFilter.filtering = false;
        }
    };

    AccountView.prototype.updateQueryingString = function (queryString) {
        var self = this;
        self.data.filters.query.filtering = !!queryString;
        self.data.filters.query.value = queryString || "";
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

    AccountView.prototype.onDisposing = function () {
        var self = this;
        self.data.table.destroy();
        self.event.onDisposing();
        ScrollEventBus.dispose();
    };

    AccountView.prototype.showError = function (error) {
        this.data.currentError = error;
    };

    AccountView.prototype.getInfoWindowTemplate = function () {
        return $(".googleMapPopupContentTemplate").first().html();
    };

    AccountView.newInstance = function ($scope, $model, $presenter, $mapService, $dataTableService, $templateParser, $viewRepAspect, $logErrorAspect) {

        var scope = $scope || {};
        var model = $model || AccountModel.newInstance().getOrElse(throwInstantiateException(AccountModel));
        var presenter = $presenter || AccountPresenter.newInstance().getOrElse(throwInstantiateException(AccountPresenter));
        var mapService = $mapService || GoogleMapService.newInstance().getOrElse(throwInstantiateException(GoogleMapService));
        var dataTableService = $dataTableService || DataTableService.newInstance().getOrElse(throwInstantiateException(DataTableService));
        var templateParser = $templateParser || SimpleTemplateParser.newInstance().getOrElse(throwInstantiateException(SimpleTemplateParser));

        var view = new AccountView(scope, model, presenter, mapService, dataTableService, templateParser);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return AccountView;
});
