/**
 * Created by justin on 2/3/15.
 */

app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');
    var SalesAnalyticsFilterChannel = container.getService("services/bus/SalesAnalyticsFilterChannel");
    var SalesAnalyticsFilterModel = container.getModel('models/filters/SalesAnalyticsFilterModel');
    var AwaitHelper = container.getService('services/AwaitHelper');
    var ArrayHelper = container.getService("services/ArrayHelper");

    var SalesAnalyticsFilterPresenter = container.getModel('presenters/filters/SalesAnalyticsFilterPresenter');
    var moment = container.getFunction('moment');
    var UserTreeListEventBus = container.getService('services/UserTreeListEventBus').getInstance();

    var _ = container.getFunction("underscore");

    function SalesAnalyticsFilterView($scope, $filter, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.arrayHelper = ArrayHelper;
        this.filter = $filter;
        this.filterChannel = SalesAnalyticsFilterChannel.newInstance("WidgetDecoratedPage");
        this.awaitHelper = AwaitHelper.newInstance();
        var self = this;
        self.resetDate = true;
        self.defaultPreviousDay = 30;
        self.$scope.datePickerFormat = "dd/MM/yyyy";
        self.momentFormat = 'DD/MM/YYYY';
        self.$scope.dateOptionRange = [7, 15, 30, 90];
        self.$scope.isoStringDateStart = function () {
            return self.$scope.dateRangeStart.toString();
        };
        self.$scope.isoStringDateEnd = function () {
            return self.$scope.dateRangeEnd.toString();
        };
        self.$scope.isoStringDateEndLimit = function () {
            var date = new Date(self.$scope.dateRangeStart);
            date = date.setDate(date.getDate() + 1);
            return new Date(date).toString();
        };
        self.$scope.isoStringMaxDateLimit = function () {
            return new Date().toString();
        };

        self.$scope.isoStringMaxDateFromLimit = function () {
            var date = new Date(self.$scope.dateRangeEnd);
            date = date.setDate(date.getDate() - 1);
            return new Date(date).toString();
        };

        this.data.isLoadingUsers = false;

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

        UserTreeListEventBus.onNodeSelected(self.onNodeSelected.bind(self));

        self.$scope.$watch('displayDateStart', function (value) {
            var _date = moment(value, self.momentFormat);
            if (!_date.isValid()) {
                console.error("Input date is not valid");
                return;
            }
            self.dateRangeStart = _date.toDate();
            self.validateDates();
        });

        self.$scope.$watch('displayDateEnd', function (value) {
            var _date = moment(value, self.momentFormat);
            if (!_date.isValid()) {
                console.error("Input date is not valid");
                return;
            }

            self.dateRangeEnd = _date.toDate();
            self.validateDates();
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

        self.fn.closeDatePickers = function (event) {
            event.stopPropagation();
            $(document).find('.force-datepicker-calendar').removeClass('force-datepicker-open');
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
            return moment(date).format(self.momentFormat);
        };

        self.fn.getFilteredUsersList = function () {
            var clonedUserList = _.clone(self.usersList);
            console.log("cloned user list: ", clonedUserList)
            self.event.onFilteringUsers(clonedUserList, self.currentUserFilterGroup, self.searchingUser);
        };

        self.fn.searchUsersByTeam = function (event) {
            event.stopPropagation();
            self.currentUserFilterGroup = SalesAnalyticsFilterModel.ENVIRONMENT;
            self.event.onFilterByGroup(self.currentUserFilterGroup);
        };

        self.fn.searchUsersByHierarchy = function (event) {
            event.stopPropagation();
            self.currentUserFilterGroup = SalesAnalyticsFilterModel.TEAM;
            self.event.onFilterByGroup(self.currentUserFilterGroup);
        };

        self.fn.initializeFilters = function () {
            self.currentUserFilterGroup = SalesAnalyticsFilterModel.ENVIRONMENT;
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
            group.children.forEach(function (user) {
                user.checked = group.checked;
            });

            self.checkSelectAllState();
            self.fn.applyUserFilter();
        };

        self.fn.applyUserFilter = function () {
            self.awaitHelper.await(self.fn.__applyUserFilter, 2000);
        };

        self.fn.__applyUserFilter = function () {
            var filteredIds = self.getFilteredUserIdsList();
            self.filterChannel.sendUserFilterApplySignal(filteredIds);
        };

        self.fn.selectTeam = function (item) {
            console.log("selecting team: ", item);
        };
    };

    SalesAnalyticsFilterView.prototype.validateDates = function () {
        var self = this;
        if (moment(self.dateRangeStart).isAfter(self.dateRangeEnd)) {
            self.dateRangeEnd = new Date(self.dateRangeStart.toString());
            self.displayDateEnd = self.fn.getFormattedDate(self.dateRangeEnd);
        }
    };

    SalesAnalyticsFilterView.prototype.onNodeSelected = function () {
        var self = this;
        self.fn.applyUserFilter();
    };

    SalesAnalyticsFilterView.prototype.setFilteredData = function (data) {
        if (!data || data.length <= 0) throw new Error('Filtered data is empty, no change will be made');
        var self = this;
        console.log(data);
        self.userFiltered = data;
    };

    SalesAnalyticsFilterView.prototype.checkSelectAllState = function () {
        var self = this;
        var allSelected = true;

        self.userFiltered.forEach(function (group) {
            var unselectedData = _.filter(group.children, function (user) {
                return user.checked === false;
            }).length;

            group.checked = (unselectedData == group.children.length) ? false : ( (unselectedData == 0) ? true : null );

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
            group.children.forEach(function (user) {
                user.checked = selectAll;
            });
        });
    };

    SalesAnalyticsFilterView.prototype.getFilteredUserIdsList = function () {
        var self = this;
        var result = [];

        var cloned = this.arrayHelper.clone(self.userFiltered);
        var flattened = this.arrayHelper.flatten(cloned, 'children');

        result = _.pluck(flattened.filter(function (node) {
            return node.checked === true;
        }), 'id');

        return result;
    };

    SalesAnalyticsFilterView.prototype._getFilteredUsers = function (inputList, queryString) {
        var result = [];

        inputList.forEach(function (dataRecord) {
            var group = _.find(result, function (item) {
                return item.group === dataRecord.group;
            });

            console.log(dataRecord);

            if (group === undefined) {
                group = {
                    id: dataRecord.id,
                    group: dataRecord.group,
                    children: []
                };
                result.push(group);
            }

            dataRecord.children.forEach(function (record) {
                if (record.name.toLowerCase().indexOf(queryString.toLowerCase()) != -1)
                    group.children.push(record);
            });
        });

        return result;
    };

    SalesAnalyticsFilterView.prototype.onUsersLoadedSuccess = function (data) {
        var self = this;
        self.usersList = data;
        self.fn.getFilteredUsersList();
        self.hideLoadingUsers();
    };

    SalesAnalyticsFilterView.prototype.showLoadingUsers = function () {
        this.data.isLoadingUsers = true;
    };

    SalesAnalyticsFilterView.prototype.hideLoadingUsers = function () {
        this.data.isLoadingUsers = false;
    };

    SalesAnalyticsFilterView.prototype.onUsersLoadedFail = function (error) {
        this.showError(error);
    };

    SalesAnalyticsFilterView.prototype.showError = function (error) {
        console.error(error);
    };

    SalesAnalyticsFilterView.newInstance = function ($scope, $filter, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || SalesAnalyticsFilterModel.newInstance();
        var presenter = $presenter || SalesAnalyticsFilterPresenter.newInstance();

        var view = new SalesAnalyticsFilterView($scope, $filter, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return SalesAnalyticsFilterView;
});