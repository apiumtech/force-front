define([
    'shared/BaseView',
    'modules/saleAnalytics/eventBus/SalesAnalyticsFilterChannel',
    'modules/saleAnalytics/filters/userFilter/UserFilterPresenter',
    'shared/services/AwaitHelper',
    'shared/services/ArrayHelper',
    'modules/saleAnalytics/eventBus/UserTreeListEventBus',
    'jquery',
    'moment',
    'underscore'
], function (BaseView, SalesAnalyticsFilterChannel, UserFilterPresenter, AwaitHelper, ArrayHelper, UserTreeListEventBus, $, moment, _) {
    'use strict';

    function UserFilterView($scope, $presenter, eventBus) {

        $presenter = $presenter || new UserFilterPresenter();
        BaseView.call(this, $scope, null, $presenter);

        this.eventBus = eventBus || UserTreeListEventBus.getInstance();
        this.arrayHelper = ArrayHelper;
        this.filterChannel = SalesAnalyticsFilterChannel.newInstance("WidgetDecoratedPage");
        this.awaitHelper = AwaitHelper.newInstance();
        this.data.isLoadingUsers = false;

        this.configureEvents();
    }

    UserFilterView.ENVIRONMENT = 'Environment';
    UserFilterView.TEAM = 'Hierarqhy';

    UserFilterView.prototype = Object.create(BaseView.prototype, {
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

    UserFilterView.prototype.configureEvents = function () {
        var self = this;

        self.eventBus.onNodeSelected(self.onNodeSelected.bind(self));

        self.fn.getFilteredUsersList = function () {
            var clonedUserList = _.clone(self.usersList);
            self.event.onFilteringUsers(clonedUserList, self.currentUserFilterGroup, self.searchingUser);
        };

        self.fn.searchUsersByTeam = function (event) {
            event.stopPropagation();
            self.currentUserFilterGroup = UserFilterView.ENVIRONMENT;
            self.event.onFilterByGroup(self.currentUserFilterGroup);
        };

        self.fn.searchUsersByHierarchy = function (event) {
            event.stopPropagation();
            self.currentUserFilterGroup = UserFilterView.TEAM;
            self.event.onFilterByGroup(self.currentUserFilterGroup);
        };

        self.fn.initializeFilters = function () {
            self.currentUserFilterGroup = UserFilterView.ENVIRONMENT;
            self.event.onFilterByGroup(self.currentUserFilterGroup);
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

    };

    UserFilterView.prototype.onNodeSelected = function (selectedItem) {
        var self = this;
        self.checkStateForTeamList(selectedItem);
        self.fn.applyUserFilter();
    };

    UserFilterView.prototype.setFilteredData = function (data) {
        if (!data || data.length <= 0) throw new Error('Filtered data is empty, no change will be made');
        var self = this;
        self.userFiltered = data;
        self.userFiltered[0].isOpen = true;
    };

    UserFilterView.prototype.checkStateForTeamList = function (selectedNode, flattened, notRoot) {
        if (!selectedNode) return;
        var self = this;
        var arrayHelper = self.arrayHelper;
        if (!flattened) {
            var cloned = arrayHelper.clone(self.userFiltered);
            flattened = arrayHelper.flatten(cloned, 'children');
        }

        var nodeToCheck = _.find(flattened, function (n) {
            return n.id === selectedNode.id
        });
        if (!nodeToCheck || nodeToCheck.idParent == -1) return;

        var siblings = _.filter(flattened, function (n) {
            return n.idParent == nodeToCheck.idParent
        });
        if (!siblings || siblings.length == 0) return;

        var unselectedData = _.filter(siblings, function (node) {
            return !node.checked;
        }).length;

        var parentNode = _.find(flattened, function (n) {
            return n.id == nodeToCheck.idParent;
        });

        parentNode.checked = (unselectedData == siblings.length) ? false : ( (unselectedData === 0) ? true : null );

        self.checkStateForTeamList(parentNode, flattened, true);

        if (!notRoot)
            self.userFiltered = arrayHelper.makeTree(flattened, 'idParent', 'id', 'children', -1);
    };

    UserFilterView.prototype.checkSelectAllState = function () {
        var self = this;

        self.userFiltered.forEach(function (group) {
            var unselectedData = _.filter(group.children, function (user) {
                return !user.checked;
            }).length;

            group.checked = (unselectedData == group.children.length) ? false : ( (unselectedData === 0) ? true : null );
        });
    };

    UserFilterView.prototype.getFilteredUserIdsList = function () {
        var self = this;
        var result = [];

        var cloned = this.arrayHelper.clone(self.userFiltered);
        var flattened = this.arrayHelper.flatten(cloned, 'children');

        result = _.pluck(flattened.filter(function (node) {
            return node.checked === true;
        }), 'id');

        return result;
    };

    UserFilterView.prototype._getFilteredUsers = function (inputList, queryString) {
        var result = [];

        inputList.forEach(function (dataRecord) {
            var group = _.find(result, function (item) {
                return item.group === dataRecord.group;
            });


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

    UserFilterView.prototype.onUsersLoadedSuccess = function (data) {
        var self = this;
        self.usersList = data;
        self.fn.getFilteredUsersList();
        self.hideLoadingUsers();
    };

    UserFilterView.prototype.showLoadingUsers = function () {
        this.data.isLoadingUsers = true;
    };

    UserFilterView.prototype.hideLoadingUsers = function () {
        this.data.isLoadingUsers = false;
    };

    UserFilterView.prototype.onUsersLoadedFail = function (error) {
        this.showError(error);
    };

    return UserFilterView;
});