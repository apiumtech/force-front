define([
    'shared/BaseView',
    'modules/saleAnalytics/eventBus/SalesAnalyticsFilterChannel',
    'modules/saleAnalytics/filters/userFilter/UserFilterPresenter',
    'shared/services/AwaitHelper',
    'shared/services/ArrayHelper',
    'modules/saleAnalytics/eventBus/UserTreeListEventBus',
    'jquery',
    'moment',
    'underscore',
    'config',
    'shared/services/StorageService'
], function (BaseView, SalesAnalyticsFilterChannel, UserFilterPresenter, AwaitHelper, ArrayHelper, UserTreeListEventBus, $, moment, _, config, StorageService) {
    'use strict';

    var SELECTED_NONE = "SELECTED_NONE";
    var SELECTED_ONE_USER = "SELECTED_ONE_USER";
    var SELECTED_ONE_ENVIRONMENT = "SELECTED_ONE_ENVIRONMENT";
    var SELECTED_MANY = "SELECTED_MANY";

    function UserFilterView($scope, $presenter, eventBus) {

        $presenter = $presenter || new UserFilterPresenter();
        BaseView.call(this, $scope, null, $presenter);

        this.eventBus = eventBus || UserTreeListEventBus.getInstance();
        this.arrayHelper = ArrayHelper;
        this.filterChannel = SalesAnalyticsFilterChannel.newInstance("WidgetDecoratedPage");
        this.awaitHelper = AwaitHelper.newInstance();
        this.data.isLoadingUsers = false;
        this.data.usersLoadedFailError = null;
        this.APPLY_USER_FILTER_DELAY = 500;// ms.

        this.data.selectionType = SELECTED_NONE;
        this.data.userSelectionLabel = "";

        this.configureEvents();
    }

    UserFilterView.ENVIRONMENT = 'Environment';
    UserFilterView.TEAM = 'Hierarqhy';

    UserFilterView.inherits(BaseView, {
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
        },
        multipleSelection: {
            get: function () {
                return this.$scope.multipleSelection;
            },
            set: function (value) {
                this.$scope.multipleSelection = value;
            }
        },
        currentSelectedUser: {
            get: function () {
                return this.$scope.currentSelectedUser;
            },
            set: function (value) {
                this.$scope.currentSelectedUser = value;
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
            self.data.usersLoadedFailError = null;
            self.userFiltered = [];
            self.currentUserFilterGroup = UserFilterView.ENVIRONMENT;
            self.event.onFilterByGroup(self.currentUserFilterGroup);
        };

        self.fn.searchUsersByHierarchy = function (event) {
            event.stopPropagation();
            self.data.usersLoadedFailError = null;
            self.data.selectionType = SELECTED_NONE;
            self.currentUserFilterGroup = UserFilterView.TEAM;
            self.event.onFilterByGroup(self.currentUserFilterGroup);
        };

        self.fn.initializeFilters = function (multipleSelection) {
            self.multipleSelection = multipleSelection || false;
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
            self.awaitHelper.await(self.fn.__applyUserFilter, self.APPLY_USER_FILTER_DELAY);
        };

        self.fn.__applyUserFilter = function () {
            var flattenedUsers = self.getFilteredUsersList();

            var filteredUsers = flattenedUsers.filter(function (node) {
                return node.checked === true;
            });
            var filteredIds = _.pluck(filteredUsers, 'Id');

            self.filterChannel.sendUserFilterApplySignal(filteredIds);

            //self.eventBus.fireUsersFiltered(filteredUsers);
            // TODO: no need to use eventBus!!! it's all in the same file!!!
            self.fireUsersFiltered();
        };

        self.fn.toggled = function(open) {
            // make dropdown fill the height of the page
            var button = $("#UserFilterDropDownButton");
            var y = button.offset().top + button.height();
            var remainingHeight = $(window).height() - y - 15;
            remainingHeight += $(document).scrollTop().valueOf();
            $("#UserFilterDropDown").css("max-height", remainingHeight+"px");
        };
    };


    UserFilterView.prototype.fireUsersFiltered = function () {
        var self = this;

        var partiallySelected = self.userFiltered.filter(function (node) {
            return node.checked === null;
        });

        var fullySelected = self.userFiltered.filter(function (node) {
            return node.checked === true;
        });

        // none selected
        if( partiallySelected.length === 0 && fullySelected.length === 0 ) {
            self.onUsersFiltered([]);
            return;
        }

        var flattenedUsers = self.getFilteredUsersList();
        var filteredUsers = flattenedUsers.filter(function (node) {
            return node.checked === true;
        });

        // multiple selected
        if( partiallySelected.length > 1 || fullySelected.length > 1 || partiallySelected.length + fullySelected.length > 1) {
            self.onUsersFiltered(filteredUsers);
            return;
        }

        // single partial selection
        if( partiallySelected.length === 1 ) {
            self.onUsersFiltered(filteredUsers);
            return;
        }

        // single fully selection
        if( fullySelected.length === 1 ) {
            self.onUsersFiltered( [fullySelected[0]] );
            return;
        }
    };
    UserFilterView.prototype.onUsersFiltered = function (selectionList) {
        var self = this;
        var len = selectionList.length;

        if(len === 0)
        {
            self._userSelectionIsEmpty();
        }
        else if (len === 1)
        {
            var selection = selectionList[0];
            if(selection.ParentId === -1)
            {
                self._userSelectionIsOneEnvironment(selection);
            }
            else
            {
                self._userSelectionIsOneNormalUser(selection);
            }
        }
        else // len > 1
        {
            self._userSelectionIsMoreThanOne(selectionList.length);
        }
    };
    UserFilterView.prototype._userSelectionIsEmpty = function () {
        this.data.userSelectionLabel = "";
        this.data.userSelectionPicture = "";
        this.data.selectionType = SELECTED_NONE;
    };
    UserFilterView.prototype._userSelectionIsOneNormalUser = function (user) {
        this.data.userSelectionLabel = user.Name;
        this.data.userSelectionPicture = this.fn.buildUserPictureUrl(user);
        this.data.selectionType = SELECTED_ONE_USER;
    };
    UserFilterView.prototype._userSelectionIsOneEnvironment = function (env) {
        this.data.userSelectionLabel = env.Name;
        //this.data.userSelectionPicture = this.fn.buildUserPictureUrl(user);
        this.data.selectionType = SELECTED_ONE_ENVIRONMENT;
    };
    UserFilterView.prototype._userSelectionIsMoreThanOne = function (nSelectedUsers) {
        this.data.userSelectionLabel = nSelectedUsers + " selected";
        this.data.userSelectionPicture = "???";
        this.data.selectionType = SELECTED_MANY;
    };



    UserFilterView.prototype.onNodeSelected = function (selectedItem) {
        var self = this;
        if (this.multipleSelection){
            self.checkStateForTeamList(selectedItem);
        }else{
            self.singleSelect(selectedItem);
        }
        self.fn.applyUserFilter();
    };

    UserFilterView.prototype.setFilteredData = function (data) {
        if (!data || data.length <= 0){
            throw new Error('Filtered data is empty, no change will be made');
        }
        var self = this;
        self.userFiltered = data;
        self.userFiltered[0].isOpen = true;
    };

    UserFilterView.prototype.singleSelect = function (selectedNode) {
        if (!selectedNode) {
            return;
        }

        var node_state = selectedNode.checked;

        var self = this;
        this.currentSelectedUser = undefined;
        var arrayHelper = self.arrayHelper;
        var cloned = arrayHelper.clone(self.userFiltered);
        var flattened = arrayHelper.flatten(cloned, 'children');

        flattened.forEach(function (node) {
            if (node.Id === selectedNode.Id) {
                node.checked = node_state;
                self.currentSelectedUser = node.checked ? node.Name : undefined;
            } else{
                node.checked = false;
            }
        });

        self.userFiltered = arrayHelper.makeTree(flattened, 'ParentId', 'Id', 'children', -1);

    };

    UserFilterView.prototype.checkStateForTeamList = function (selectedNode, flattened, notRoot) {
        if (!selectedNode) {
            return;
        }
        var self = this;
        var arrayHelper = self.arrayHelper;
        if (!flattened) {
            var cloned = arrayHelper.clone(self.userFiltered);
            flattened = arrayHelper.flatten(cloned, 'children');
        }

        var nodeToCheck = _.find(flattened, function (n) {
            return n.Id === selectedNode.Id;
        });
        if (!nodeToCheck || nodeToCheck.ParentId === -1){
            return;
        }

        var siblings = _.filter(flattened, function (n) {
            return n.ParentId === nodeToCheck.ParentId;
        });
        if (!siblings || siblings.length === 0){
            return;
        }

        var unselectedData = _.filter(siblings, function (node) {
            return !node.checked;
        }).length;

        var parentNode = _.find(flattened, function (n) {
            return n.Id === nodeToCheck.ParentId;
        });

        parentNode.checked = (unselectedData === siblings.length) ? false : ( (unselectedData === 0) ? true : null );

        self.checkStateForTeamList(parentNode, flattened, true);

        if (!notRoot){
            self.userFiltered = arrayHelper.makeTree(flattened, 'ParentId', 'Id', 'children', -1);
        }
    };

    UserFilterView.prototype.checkSelectAllState = function () {
        var self = this;

        self.userFiltered.forEach(function (group) {
            var unselectedData = _.filter(group.children, function (user) {
                return !user.checked;
            }).length;

            group.checked = (unselectedData === group.children.length) ? false : ( (unselectedData === 0) ? true : null );
        });
    };

    UserFilterView.prototype.getFilteredUsersList = function () {
        var self = this;

        var cloned = this.arrayHelper.clone(self.userFiltered);
        var flattened = this.arrayHelper.flatten(cloned, 'children');

        return flattened;
    };

    UserFilterView.prototype.onUsersLoadedSuccess = function (data) {
        var self = this;
        self.usersList = data;
        self.fn.getFilteredUsersList();
        self.fn.applyUserFilter();
        self.hideLoadingUsers();
    };

    UserFilterView.prototype.showLoadingUsers = function () {
        this.data.isLoadingUsers = true;
    };

    UserFilterView.prototype.hideLoadingUsers = function () {
        this.data.isLoadingUsers = false;
    };

    UserFilterView.prototype.onUsersLoadedFail = function (error) {
        this.hideLoadingUsers();
        this.data.usersLoadedFailError = error;
    };

    UserFilterView.newInstance = function ($scope, $presenter, viewRepaintAspect, logErrorAspect) {
        var view = new UserFilterView($scope, $presenter);

        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return UserFilterView;
});