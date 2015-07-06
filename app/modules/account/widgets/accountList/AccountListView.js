define([
    'shared/BaseView',
    'shared/services/bus/AccountDetailWidgetEventBus',
    'modules/account/widgets/accountList/AccountListPresenter',
    'shared/services/GoogleMapService',
    'shared/services/PopoverAdapter',
    'shared/services/DataTableService',
    'config',
    'shared/services/SimpleTemplateParser',
    'underscore',
    'jquery',
    'moment',
    'shared/services/bus/ScrollEventBus',
    'shared/services/notification/NotificationService'
], function (BaseView, AccountDetailWidgetEventBus, AccountListPresenter, GoogleMapService, PopoverAdapter,
             DataTableService, Configuration, SimpleTemplateParser, _, $, moment, ScrollEventBus, NotificationService) {
    'use strict';

    function AccountListView($scope, $element, presenter, mapService, dataTableService, templateParser, notificationService) {
        presenter = presenter || new AccountListPresenter();
        BaseView.call(this, $scope, null, presenter);
        this.element = $element;
        this.eventChannel = AccountDetailWidgetEventBus.newInstance();
        this.notificationService = notificationService || NotificationService._diResolve();
        this.popupAdapter = PopoverAdapter.newInstance();
        this.mapService = mapService || GoogleMapService.newInstance();
        this.dataTableService = dataTableService || DataTableService.newInstance();
        this.templateParser = templateParser || new SimpleTemplateParser();
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
        this.data.isToggleFollowReload = false;
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

    AccountListView.inherits(BaseView, {
        eventChannel: {
            get: function () {
                return this.$scope.eventChannel;
            },
            set: function (value) {
                this.$scope.eventChannel = value;
            }
        },
        isEmpty: {
            get: function () {
                return this.$scope.isEmpty;
            },
            set: function (value) {
                this.$scope.isEmpty = value;
            }
        },
        serverError: {
            get: function () {
                return this.$scope.serverError;
            },
            set: function (value) {
                this.$scope.serverError = value;
            }
        },
        errorMessage: {
            get: function () {
                return this.$scope.errorMessage;
            },
            set: function (value) {
                this.$scope.errorMessage = value;
            }
        }
    });

    AccountListView.prototype.configureEvents = function () {
        var self = this;
        self.data.map = null;
        self.eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

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

        self.fn.bindDocumentDomEvents = function () {
            $(document).on('click', '.close-pop-over', function (e) {
                self.popupAdapter.closePopover('div.popover');
            });

            $(document).on('click', function (e) {
                self.popupAdapter.closePopover('div.popover');
            });
        };

        self.fn.reloadPage = function () {
            location.reload();
        };

        self.$scope.$on("$destroy", self.onDisposing.bind(self));

    };


    AccountListView.prototype.onReloadCommandReceived = function (isReload) {
        var self = this;
        if (self.data.table)
            self.reloadTableData();
    };

    AccountListView.prototype.collapseMap = function () {
        var self = this;
        self.data.mapCanvasCollapsed = true;
    };

    AccountListView.prototype.onTableFieldsLoaded = function (data) {
        this.data.availableColumns = data;

        var self = this;
        this.data.dataTableConfig = {
            bServerSide: true,
            processing: true,
            bSort: true,
            columns: this.data.availableColumns,
            ajax: self.requestTableData.bind(self),
            error: self.requestTableDataFailure.bind(self),
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
                self.data.isToggleFollowReload = false;
                self.onDataRenderedCallback.call(self, api.data());
            }
        };
        self.data.table = self.dataTableService.createDatatable("#data-table", self.data.dataTableConfig);
    };

    AccountListView.prototype.closeInfoWindowInMap = function () {
        var self = this;

        if (self.data.infoWindow)
            self.data.infoWindow.close();
    };

    AccountListView.prototype.onPageScrolledToBottom = function () {
        var self = this;
        if (self.tableOption.stopLoading)
            return;

        self.reloadTableData();
    };

    AccountListView.prototype.requestTableData = function (requestData, callback, settings) {
        var self = this;
        if (self.data.isToggleFollowReload) {
            console.log(settings);
            settings.toggleFollow = true;
        }
        self.event.onTableDataRequesting(self.tableOption, requestData, callback, settings);
    };

    AccountListView.prototype.requestTableDataFailure = function (requestData) {
        var self = this;
        self.serverError = true;
        var status = requestData.status ? requestData.status.toString() : '';
        if (status.match(/[5][0-9]{2}/i)) {
            self.errorMessage = "We're sorry! There is an internal server error. Please try again later.";
        }
        else if (status.match(/[4][0-9]{2}/i)) {
            self.errorMessage = "We're sorry! The resource that you're trying to reach is not available at the moment. Please check your internet connection or try again later.";
        }
        else {
            self.errorMessage = "We're sorry! Something went wrong. Please try again later";
        }
    };

    AccountListView.prototype.onDataRenderedCallback = function (data) {
        var self = this;
        data.length > 0 ? self.isEmpty = false : self.isEmpty = true;
        self.eventChannel.sendReloadCompleteCommand();
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
    };

    AccountListView.prototype.onRowRenderedCallback = function (nRow, aData) {
        var self = this;
        $(nRow).on("click", "[function-togglefollow]", function (e) {
            e.preventDefault();
            self.data.isToggleFollowReload = true;
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
            self.popupAdapter.closePopover('div.popover');
            e.stopPropagation();

            self.popupAdapter.openPopover($("a[function-getlocation]", nRow));
            $("a[function-getlocation]", nRow).data("opened", true);
        });
    };

    AccountListView.prototype.onServerRequesting = function (aoData) {
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

    AccountListView.prototype.getPopoverTemplate = function () {
        return $('#popover_template').html();
    };

    AccountListView.prototype.getPopoverContentTemplate = function () {
        return $('#popover_content_template').html();
    };

    AccountListView.prototype.mapCustomFilter = function (key, values) {
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

    AccountListView.prototype.createMapMarker = function (accountData) {
        var self = this;

        var latLng = self.mapService.getLatLng(parseFloat(accountData.contactInfo.latitude), parseFloat(accountData.contactInfo.longitude));

        var marker = self.mapService.createMarker({
            position: latLng,
            title: ''
        });
        self.mapService.bindClickEvent(marker, function () {
            self.closeInfoWindowInMap();
            var parsedContent = self.templateParser.parseTemplate(self.getInfoWindowTemplate(), accountData);
            self.data.infoWindow = self.mapService.createInfoWindow(parsedContent);
            self.data.infoWindow.open(self.data.map, marker);
        });
        self.data.latlngbounds.extend(latLng);
        self.markers.push(marker);
    };

    AccountListView.prototype.getLatLng = function (lat, lng) {
        return new this.mapService.LatLng(lat, lng);
    };

    AccountListView.prototype.renderFollowColumn = function (data) {
        var activeClass = data ? 'active' : '';
        return '<button type="button" function-togglefollow class="btn btn-default btn-sm btn-follow btn-squared btn-squared ' + activeClass + '">' +
            '<i class="fa ic-flag"></i>' +
            '</button>';
    };

    AccountListView.prototype.renderLogoColumn = function (data, type, row) {
        var self = this;
        var accountNameColTemplate = $(".accountLogoTemplate").html();
        return self.templateParser.parseTemplate(accountNameColTemplate, row);
    };

    AccountListView.prototype.renderNameColumn = function (data, type, row) {
        var self = this;
        var accountNameColTemplate = $(".accountNameColumnTemplate").html();
        return self.templateParser.parseTemplate(accountNameColTemplate, row);
    };

    AccountListView.prototype.updateCustomFilters = function (deselectedFields) {
        var self = this;
        var filters = self.data.filters;

        if (filters.customFilters.values.length) {
            filters.customFilters.values = filters.customFilters.values.filter(function (filter) {
                return deselectedFields.indexOf(filter.key) === -1;
            });
        }
    };

    AccountListView.prototype.renderModifiedColumn = function (data) {
        return moment(data).format("DD/MM/YYYY");
    };

    AccountListView.prototype.renderLocationColumn = function (data) {
        return '<a function-getlocation><i class="fa ic-checkin-filled brand-green-text"></i></a>';
    };

    AccountListView.prototype.updateOwnerFilter = function (owner) {
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

    AccountListView.prototype.updateEnvironmentFilter = function (environment) {
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

    AccountListView.prototype.updateAccountTypesFilter = function (accountType) {
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

    AccountListView.prototype.updateViewFilter = function (view) {
        var self = this;
        var viewFilter = self.data.filters.view;
        if (view && view.selected) {
            viewFilter.filtering = true;
            viewFilter.value = view.id;
        } else {
            viewFilter.value = null;
            viewFilter.filtering = false;
        }
    };

    AccountListView.prototype.updateQueryingString = function (queryString) {
        var self = this;
        self.data.filters.query.filtering = !!queryString;
        self.data.filters.query.value = queryString || "";
    };

    AccountListView.prototype.reloadTableColumns = function () {
        var self = this;
        for (var i = 0; i < self.data.availableColumns.length; i++) {
            var column = self.data.table.column(i);

            column.visible(self.data.availableColumns[i].visible);
        }
    };

    AccountListView.prototype.reloadTableData = function () {
        this.data.table.draw();
    };

    AccountListView.prototype.resetTableColumns = function () {
        var self = this;
        for (var i = 0; i < self.data.availableColumns.length; i++) {
            self.data.availableColumns[i].visible = true;

            var column = self.data.table.column(i);
            column.visible(self.data.availableColumns[i].visible);
        }
    };

    AccountListView.prototype.onDisposing = function () {
        var self = this;
        self.data.table.destroy();
        self.event.onDisposing();
        ScrollEventBus.dispose();
    };

    AccountListView.prototype.showError = function (error) {
        this.data.currentError = error;
    };

    AccountListView.prototype.getInfoWindowTemplate = function () {
        return $(".googleMapPopupContentTemplate").first().html();
    };

    AccountListView.newInstance = function ($scope, model, presenter, viewRepaintAspect, logErrorAspect) {
        var view = new AccountListView($scope, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return AccountListView;
});