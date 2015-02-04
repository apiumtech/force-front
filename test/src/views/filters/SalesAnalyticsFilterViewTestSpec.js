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
        }].forEach(function (test) {
                var method = test.method;
                it("should declare method fn." + method, function () {
                    expect(sut.fn[method]).not.toBeNull();
                    expect(isFunction(sut.fn[method])).toEqual(true);
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

            it("should call stopPropagation on event", function () {
                spyOn(sut.fn, 'getPreviousDate');
                sut.fn.setPreviousLastDays(previousDays, event);
                expect(event.stopPropagation).toHaveBeenCalled();
            });

            it("should call getPreviousDate()", function () {
                spyOn(sut.fn, 'getPreviousDate');
                sut.fn.setPreviousLastDays(previousDays, event);
                expect(sut.fn.getPreviousDate).toHaveBeenCalledWith(previousDays, sut.dateRangeEnd);
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
    });
});