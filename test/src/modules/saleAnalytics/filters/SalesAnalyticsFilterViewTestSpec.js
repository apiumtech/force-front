/**
 * Created by justin on 2/3/15.
 */
define([
    'modules/saleAnalytics/filters/SalesAnalyticsFilterView'
], function (SalesAnalyticsFilterView) {
    'use strict';
    describe("SalesAnalyticsFilterView", function () {

        var sut, $scope;

        beforeEach(function () {
            $scope = mockAngularScope();
            sut = new SalesAnalyticsFilterView($scope);
        });

        describe("__construct()", function () {

            it("should call configureEvents static method", function () {
                spyOn(SalesAnalyticsFilterView, 'configureEvents').and.callThrough();
                var _sut = new SalesAnalyticsFilterView($scope);
                expect(SalesAnalyticsFilterView.configureEvents).toHaveBeenCalledWith(_sut);
            });
        });

        describe("configureEvents", function () {
            var sut, $scope;

            beforeEach(function () {
                $scope = mockAngularScope();
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
                method: "cancelFilter", test: cancelFilterTest
            }, {
                method: "dateFilterToggled", test: dateFilterToggledTest
            }, {
                method: "resetDate", test: resetDateTest
            }].forEach(function (test) {
                    var method = test.method;

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
                    spyOn(sut.fn, 'resetDate');
                });

                it("should reset dates to default range", function () {
                    sut.fn.initializeFilters();
                    expect(sut.fn.resetDate).toHaveBeenCalled();
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
        });

        describe("validateDates", function () {

            describe("'from' date is prior to 'to' date", function () {
                it("should keep from and to dates remain", function () {
                    sut.dateRangeStart = new Date(2015, 3, 12);
                    sut.dateRangeEnd = new Date(2015, 4, 8);
                    sut.validateDates();
                    expect(sut.dateRangeStart.getFullYear()).toEqual(2015);
                    expect(sut.dateRangeStart.getMonth()).toEqual(3);
                    expect(sut.dateRangeStart.getDate()).toEqual(12);
                    expect(sut.dateRangeEnd.getFullYear()).toEqual(2015);
                    expect(sut.dateRangeEnd.getMonth()).toEqual(4);
                    expect(sut.dateRangeEnd.getDate()).toEqual(8);
                });
            });
            describe("'from' date is same as 'to' date", function () {
                it("should keep from and to dates remain", function () {
                    sut.dateRangeStart = new Date(2015, 3, 12);
                    sut.dateRangeEnd = new Date(2015, 3, 12);
                    sut.validateDates();
                    expect(sut.dateRangeStart.getFullYear()).toEqual(2015);
                    expect(sut.dateRangeStart.getMonth()).toEqual(3);
                    expect(sut.dateRangeStart.getDate()).toEqual(12);
                    expect(sut.dateRangeEnd.getFullYear()).toEqual(2015);
                    expect(sut.dateRangeEnd.getMonth()).toEqual(3);
                    expect(sut.dateRangeEnd.getDate()).toEqual(12);
                });
            });
            describe("'from' date is later than 'to' date", function () {

                beforeEach(function () {
                    sut.dateRangeStart = new Date(2015, 5, 12);
                    sut.dateRangeEnd = new Date(2015, 4, 8);
                    spyOn(sut.fn, 'getFormattedDate').and.returnValue('some-stupid-string');
                    sut.validateDates();
                });

                it("should adjust 'to' date to 'from' date", function () {
                    expect(sut.dateRangeStart.getFullYear()).toEqual(2015);
                    expect(sut.dateRangeStart.getMonth()).toEqual(5);
                    expect(sut.dateRangeStart.getDate()).toEqual(12);
                    expect(sut.dateRangeEnd.getFullYear()).toEqual(2015);
                    expect(sut.dateRangeEnd.getMonth()).toEqual(5);
                    expect(sut.dateRangeEnd.getDate()).toEqual(12);
                });

                it("should get formatted string with 'getFormatted'", function () {
                    expect(sut.fn.getFormattedDate).toHaveBeenCalledWith(sut.dateRangeEnd);
                });

                it("should assign formatted string to displayDateEnd", function () {
                    expect(sut.displayDateEnd).toEqual('some-stupid-string');
                });

            });
        });


    });

});