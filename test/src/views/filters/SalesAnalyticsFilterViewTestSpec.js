/**
 * Created by justin on 2/3/15.
 */
describe("SalesAnalyticsFilterView", function () {
    var SalesAnalyticsFilterView = app.getView("views/filters/SalesAnalyticsFilterView");

    describe("__construct()", function () {
        beforeEach(function () {
            SalesAnalyticsFilterView.___configureEvents = SalesAnalyticsFilterView.configureEvents;
            SalesAnalyticsFilterView.configureEvents = jasmine.createSpy();
        });

        afterEach(function () {
            SalesAnalyticsFilterView.configureEvents = SalesAnalyticsFilterView.___configureEvents;
        });

        it("should call configureEvents static method", function () {
            var sut = new SalesAnalyticsFilterView();
            expect(SalesAnalyticsFilterView.configureEvents).toHaveBeenCalledWith(sut);
        });
    });

    describe("configureEvents", function () {
        var sut, $scope;

        beforeEach(function () {
            $scope = {
                $watch: function () {
                }
            };
            sut = new SalesAnalyticsFilterView($scope);
        });

        [{
            method: "openDatePickerStart", test: function () {
                openDatePickerTest("openDatePickerStart", "datePickerStartOpened");
            }
        }, {
            method: "openDatePickerEnd", test: function () {
                openDatePickerTest("openDatePickerEnd", "datePickerEndOpened");
            }
        }, {
            method: "getPreviousDate", test: getPreviousDateTest
        }, {
            method: "loadPreviousLastDaysFilter", test: loadPreviousLastDaysFilterTest
        }, {
            method: "applyDateFilter", test: applyDateFilterTest
        }, {
            method: "initializeFilters", test: initializeFiltersTest
        }, {
            method: "getFilteredUsersList", test: getFilteredUsersListTest
        }, {
            method: "cancelFilter", test: cancelFilterTest
        }, {
            method: "dateFilterToggled", test: dateFilterToggledTest
        }, {
            method: "resetDate", test: resetDateTest
        }, {
            method: "allUserSelectionChanged", test: allUserSelectionChangedTest
        }, {
            method: "userSelectionChanged", test: userSelectionChangedTest
        }, {
            method: "applyUserFilter", test: applyUserFilterTest
        }, {
            method: "groupSelectAllChanged", test: groupSelectAllChangedTest
        }].forEach(function (test) {
                var method = test.method;
                it("should declare method fn." + method, function () {
                    testDeclareMethod(sut.fn, method);
                });

                describe("calling fn." + method, test.test);
            });

        function openDatePickerTest(methodName, onField) {
            var event = {
                stopPropagation: jasmine.createSpy()
            };

            it("should call stopPropagation on event", function () {
                sut.fn[methodName](event);
                expect(event.stopPropagation).toHaveBeenCalled();
            });

            it("should change '" + onField + "' to true", function () {
                sut.fn[methodName](event);
                expect(sut[onField]).toBe(true);
            });
        }

        function loadPreviousLastDaysFilterTest() {
            var event = {
                stopPropagation: jasmine.createSpy()
            };
            var previousDays = 6;

            function performTest() {
                spyOn(sut.fn, 'getPreviousDate');
                spyOn(sut.fn, 'applyDateFilter');
                sut.fn.loadPreviousLastDaysFilter(previousDays, event);
            }

            it("should call getPreviousDate()", function () {
                performTest();
                expect(sut.fn.getPreviousDate).toHaveBeenCalledWith(previousDays, sut.dateRangeEnd);
            });

            it("should call applyDateFilter()", function () {
                performTest();
                expect(sut.fn.applyDateFilter).toHaveBeenCalled();
            });
        }

        function getPreviousDateTest() {

            it("should return null if from is not date", function () {
                var actual = sut.fn.getPreviousDate(3, []);
                expect(actual).toBeNull();
            });

            it("should return null if from is null", function () {
                var actual = sut.fn.getPreviousDate(3, null);
                expect(actual).toBeNull();
            });

            [{
                msg: "2 days before Feb 3 2015 should be Feb 1 2015",
                today: new Date(2015, 1, 3), daysAgo: 2, dayExpected: 1, monthExpected: 1, yearExpected: 2015
            }, {
                msg: "2 days before Feb 2 2015 should be Jan 31 2015",
                today: new Date(2015, 1, 2), daysAgo: 2, dayExpected: 31, monthExpected: 0, yearExpected: 2015
            }, {
                msg: "60 days before Feb 20 2015 should be Dec 22 2014",
                today: new Date(2015, 1, 20), daysAgo: 60, dayExpected: 22, monthExpected: 11, yearExpected: 2014
            }].forEach(function (test) {
                    describe(test.msg, function () {
                        it("should return correct date previous", function () {
                            var actual = sut.fn.getPreviousDate(test.daysAgo, test.today);
                            expect(actual.getDate()).toBe(test.dayExpected);
                        });
                        it("should return correct month", function () {
                            var actual = sut.fn.getPreviousDate(test.daysAgo, test.today);
                            expect(actual.getMonth()).toBe(test.monthExpected);
                        });
                        it("should return correct year", function () {
                            var actual = sut.fn.getPreviousDate(test.daysAgo, test.today);
                            expect(actual.getFullYear()).toBe(test.yearExpected);
                        });
                    });
                });
        }

        function applyDateFilterTest() {

            it("should not change the date", function () {
                spyOn(sut.filterChannel, 'sendDateFilterApplySignal');
                sut.fn.applyDateFilter();
                expect(sut.resetDate).toEqual(false);
            });

            it("should reset the display range place holder", function () {
                spyOn(sut.filterChannel, 'sendDateFilterApplySignal');
                spyOn(sut.fn, 'getDatePlaceholder');
                sut.fn.applyDateFilter();
                expect(sut.fn.getDatePlaceholder).toHaveBeenCalled();
            });

            it("should call filterChannel.sendDateFilterApplySignal", function () {
                spyOn(sut.filterChannel, 'sendDateFilterApplySignal');
                sut.fn.applyDateFilter();
                expect(sut.filterChannel.sendDateFilterApplySignal).toHaveBeenCalledWith({
                    dateStart: sut.dateRangeStart,
                    dateEnd: sut.dateRangeEnd
                });
            });

            it("should close popup", function () {
                sut.dateRangeFilterOpened = true;
                spyOn(sut.filterChannel, 'sendDateFilterApplySignal');
                sut.fn.applyDateFilter();
                expect(sut.dateRangeFilterOpened).toEqual(false);
            });
        }

        function initializeFiltersTest() {
            beforeEach(function () {
                sut.event.onFilterByGroup = jasmine.createSpy();
                spyOn(sut.fn, 'resetDate');
            });

            it("should reset dates to default range", function () {
                sut.fn.initializeFilters();
                expect(sut.fn.resetDate).toHaveBeenCalled();
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
            var fullList = [{
                group: "abc",
                children: []
            }, {
                group: "def",
                children: []
            }], filteredList = [{
                group: "abc",
                children: []
            }];
            describe("not filtering", function () {
                it("should return the full list", function () {
                    sut.usersList = fullList;
                    sut.searchingUser = "";
                    sut.fn.getFilteredUsersList();
                    expect(sut.userFiltered).toEqual(fullList);
                });
            });
            describe("is filtering", function () {
                it("should call filtered method", function () {
                    sut.usersList = fullList;
                    sut.searchingUser = "abc";
                    spyOn(sut, '_getFilteredUsers').and.returnValue(filteredList);
                    sut.fn.getFilteredUsersList();
                    expect(sut._getFilteredUsers).toHaveBeenCalledWith(fullList, "abc");
                    expect(sut.userFiltered).toEqual(filteredList);
                });
            });
        }

        function cancelFilterTest() {
            it("should flag resetDate to true", function () {
                sut.resetDate = false;
                sut.fn.cancelFilter();
                expect(sut.resetDate).toEqual(true);
            });
            it("should close popup", function () {
                sut.dateRangeFilterOpened = true;
                sut.fn.cancelFilter();
                expect(sut.dateRangeFilterOpened).toEqual(false);
            });
        }

        function dateFilterToggledTest() {
            beforeEach(function () {
                spyOn(sut.fn, 'resetDate');
            });
            it("should switch reset dates to true", function () {
                sut.resetDate = false;
                sut.fn.dateFilterToggled(false);
                expect(sut.resetDate).toEqual(true);
                expect(sut.fn.resetDate).not.toHaveBeenCalled();
            });

            it("should reset dates to default range when closed and reset dates is true", function () {
                sut.resetDate = true;
                sut.fn.dateFilterToggled(false);
                expect(sut.fn.resetDate).toHaveBeenCalled();
            });
        }

        function resetDateTest() {
            it("should reset end date to currentDate", function () {
                spyOn(sut.fn, 'getPreviousDate');
                sut.dateRangeEnd = new Date(2016, 1, 2);
                var expectDateEnd = new Date();
                sut.fn.resetDate();

                expect(sut.dateRangeEnd.getDate()).toEqual(expectDateEnd.getDate());
                expect(sut.dateRangeEnd.getMonth()).toEqual(expectDateEnd.getMonth());
                expect(sut.dateRangeEnd.getFullYear()).toEqual(expectDateEnd.getFullYear());
            });

            it("should reset startDate to previous days", function () {
                spyOn(sut.fn, 'getPreviousDate');
                sut.dateRangeEnd = new Date(2016, 1, 2);
                sut.fn.resetDate();
                expect(sut.fn.getPreviousDate).toHaveBeenCalledWith(sut.defaultPreviousDay, sut.dateRangeEnd);
            });

            it("should reset the display range place holder", function () {
                spyOn(sut.fn, 'getPreviousDate');
                spyOn(sut.fn, 'getDatePlaceholder');
                sut.fn.resetDate();
                expect(sut.fn.getDatePlaceholder).toHaveBeenCalled();
            });
        }

        function allUserSelectionChangedTest() {
            var event = {
                stopPropagation: jasmine.createSpy()
            };

            beforeEach(function () {
                spyOn(sut, 'toggleSelectAllUsers');
                spyOn(sut.fn, 'applyUserFilter');
            });

            it("should call stopPropagation on event", function () {
                sut.fn.allUserSelectionChanged(event);
                expect(event.stopPropagation).toHaveBeenCalled();
            });

            it("should call toggleSelectAllUsers to check/uncheck all boxes", function () {
                sut.fn.allUserSelectionChanged(event);
                expect(sut.toggleSelectAllUsers).toHaveBeenCalledWith(sut.allUsersSelected);
            });

            it("should fire applyUserFilter event", function () {
                sut.fn.allUserSelectionChanged(event);
                expect(sut.fn.applyUserFilter).toHaveBeenCalled();
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
            var filtered = [1, 4, 5];
            beforeEach(function () {
                spyOn(sut, 'getFilteredUserIdsList').and.returnValue(filtered);
                spyOn(sut.filterChannel, 'sendUserFilterApplySignal');
                sut.fn.applyUserFilter();
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
            $scope = {
                $watch: function () {
                }
            };
            sut = new SalesAnalyticsFilterView($scope);
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

    describe("_getFilteredUsers()", function () {
        var sut, $scope;

        beforeEach(function () {
            $scope = {
                $watch: function () {
                }
            };
            sut = new SalesAnalyticsFilterView($scope);
        });

        ["STRING", "String", "sTRing", "sTring", "string"].forEach(function (searchString) {
            it("should return correct filtered list", function () {
                var input = [{
                    group: "group1",
                    children: [{
                        name: "test STRING 1",
                        id: 1
                    }, {
                        name: "test not-matched",
                        id: 2
                    }, {
                        name: "test string matched",
                        id: 3
                    }, {
                        name: "test no matched 2",
                        id: 4
                    }]
                }, {
                    group: "group2",
                    children: [{
                        name: "test notmatch 1",
                        id: 5
                    }, {
                        name: "test not-matched",
                        id: 6
                    }, {
                        name: "test no matched",
                        id: 7
                    }, {
                        name: "test sTring matched 2",
                        id: 8
                    }]
                }];
                var expected = [{
                    group: "group1",
                    children: [{
                        name: "test STRING 1",
                        id: 1
                    }, {
                        name: "test string matched",
                        id: 3
                    }]
                }, {
                    group: "group2",
                    children: [{
                        name: "test sTring matched 2",
                        id: 8
                    }]
                }];

                var actual = sut._getFilteredUsers(input, searchString);
                expect(actual).toEqual(expected);
            });
        });
    });

    describe("checkSelectAllState", function () {
        var sut, $scope;

        beforeEach(function () {
            $scope = {
                $watch: function () {
                }
            };
            sut = new SalesAnalyticsFilterView($scope);
        });

        [{
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
            }]
        }, {
            input: [{
                group: "groupA",
                checked: true,
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
            }]
        }, {
            input: [{
                group: "groupA",
                checked: true,
                children: [{
                    name: "groupa-1",
                    checked: false
                }, {
                    name: "groupa-2",
                    checked: true
                }]
            }, {
                group: "groupB",
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
            }]
        }].forEach(function (test) {
                beforeEach(function() {
                    sut.userFiltered = test.input;
                    sut.checkSelectAllState();
                });

                it("should be false if any user is unselected", function () {
                    expect(sut.allUsersSelected).toEqual(false);
                });

                it("should decorate filtered users to correct states", function () {
                    expect(sut.userFiltered).toEqual(test.output);
                });
            });

        it("should be true if all users is selected", function () {
            sut.userFiltered = [{
                group: "groupA",
                checked: true,
                children: [{
                    name: "groupa-1",
                    checked: true
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
            }];
            sut.checkSelectAllState();
            expect(sut.allUsersSelected).toEqual(true);
        });
    });

    describe("toggleSelectAllUsers", function () {
        var sut, $scope;

        beforeEach(function () {
            $scope = {
                $watch: function () {
                }
            };
            sut = new SalesAnalyticsFilterView($scope);

            sut.userFiltered = [{
                group: "groupA",
                children: [{
                    name: "groupa-1",
                    checked: false
                }, {
                    name: "groupa-2",
                    checked: true
                }]
            }, {
                group: "groupB",
                children: [{
                    name: "groupb-1",
                    checked: false
                }, {
                    name: "groupb-2",
                    checked: false
                }, {
                    name: "groupb-3",
                    checked: true
                }]
            }];
        });

        it("should select all data", function () {
            sut.toggleSelectAllUsers(true);
            expect(sut.userFiltered).toEqual([{
                group: "groupA",
                checked: true,
                children: [{
                    name: "groupa-1",
                    checked: true
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
            }]);
        });

        it("should select none", function () {
            sut.toggleSelectAllUsers(false);
            expect(sut.userFiltered).toEqual([{
                group: "groupA",
                checked: false,
                children: [{
                    name: "groupa-1",
                    checked: false
                }, {
                    name: "groupa-2",
                    checked: false
                }]
            }, {
                group: "groupB",
                checked: false,
                children: [{
                    name: "groupb-1",
                    checked: false
                }, {
                    name: "groupb-2",
                    checked: false
                }, {
                    name: "groupb-3",
                    checked: false
                }]
            }]);
        });
    });

    describe("getFilteredUserIdsList", function () {
        var sut, $scope;

        beforeEach(function () {
            $scope = {
                $watch: function () {
                }
            };
            sut = new SalesAnalyticsFilterView($scope);

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
});