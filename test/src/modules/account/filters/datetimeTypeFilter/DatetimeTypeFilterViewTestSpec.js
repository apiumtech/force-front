/**
 * Created by Justin on 4/2/2015.
 */
define([
    'modules/account/filters/datetimeTypeFilter/DatetimeTypeFilterView'
], function (DatetimeTypeFilterView) {
    'use strict';
    describe("DatetimeTypeFilterView", function () {

        var sut, scope, element, model, presenter;

        describe("construct", function () {
            it("should call configureEvents", function () {
                spyOn(DatetimeTypeFilterView.prototype, 'configureEvents');
                new DatetimeTypeFilterView();
                expect(DatetimeTypeFilterView.prototype.configureEvents).toHaveBeenCalled();
            });
        });


        beforeEach(function () {
            scope = {
                $on: function () {
                },
                $watch: function () {
                },
                filterFor: {
                    data: {}
                },
                event: {},
                fn: {}
            };
            element = {};
            model = {};
            presenter = {};
            sut = DatetimeTypeFilterView.newInstance(scope, element, model, presenter, false, false);
        });


        describe("configureEvents", function () {

            [{
                method: "getPreviousDate", test: getPreviousDateTest
            }, {
                method: "loadPreviousLastDaysFilter", test: loadPreviousLastDaysFilterTest
            }, {
                method: "applyDateFilter", test: applyDateFilterTest
            }, {
                method: "cancelFilter", test: cancelFilterTest
            }, {
                method: "resetDate", test: resetDateTest
            }].forEach(function (test) {
                    var method = test.method;

                    describe("calling fn." + method, test.test);
                });

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
                beforeEach(function () {
                    sut.event.filterSelectionToggled = jasmine.createSpy();
                });
                it("should close popup", function () {
                    sut.data.dateRangeFilterOpened = true;
                    sut.fn.applyDateFilter();
                    expect(sut.data.dateRangeFilterOpened).toEqual(false);
                });

                xit("should fire event ", function () {
                    sut.fn.applyDateFilter();
                    expect(sut.event.filterSelectionToggled).toHaveBeenCalledWith(sut.$scope.filterFor.key, [{
                        from: sut.dateRangeStart,
                        to: sut.dateRangeEnd
                    }]);
                });
            }

            function cancelFilterTest() {
                it("should close popup", function () {
                    sut.data.dateRangeFilterOpened = true;
                    sut.fn.cancelFilter();
                    expect(sut.data.dateRangeFilterOpened).toEqual(false);
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
    });

});