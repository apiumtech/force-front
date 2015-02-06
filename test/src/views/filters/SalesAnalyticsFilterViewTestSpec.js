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
        var sut;

        beforeEach(function () {
            sut = new SalesAnalyticsFilterView();
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
            method: "setPreviousLastDays", test: setPreviousLastDaysTest
        }, {
            method: "applyDateFilter", test: applyDateFilterTest
        }, {
            method: "initializeFilters", test: initializeFiltersTest
        }, {
            method: "getFilteredUsersList", test: getFilteredUsersListTest
        }, {
            method: "cancelFilter", test: cancelFilterTest
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

        function setPreviousLastDaysTest() {
            var event = {
                stopPropagation: jasmine.createSpy()
            };
            var previousDays = 6;

            it("should call getPreviousDate()", function () {
                spyOn(sut.fn, 'getPreviousDate');
                spyOn(sut.fn, 'applyDateFilter');
                sut.fn.setPreviousLastDays(previousDays, event);
                expect(sut.fn.getPreviousDate).toHaveBeenCalledWith(previousDays, sut.dateRangeEnd);
            });

            it("should call applyDateFilter()", function () {
                spyOn(sut.fn, 'getPreviousDate');
                spyOn(sut.fn, 'applyDateFilter');
                sut.fn.setPreviousLastDays(previousDays, event);
                expect(sut.fn.applyDateFilter).toHaveBeenCalled();
            });
        }

        function getPreviousDateTest() {
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
            it("should call filterChannel.sendDateFilterApplySignal", function () {
                spyOn(sut.filterChannel, 'sendDateFilterApplySignal');
                sut.fn.applyDateFilter();
                expect(sut.filterChannel.sendDateFilterApplySignal).toHaveBeenCalledWith({
                    dateStart: sut.dateRangeStart,
                    dateEnd: sut.dateRangeEnd
                });
            });
        }

        function initializeFiltersTest() {
            it("should fire onFilterInitializing event", function () {
                sut.event.onFilterInitializing = jasmine.createSpy();
                sut.fn.initializeFilters();
                expect(sut.event.onFilterInitializing).toHaveBeenCalled();
            });
        }

        function getFilteredUsersListTest() {
            var fullList = [{
                group: "abc",
                data: []
            }, {
                group: "def",
                data: []
            }], filteredList = [{
                group: "abc",
                data: []
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
            it("should reset dates to null", function () {
                var expectDateEnd = new Date();
                sut.fn.cancelFilter();
                expect(sut.dateRangeEnd.getDate()).toEqual(expectDateEnd.getDate());
                expect(sut.dateRangeEnd.getMonth()).toEqual(expectDateEnd.getMonth());
                expect(sut.dateRangeEnd.getFullYear()).toEqual(expectDateEnd.getFullYear());
            });
        }
    });

    describe("onUsersLoadedSuccess()", function () {
        var sut;

        beforeEach(function () {
            sut = new SalesAnalyticsFilterView();
            sut.fn.getFilteredUsersList = jasmine.createSpy();
        });

        var data = [{
            group: "fake group", data: []
        }, {
            group: "fake group 2", data: []
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
        var sut;

        beforeEach(function () {
            sut = new SalesAnalyticsFilterView();
        });

        ["STRING", "String", "sTRing", "sTring", "string"].forEach(function (searchString) {
            it("should return correct filtered list", function () {
                var input = [{
                    group: "group1",
                    data: [{
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
                    data: [{
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
                    data: [{
                        name: "test STRING 1",
                        id: 1
                    }, {
                        name: "test string matched",
                        id: 3
                    }]
                }, {
                    group: "group2",
                    data: [{
                        name: "test sTring matched 2",
                        id: 8
                    }]
                }];

                var actual = sut._getFilteredUsers(input, searchString);
                expect(actual).toEqual(expected);
            });
        });
    });
});