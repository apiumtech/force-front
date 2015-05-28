define([
    'modules/saleAnalytics/filters/userFilter/UserFilterView',
    'modules/saleAnalytics/filters/userFilter/UserFilterPresenter',
    'modules/saleAnalytics/eventBus/UserTreeListEventBus'
], function (UserFilterView, UserFilterPresenter, UserTreeListEventBus) {
    'use strict';

    describe('UserFilterView', function () {
        var sut, $scope,
            presenter = mock(UserFilterPresenter),
            eventBus = mock(UserTreeListEventBus);

        describe('construct', function () {
            beforeEach(function () {
                sinon.stub(UserFilterView.prototype, 'configureEvents');
            });
            afterEach(function () {
                UserFilterView.prototype.configureEvents.restore();
            });

            it("should call configureEvents", function () {
                new UserFilterView({}, {});
                expect(UserFilterView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        beforeEach(function () {
            $scope = mockAngularScope();
            sut = new UserFilterView($scope, presenter, eventBus);
        });

        describe("configureEvents", function () {
            var sut, $scope;

            beforeEach(function () {
                $scope = mockAngularScope();
                sut = new UserFilterView($scope);
            });

            [
                {
                    method: "initializeFilters", test: initializeFiltersTest
                },
                {
                    method: "getFilteredUsersList", test: getFilteredUsersListTest
                },
                {
                    method: "userSelectionChanged", test: userSelectionChangedTest
                },
                {
                    method: "__applyUserFilter", test: __applyUserFilterTest
                },
                {
                    method: "applyUserFilter", test: applyUserFilterTest
                },
                {
                    method: "groupSelectAllChanged", test: groupSelectAllChangedTest
                }
            ].forEach(function (test) {
                    var method = test.method;
                    describe("calling fn." + method, test.test);
                });


            // Test functions
            function initializeFiltersTest() {
                beforeEach(function () {
                    sut.event.onFilterByGroup = jasmine.createSpy();
                });

                it("should set the current filter group to 'Environment'", function () {
                    sut.$scope.currentUserFilterGroup = null;
                    sut.fn.initializeFilters();
                    expect(sut.$scope.currentUserFilterGroup).toEqual('Environment');
                });

                it("should fire onFilterByGroup event", function () {
                    sut.fn.initializeFilters();
                    expect(sut.event.onFilterByGroup).toHaveBeenCalled();
                });
            }

            function getFilteredUsersListTest() {
                it("should fire event 'onFilteringUsers'", function () {
                    sut.event.onFilteringUsers = jasmine.createSpy();
                    sut.fn.getFilteredUsersList();
                    expect(sut.event.onFilteringUsers).toHaveBeenCalledWith(sut.usersList, sut.currentUserFilterGroup, sut.searchingUser);
                });
            }

            function userSelectionChangedTest() {
                beforeEach(function () {
                    spyOn(sut.fn, 'applyUserFilter');
                    spyOn(sut, 'checkSelectAllState');
                });

                it("should call 'checkSelectAllState'", function () {
                    sut.fn.userSelectionChanged();
                    expect(sut.checkSelectAllState).toHaveBeenCalled();
                });

                it("should fire applyUserFilter event", function () {
                    sut.fn.userSelectionChanged();
                    expect(sut.fn.applyUserFilter).toHaveBeenCalled();
                });
            }

            function groupSelectAllChangedTest() {
                var group;
                beforeEach(function () {
                    group = {
                        checked: false,
                        group: 'group1',
                        children: [{
                            name: "group1",
                            checked: false
                        }, {
                            name: "group2",
                            checked: true
                        }, {
                            name: "group3",
                            checked: false
                        }]
                    };
                    spyOn(sut.fn, 'applyUserFilter');
                    spyOn(sut, 'checkSelectAllState');
                });

                it("should change state of all users in group to its state", function () {
                    group.checked = true;
                    sut.fn.groupSelectAllChanged(group);
                    expect(group.children).toEqual([{
                        name: "group1",
                        checked: true
                    }, {
                        name: "group2",
                        checked: true
                    }, {
                        name: "group3",
                        checked: true
                    }]);
                });

                it("should call 'checkSelectAllState'", function () {
                    group.checked = false;
                    sut.fn.groupSelectAllChanged(group);
                    expect(sut.checkSelectAllState).toHaveBeenCalled();
                });

                it("should change state of all users in group to its state", function () {
                    group.checked = false;
                    sut.fn.groupSelectAllChanged(group);
                    expect(group.children).toEqual([{
                        name: "group1",
                        checked: false
                    }, {
                        name: "group2",
                        checked: false
                    }, {
                        name: "group3",
                        checked: false
                    }]);
                });

                it("should fire applyUserFilter event", function () {
                    sut.fn.groupSelectAllChanged(group);
                    expect(sut.fn.applyUserFilter).toHaveBeenCalled();
                });
            }

            function applyUserFilterTest() {
                it("should delay the call to __applyUserFilterTest for 2 seconds", function () {
                    spyOn(sut.awaitHelper, 'await');
                    sut.fn.applyUserFilter();
                    expect(sut.awaitHelper.await).toHaveBeenCalledWith(sut.fn.__applyUserFilter, 2000);
                })
            }

            function __applyUserFilterTest() {
                var filtered = [1, 4, 5];
                beforeEach(function () {
                    spyOn(sut, 'getFilteredUserIdsList').and.returnValue(filtered);
                    spyOn(sut.filterChannel, 'sendUserFilterApplySignal');
                    sut.fn.__applyUserFilter();
                });

                it("should call getFilteredUserIdsList to have filtered list", function () {
                    expect(sut.getFilteredUserIdsList).toHaveBeenCalled();
                });

                it("should broadcast event bus with filtered list", function () {
                    expect(sut.filterChannel.sendUserFilterApplySignal).toHaveBeenCalled();
                });
            }

        });

        describe("onUsersLoadedSuccess()", function () {
            var sut, $scope;

            beforeEach(function () {
                $scope = mockAngularScope();
                sut = new UserFilterView($scope);
                sut.fn.getFilteredUsersList = jasmine.createSpy();
            });

            var data = [{
                group: "fake group", children: []
            }, {
                group: "fake group 2", children: []
            }];

            it("should assign data", function () {
                sut.onUsersLoadedSuccess(data);
                expect(sut.usersList).toEqual(data);
            });

            it("should call filter user", function () {
                sut.onUsersLoadedSuccess(data);
                expect(sut.fn.getFilteredUsersList).toHaveBeenCalled();
            });
        });

        describe("checkSelectAllState", function () {

            describe("Some users are deselected", function () {
                [
                    {
                        input: [{
                            group: "groupA",
                            checked: false,
                            children: [{
                                name: "groupa-1",
                                checked: false
                            }, {
                                name: "groupa-2",
                                checked: true
                            }]
                        }, {
                            group: "groupB",
                            checked: true,
                            children: [{
                                name: "groupb-1",
                                checked: true
                            }, {
                                name: "groupb-2",
                                checked: true
                            }, {
                                name: "groupb-3",
                                checked: true
                            }]
                        }],
                        output: [{
                            group: "groupA",
                            checked: null,
                            children: [{
                                name: "groupa-1",
                                checked: false
                            }, {
                                name: "groupa-2",
                                checked: true
                            }]
                        }, {
                            group: "groupB",
                            checked: true,
                            children: [{
                                name: "groupb-1",
                                checked: true
                            }, {
                                name: "groupb-2",
                                checked: true
                            }, {
                                name: "groupb-3",
                                checked: true
                            }]
                        }]
                    },
                    {
                        input: [{
                            group: "groupC",
                            checked: null,
                            children: [{
                                name: "groupa-1",
                                checked: false
                            }, {
                                name: "groupa-2",
                                checked: false
                            }]
                        }, {
                            group: "groupD",
                            checked: false,
                            children: [{
                                name: "groupb-1",
                                checked: true
                            }, {
                                name: "groupb-2",
                                checked: true
                            }, {
                                name: "groupb-3",
                                checked: true
                            }]
                        }],

                        output: [{
                            group: "groupC",
                            checked: false,
                            children: [{
                                name: "groupa-1",
                                checked: false
                            }, {
                                name: "groupa-2",
                                checked: false
                            }]
                        }, {
                            group: "groupD",
                            checked: true,
                            children: [{
                                name: "groupb-1",
                                checked: true
                            }, {
                                name: "groupb-2",
                                checked: true
                            }, {
                                name: "groupb-3",
                                checked: true
                            }]
                        }]
                    },
                    {
                        input: [{
                            group: "groupE",
                            checked: true,
                            children: [{
                                name: "groupa-1",
                                checked: false
                            }, {
                                name: "groupa-2",
                                checked: true
                            }]
                        }, {
                            group: "groupF",
                            checked: false,
                            children: [{
                                name: "groupb-1",
                                checked: true
                            }, {
                                name: "groupb-2",
                                checked: true
                            }, {
                                name: "groupb-3",
                                checked: true
                            }]
                        }],

                        output: [{
                            group: "groupE",
                            checked: null,
                            children: [{
                                name: "groupa-1",
                                checked: false
                            }, {
                                name: "groupa-2",
                                checked: true
                            }]
                        }, {
                            group: "groupF",
                            checked: true,
                            children: [{
                                name: "groupb-1",
                                checked: true
                            }, {
                                name: "groupb-2",
                                checked: true
                            }, {
                                name: "groupb-3",
                                checked: true
                            }]
                        }]
                    }
                ].forEach(function (test) {
                        var _sut, $scope;
                        beforeEach(function () {
                            $scope = mockAngularScope();
                            _sut = new UserFilterView($scope);
                            _sut.userFiltered = test.input;
                            _sut.checkSelectAllState();
                        });

                        it("should decorate filtered users to correct states", function () {
                            expect(_sut.userFiltered).toEqual(test.output);
                        });
                    });
            });
        });

        describe("getFilteredUserIdsList", function () {
            beforeEach(function () {

                sut.userFiltered = [{
                    group: "groupA",
                    children: [{
                        id: 1,
                        name: "groupa-1",
                        checked: false
                    }, {
                        id: 2,
                        name: "groupa-2",
                        checked: true
                    }]
                }, {
                    group: "groupB",
                    children: [{
                        id: 3,
                        name: "groupb-1",
                        checked: false
                    }, {
                        id: 4,
                        name: "groupb-2",
                        checked: false
                    }, {
                        id: 5,
                        name: "groupb-3",
                        checked: true
                    }]
                }];
            });

            it("should return correct ids list", function () {
                var expected = [2, 5];
                var actual = sut.getFilteredUserIdsList();
                expect(actual).toEqual(expected);
            });
        });

        describe('setUserFilteredData', function () {
            describe('data is empty', function () {
                beforeEach(function () {
                    sut.userFiltered = [{
                        "data": "data"
                    }];
                });
                it("should return a 'data empty' error and the value of 'userFiltered' should remain the same", function () {
                    [undefined, null, []].forEach(function (filteredData) {
                        var filter = sut.userFiltered;
                        expect(function () {
                            sut.setFilteredData(filteredData);
                        }).toThrow(new Error('Filtered data is empty, no change will be made'));
                        expect(sut.userFiltered).toEqual(filter);
                    });
                });
            });
            describe('filtered data is returned', function () {
                it("should assign the filtered data to 'userFiltered'", function () {
                    sut.userFiltered = [{
                        "data": "data"
                    }];
                    var filteredData = [{
                        "data": "filtered data"
                    }];
                    sut.setFilteredData(filteredData);
                    expect(sut.userFiltered).toEqual(filteredData);
                });
            });
        });

        describe('checkStateForTeamList', function () {
            [
                {
                    input: [
                        {
                            id: 1,
                            checked: false,
                            idParent: -1,
                            children: [{
                                id: 2,
                                idParent: 1,
                                checked: true
                            }, {
                                id: 3,
                                idParent: 1,
                                checked: false,
                                children: [
                                    {
                                        id: 5,
                                        idParent: 3,
                                        checked: true
                                    },
                                    {
                                        id: 6,
                                        idParent: 3,
                                        checked: true
                                    }
                                ]
                            }]
                        }
                    ],

                    expectedOutput: [
                        {
                            id: 1,
                            checked: true,
                            idParent: -1,
                            children: [{
                                id: 2,
                                idParent: 1,
                                checked: true
                            }, {
                                id: 3,
                                idParent: 1,
                                checked: true,
                                children: [
                                    {
                                        id: 5,
                                        idParent: 3,
                                        checked: true
                                    },
                                    {
                                        id: 6,
                                        idParent: 3,
                                        checked: true
                                    }
                                ]
                            }]
                        }
                    ],
                    testNode: {
                        id: 5,
                        idParent: 3,
                        checked: true
                    }
                },
                {
                    input: [
                        {
                            id: 1,
                            idParent: -1,
                            checked: false,
                            children: [{
                                id: 2,
                                idParent: 1,
                                checked: true
                            }, {
                                id: 3,
                                idParent: 1,
                                checked: false,
                                children: [
                                    {
                                        id: 5,
                                        idParent: 3,
                                        checked: true
                                    },
                                    {
                                        id: 6,
                                        idParent: 3,
                                        checked: true
                                    }
                                ]
                            }]
                        },
                        {
                            id: 4,
                            checked: true,
                            idParent: -1,
                            children: [{
                                id: 7,
                                idParent: 4,
                                checked: true
                            }, {
                                id: 8,
                                idParent: 4,
                                checked: false,
                                children: [
                                    {
                                        id: 9,
                                        idParent: 8,
                                        checked: true
                                    },
                                    {
                                        id: 10,
                                        idParent: 8,
                                        checked: false
                                    }
                                ]
                            }]
                        }
                    ],

                    expectedOutput: [
                        {
                            id: 1,
                            checked: true,
                            idParent: -1,
                            children: [{
                                id: 2,
                                idParent: 1,
                                checked: true
                            }, {
                                id: 3,
                                idParent: 1,
                                checked: true,
                                children: [
                                    {
                                        id: 5,
                                        idParent: 3,
                                        checked: true
                                    },
                                    {
                                        id: 6,
                                        idParent: 3,
                                        checked: true
                                    }
                                ]
                            }]
                        },
                        {
                            id: 4,
                            checked: null,
                            idParent: -1,
                            children: [{
                                id: 7,
                                idParent: 4,
                                checked: true
                            }, {
                                id: 8,
                                idParent: 4,
                                checked: null,
                                children: [
                                    {
                                        id: 9,
                                        idParent: 8,
                                        checked: true
                                    },
                                    {
                                        id: 10,
                                        idParent: 8,
                                        checked: false
                                    }
                                ]
                            }]
                        }
                    ],
                    testNode: [{
                        id: 9,
                        idParent: 8,
                        checked: true
                    }, {
                        id: 5,
                        idParent: 3,
                        checked: true
                    }]
                }
            ].forEach(function (test) {
                    describe('Having input value', function () {
                        it("should turn into correct output", function () {
                            sut.userFiltered = test.input;
                            sut.usersList = test.input;

                            if (test.testNode.map) {
                                test.testNode.forEach(function (t) {
                                    sut.checkStateForTeamList(t);
                                });
                            } else {
                                sut.checkStateForTeamList(test.testNode);
                            }
                            expect(sut.userFiltered).toEqual(test.expectedOutput);
                        });
                    });
                });
        });

    });
});