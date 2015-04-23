/**
 * Created by justin on 2/3/15.
 */

app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');
    var SalesAnalyticsFilterChannel = container.getService("services/bus/SalesAnalyticsFilterChannel");
    //var SalesAnalyticsFilterModel = container.getModel('models/filters/SalesAnalyticsFilterModel');

    var SalesAnalyticsFilterModel = container.getModel('models/filters/SalesAnalyticsFilterPresentationModel');
    var SalesAnalyticsFilterPresenter = container.getModel('presenters/filters/SalesAnalyticsFilterPresenter');
    var moment = container.getFunction('moment');

    var _ = container.getFunction("underscore");

    function SalesAnalyticsFilterView($scope, $filter, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.filter = $filter;
        this.filterChannel = SalesAnalyticsFilterChannel.newInstance("WidgetDecoratedPage").getOrElse(throwInstantiateException(SalesAnalyticsFilterChannel));
        var self = this;
        self.resetDate = true;
        self.defaultPreviousDay = 30;
        self.datePickerFormat = 'DD/MM/YYYY';
        self.$scope.dateOptionRange = [7, 15, 30, 90];

        SalesAnalyticsFilterView.configureEvents(this);
    }

    SalesAnalyticsFilterView.prototype = Object.create(BaseView.prototype, {
        allUsersSelected: {
            get: function () {
                return this.$scope.allUsersSelected;
            },
            set: function (value) {
                this.$scope.allUsersSelected = value;
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
                return this.$scope.currentUserFilterGroup;
            },
            set: function (value) {
                this.$scope.currentUserFilterGroup = value;
            }
        },
        dateRangeStart: {
            get: function () {
                return this.$scope.dateRangeStart;
            },
            set: function (value) {
                this.$scope.dateRangeStart = value;
            }
        },
        dateRangeEnd: {
            get: function () {
                return this.$scope.dateRangeEnd;
            },
            set: function (value) {
                this.$scope.dateRangeEnd = value;
            }
        },
        dateRangePlaceholder: {
            get: function () {
                return this.$scope.dateRangePlaceholder;
            },
            set: function (value) {
                this.$scope.dateRangePlaceholder = value;
            }
        },
        displayDateStart: {
            get: function () {
                return this.$scope.displayDateStart || (this.$scope.displayDateStart = this.fn.getFormattedDate(this.dateRangeStart));
            },
            set: function (value) {
                this.$scope.displayDateStart = value;
            }
        },
        displayDateEnd: {
            get: function () {
                return this.$scope.displayDateEnd;
            },
            set: function (value) {
                this.$scope.displayDateEnd = value;
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

        self.$scope.$watch('displayDateStart', function (value) {
            var _date = moment(value, self.datePickerFormat);
            if (!_date.isValid()) {
                console.error("Input date is not valid");
                return;
            }

            self.dateRangeStart = _date.toDate();
        });

        self.$scope.$watch('displayDateEnd', function (value) {
            var _date = moment(value, self.datePickerFormat);
            if (!_date.isValid()) {
                console.error("Input date is not valid");
                return;
            }

            self.dateRangeEnd = _date.toDate();
        });

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
            self.displayDateEnd = self.fn.getFormattedDate(self.dateRangeEnd);
            self.displayDateStart = self.fn.getFormattedDate(self.dateRangeStart);
            self.fn.applyDateFilter();
        };

        self.fn.dateFilterToggled = function (isOpened) {
            if (!isOpened) {
                if (!self.resetDate) {
                    self.resetDate = true;
                    return;
                }
                self.fn.resetDate();
            }
        };

        self.fn.validateDateInput = function (event) {
            if ([46, 8, 9, 27, 13, 191, 111].indexOf(event.keyCode) !== -1 ||
                    // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                    // Allow: home, end, left, right, down, up
                (event.keyCode >= 35 && event.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }

            // Ensure that it is a number and stop the keypress
            if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        };

        self.fn.getPreviousDate = function (days, from) {
            if (!from || !(from instanceof Date))
                return null;

            return moment(from).subtract(days, 'days').toDate();
        };

        self.fn.getDatePlaceholder = function () {
            return self.dateRangePlaceholder = self.fn.getFormattedDate(self.dateRangeStart) + '-' + self.fn.getFormattedDate(self.dateRangeEnd);
        };

        self.fn.getFormattedDate = function (date) {
            return moment(date).format(self.datePickerFormat);
        };

        self.fn.getFilteredUsersList = function () {
            if (!self.searchingUser || self.searchingUser === "")
                self.userFiltered = self.usersList;
            else
                self.userFiltered = self._getFilteredUsers(self.usersList, self.searchingUser);
        };

        self.fn.searchUsersByTeam = function (event) {
            event.stopPropagation();
            self.currentUserFilterGroup = 'Environment';
            self.event.onFilterByGroup(self.currentUserFilterGroup);
        };

        self.fn.searchUsersByHierarchy = function (event) {
            event.stopPropagation();
            self.currentUserFilterGroup = 'Hierarqhy';
            self.event.onFilterByGroup(self.currentUserFilterGroup);
        };

        self.fn.initializeFilters = function () {
            self.currentUserFilterGroup = 'Environment';
            self.fn.resetDate();
            self.event.onFilterByGroup(self.currentUserFilterGroup);
        };

        self.fn.applyDateFilter = function () {
            self.resetDate = false;
            self.dateRangeFilterOpened = false;
            self.fn.getDatePlaceholder();
            self.filterChannel.sendDateFilterApplySignal({
                dateStart: self.dateRangeStart,
                dateEnd: self.dateRangeEnd
            });
        };

        self.fn.cancelFilter = function () {
            self.resetDate = true;
            self.dateRangeFilterOpened = false;
        };

        self.fn.resetDate = function () {
            self.dateRangeEnd = new Date();
            self.dateRangeStart = self.fn.getPreviousDate(self.defaultPreviousDay, self.dateRangeEnd);
            self.displayDateEnd = self.fn.getFormattedDate(self.dateRangeEnd);
            self.displayDateStart = self.fn.getFormattedDate(self.dateRangeStart);
            self.fn.getDatePlaceholder();
        };

        self.fn.allUserSelectionChanged = function (event) {
            event.stopPropagation();
            self.toggleSelectAllUsers(self.allUsersSelected);
            self.fn.applyUserFilter();
        };

        self.fn.userSelectionChanged = function () {
            self.checkSelectAllState();
            self.fn.applyUserFilter();
        };

        self.fn.groupSelectAllChanged = function (group) {
            group.data.forEach(function (user) {
                user.checked = group.checked;
            });

            self.checkSelectAllState();
            self.fn.applyUserFilter();
        };

        self.fn.applyUserFilter = function () {
            var filteredIds = self.getFilteredUserIdsList();
            self.filterChannel.sendUserFilterApplySignal(filteredIds);
        };
    };

    SalesAnalyticsFilterView.prototype.checkSelectAllState = function () {
        var self = this;
        var allSelected = true;

        self.userFiltered.forEach(function (group) {
            var containUnselectedData = _.filter(group.data, function (user) {
                    return user.checked === false;
                }).length > 0;

            group.checked = !(containUnselectedData);

            if (!group.checked) {
                allSelected = false;
                return;
            }
        });
        self.allUsersSelected = allSelected;
    };

    SalesAnalyticsFilterView.prototype.toggleSelectAllUsers = function (selectAll) {
        var self = this;

        self.userFiltered.forEach(function (group) {
            group.checked = selectAll;
            group.data.forEach(function (user) {
                user.checked = selectAll;
            });
        });
    };

    SalesAnalyticsFilterView.prototype.getFilteredUserIdsList = function () {
        var result = [], self = this;

        self.userFiltered.forEach(function (group) {
            group.data.forEach(function (user) {
                if (user.checked)
                    result.push(user.id);
            });
        });

        return result;
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

    SalesAnalyticsFilterView.prototype.showError = function (error) {
        console.error(error);
    };

    SalesAnalyticsFilterView.newInstance = function ($scope, $filter, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || SalesAnalyticsFilterModel.newInstance().getOrElse(throwInstantiateException(SalesAnalyticsFilterModel));
        var presenter = $presenter || SalesAnalyticsFilterPresenter.newInstance().getOrElse(throwInstantiateException(SalesAnalyticsFilterPresenter));

        var view = new SalesAnalyticsFilterView($scope, $filter, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return SalesAnalyticsFilterView;
});