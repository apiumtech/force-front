/**
 * Created by justin on 12/22/14.
 */
describe("widgetBase", function () {
    var WidgetBase = app.getService("services/WidgetBase");
    var sut,
        ajaxService;


    beforeEach(function () {
        ajaxService = {
            ajax: function () {
            }
        };

        sut = new WidgetBase(ajaxService);
    });

    describe("reloadWidget", function () {
        it("should throw exception if widgetId is not defined", function () {
            sut.fetchPoint = "/test/fetch/point";
            expect(function () {
                sut.reloadWidget();
            }).toThrowError();
        });

        it("should throw exception if fetchPoint is not defined", function () {
            sut.widgetId = 20020;
            expect(function () {
                sut.reloadWidget();
            }).toThrowError();
        });

        it("should call _reload method if widgetId is defined", function () {
            sut.widgetId = 100;
            sut.fetchPoint = "/test/fetch/point";
            spyOn(sut, "_reload");
            sut.reloadWidget();
            expect(sut._reload).toHaveBeenCalled();
        });
    });

    describe("buildQueryString", function () {
        it("should return empty string if queries is empty object", function () {
            sut.queries = {};
            var actual = sut.buildQueryString();
            var expected = "";
            expect(actual).toEqual(expected);
        });

        it("should return correct query string if queries has values", function () {
            sut.queries = {};
            var fakeAddQuery = function (key, value) {
                sut.queries[key] = value;
            };
            fakeAddQuery('filter', 1);
            fakeAddQuery('range', 'month');
            var expected = "filter=1&range=month";
            var actual = sut.buildQueryString();
            expect(actual).toEqual(expected);
        });
    });

    describe("addQuery", function () {
        it("should add correct query", function () {
            sut.addQuery('filter', 1);
            var expected = 1;
            var actual = sut.queries.filter;
            expect(actual).toEqual(expected);
        });
    });

    describe("addDateFilter", function () {
        it("should call 'addQuery' with correct argument", function () {
            spyOn(sut, 'addQuery');
            var start = new Date();
            var end = new Date();
            var fakeToIsoStart = 1;
            var fakeToIsoEnd = 2;
            spyOn(start, 'toISOString').and.returnValue(fakeToIsoStart);
            spyOn(end, 'toISOString').and.returnValue(fakeToIsoEnd);

            sut.addDateFilter(start, end);
            expect(start.toISOString).toHaveBeenCalled();
            expect(end.toISOString).toHaveBeenCalled();
            expect(sut.addQuery.calls.count()).toEqual(2);
            expect(sut.addQuery).toHaveBeenCalledWith("from-date", fakeToIsoStart);
            expect(sut.addQuery).toHaveBeenCalledWith("to-date", fakeToIsoEnd);
        });
    });

    describe("addUserFilter", function () {
        it("should call 'addQuery' with 'users' arguments", function () {
            spyOn(sut, 'addQuery');
            sut.addUserFilter([1, 2, 3, 4, 5]);
            expect(sut.addQuery).toHaveBeenCalledWith('users', [1, 2, 3, 4, 5]);
        });
    });

    describe("setFetchEndPoint", function () {
        it("should throw error if input is null", function () {
            expect(function () {
                sut.setFetchEndPoint();
            }).toThrow(new Error("Input data cannot be null"));
        });

        it("should assign fetchEndpoint", function () {
            sut.setFetchEndPoint("/data/1020");
            expect(sut.fetchPoint).toEqual("/data/1020");
        });
    });

    describe("_reload", function () {
        beforeEach(function () {
            spyOn(ajaxService, 'ajax').and.returnValue(exerciseFakePromise());
            spyOn(sut, 'buildQueryString');
        });

        [{
            msg: 'null', val: null
        }, {
            msg: 'empty', val: {}
        }].forEach(function (test) {
                it("should not call buildQueryString if queries is " + test.msg, function () {
                    sut.queries = test.val;
                    sut._reload();
                    expect(sut.buildQueryString).not.toHaveBeenCalled();
                });
            });

        it("should call buildQueryString if queries has value", function () {
            sut.queries = {
                filter: 1,
                range: 'month'
            };
            sut._reload();
            expect(sut.buildQueryString).toHaveBeenCalled();
        });

        describe("making ajax call", function () {
            beforeEach(function () {
                sut.buildQueryString = function () {
                    var queries = "";

                    $.each(sut.queries, function (k, v) {
                        if (queries) queries += "&";
                        queries += k + "=" + v;
                    });

                    return queries;
                };
            });

            [{
                sutQueries: {},
                fetchPoint: "data-endpoint/1003",
                widgetId: 1003,
                expected: "data-endpoint/1003"
            }, {
                sutQueries: {filter: 1, range: 'month'},
                fetchPoint: "/api/widgets/getwidget/1080",
                widgetId: 1080,
                expected: "/api/widgets/getwidget/1080?filter=1&range=month"
            }].forEach(function (test) {
                    it("should call ajax method with correct url", function () {
                        sut.fetchPoint = test.fetchPoint;
                        sut.widgetId = test.widgetId;
                        sut.queries = test.sutQueries;

                        sut._reload();

                        var expected = test.expected;
                        expect(ajaxService.ajax).toHaveBeenCalled();
                        expect(ajaxService.ajax.calls.mostRecent().args[0].url).toEqual(expected);
                    });
                });
        });
    });
});