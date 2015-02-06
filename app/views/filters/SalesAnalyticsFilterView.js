/**
 * Created by justin on 2/3/15.
 */

app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');
    var SalesAnalyticsFilterChannel = container.getService("services/bus/SalesAnalyticsFilterChannel");
    //var SalesAnalyticsFilterModel = container.getModel('models/filters/SalesAnalyticsFilterModel');

    var SalesAnalyticsFilterModel = container.getModel('models/filters/SalesAnalyticsFilterPresentationModel');
    var SalesAnalyticsFilterPresenter = container.getModel('presenters/filters/SalesAnalyticsFilterPresenter');

    var _ = container.getFunction("underscore");

    function SalesAnalyticsFilterView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.filterChannel = SalesAnalyticsFilterChannel.newInstance("WidgetDecoratedPage").getOrElse(throwInstantiateException(SalesAnalyticsFilterChannel));
        var self = this;
        self.$scope.datePickerFormat = 'dd/MM/yyyy';
        self.$scope.dateOptionRange = [7, 15, 30, 90];
        self.datePickerSettings = {
            showWeeks: false,
            showButtonBar: false
        };

        SalesAnalyticsFilterView.configureEvents(this);
    }

    SalesAnalyticsFilterView.prototype = Object.create(BaseView.prototype, {
        datePickerSettings: {
            get: function () {
                return this.$scope.datePickerSettings;
            },
            set: function (value) {
                this.$scope.datePickerSettings = value;
            }
        },
        datePickerStartOpened: {
            get: function () {
                return this.$scope.datePickerStartOpened || (this.$scope.datePickerStartOpened = false);
            },
            set: function (value) {
                this.$scope.datePickerStartOpened = value;
            }
        },
        datePickerEndOpened: {
            get: function () {
                return this.$scope.datePickerEndOpened || (this.$scope.datePickerEndOpened = false);
            },
            set: function (value) {
                this.$scope.datePickerEndOpened = value;
            }
        },
        dateRangeFilterOpened: {
            get: function () {
                return this.$scope.dateRangeFilterOpened || (this.$scope.dateRangeFilterOpened = false);
            },
            set: function (value) {
                this.$scope.dateRangeFilterOpened = value;
            }
        },
        userFilterOpened: {
            get: function () {
                return this.$scope.userFilterOpened || (this.$scope.userFilterOpened = false);
            },
            set: function (value) {
                this.$scope.userFilterOpened = value;
            }
        },
        currentUserFilterGroup: {
            get: function () {
                return this.$scope.currentUserFilterGroup || (this.$scope.currentUserFilterGroup = 'team');
            },
            set: function (value) {
                this.$scope.currentUserFilterGroup = value;
            }
        },
        dateRangeStart: {
            get: function () {
                return this.$scope.dateRangeStart || (this.$scope.dateRangeStart = this.fn.getPreviousDate(30, this.dateRangeEnd));
            },
            set: function (value) {
                this.$scope.dateRangeStart = value;
            }
        },
        dateRangeEnd: {
            get: function () {
                return this.$scope.dateRangeEnd || (this.$scope.dateRangeEnd = new Date());
            },
            set: function (value) {
                this.$scope.dateRangeEnd = value;
            }
        },
        usersList: {
            get: function () {
                return this.$scope.usersList || (this.$scope.usersList = []);
            },
            set: function (value) {
                this.$scope.usersList = value;
            }
        },
        userFiltered: {
            get: function () {
                return this.$scope.userFiltered || (this.$scope.userFiltered = []);
            },
            set: function (value) {
                this.$scope.userFiltered = value;
            }
        },
        searchingUser: {
            get: function () {
                return this.$scope.searchingUser || (this.$scope.searchingUser = "");
            },
            set: function (value) {
                this.$scope.searchingUser = value;
            }
        }
    });

    SalesAnalyticsFilterView.configureEvents = function (instance) {
        var self = instance;

        self.fn.openDatePickerStart = function (event) {
            event.stopPropagation();
            self.datePickerStartOpened = true;
            self.datePickerEndOpened = false;
        };

        self.fn.openDatePickerEnd = function (event) {
            event.stopPropagation();
            self.datePickerEndOpened = true;
            self.datePickerStartOpened = false;
        };

        self.fn.closeDateTimePickers = function (event) {
            event.stopPropagation();
            self.datePickerEndOpened = false;
            self.datePickerStartOpened = false;
        };

        self.fn.loadPreviousLastDaysFilter = function (days, event) {
            self.dateRangeEnd = new Date();
            self.dateRangeStart = self.fn.getPreviousDate(days, self.dateRangeEnd);
            self.fn.applyDateFilter();
            self.dateRangeFilterOpened = false;
        };

        self.fn.dateFilterToggled = function (isOpened) {
            if (isOpened) {
                self.dateRangeStart = null;
                self.dateRangeEnd = null;
            }
        };

        self.fn.getPreviousDate = function (days, from) {
            return moment(from).subtract(days, 'days').toDate();
        };

        self.fn.getDatePlaceholder = function () {
            return moment(self.dateRangeStart).format("DD/MM/YYYY") + '-' + moment(self.dateRangeEnd).format("DD/MM/YYYY");
        };

        self.fn.getFilteredUsersList = function () {
            if (!self.searchingUser || self.searchingUser === "")
                self.userFiltered = self.usersList;
            else
                self.userFiltered = self._getFilteredUsers(self.usersList, self.searchingUser);
        };

        self.fn.searchUsersByTeam = function (event) {
            event.stopPropagation();
            self.currentUserFilterGroup = 'team';
        };

        self.fn.searchUsersByHierarchy = function (event) {
            event.stopPropagation();
            self.currentUserFilterGroup = 'hierarchy';
        };

        self.fn.initializeFilters = function () {
            self.event.onFilterInitializing();
        };

        self.fn.applyDateFilter = function () {
            self.dateRangeFilterOpened = false;
            self.filterChannel.sendDateFilterApplySignal({
                dateStart: self.dateRangeStart,
                dateEnd: self.dateRangeEnd
            });
        };

        self.fn.cancelFilter = function () {
            self.dateRangeStart = null;
            self.dateRangeEnd = null;
            self.dateRangeFilterOpened = false;
        };
    };

    SalesAnalyticsFilterView.prototype._getFilteredUsers = function (inputList, queryString) {
        var result = [];

        inputList.forEach(function (dataRecord) {
            var group = _.find(result, function (item) {
                return item.group === dataRecord.group;
            });

            if (group === undefined) {
                group = {
                    group: dataRecord.group,
                    data: []
                };
                result.push(group);
            }

            dataRecord.data.forEach(function (record) {
                if (record.name.toLowerCase().indexOf(queryString.toLowerCase()) != -1)
                    group.data.push(record);
            });
        });

        console.log(result);
        return result;
    };

    SalesAnalyticsFilterView.prototype.onUsersLoadedSuccess = function (data) {
        var self = this;
        self.usersList = data;
        self.fn.getFilteredUsersList();
    };

    SalesAnalyticsFilterView.prototype.onUsersLoadedFail = function (error) {
        this.showError(error);
    };

    SalesAnalyticsFilterView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || SalesAnalyticsFilterModel.newInstance().getOrElse(throwInstantiateException(SalesAnalyticsFilterModel));
        var presenter = $presenter || SalesAnalyticsFilterPresenter.newInstance().getOrElse(throwInstantiateException(SalesAnalyticsFilterPresenter));

        var view = new SalesAnalyticsFilterView($scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return SalesAnalyticsFilterView;
});