/**
 * Created by Justin on 2/5/2015.
 */
describe("SalesAnalyticsFilterModel", function () {
    var SalesAnalyticsFilterModel = app.getModel("models/filters/SalesAnalyticsFilterModel"),
        Q = app.getFunction('q'),
        sut;

    var ajaxService = {
            ajax: function () {
            }
        },

        storageService = {
            store: function () {
            },
            retrieve: function () {
            },
            remove: function () {
            }
        };

    var deferredObject = {
        promise: function () {
        },
        reject: function () {
        },
        resolve: function () {
        }
    };

    beforeEach(function () {
        sut = SalesAnalyticsFilterModel.newInstance(ajaxService, storageService).getOrElse(throwInstantiateException(SalesAnalyticsFilterModel));
        spyOn(sut, 'defer').and.returnValue(deferredObject);
    });

    describe("_getUsers", function () {
        beforeEach(function () {
        });

        it("should call buildQueryString", function () {
            spyOn(sut, 'buildQueryString');
            spyOn(ajaxService, 'ajax').and.returnValue(exerciseFakePromise());
            sut._getUsers();
            expect(sut.buildQueryString).toHaveBeenCalled();
        });

        it("should call defer to get defer object", function () {
            spyOn(ajaxService, 'ajax').and.returnValue(exerciseFakePromise());
            sut._getUsers();
            expect(sut.defer).toHaveBeenCalled();
        });

        [{
            fakeQuery: "", expectedUrl: "/api/users"
        }, {
            fakeQuery: "abc=123&xyz=456", expectedUrl: "/api/users?abc=123&xyz=456"
        }].forEach(function (test) {
                it("should call ajax with correct params", function () {
                    spyOn(sut, 'buildQueryString').and.returnValue(test.fakeQuery);

                    var params = {
                        url: test.expectedUrl,
                        type: 'get',
                        contentType: 'application/json',
                        accept: 'application/json'
                    };
                    spyOn(ajaxService, 'ajax').and.returnValue(exerciseFakePromise());
                    sut._getUsers();
                    expect(ajaxService.ajax).toHaveBeenCalledWith(params);
                });
            });

        describe("service return success", function () {
            var returnData = {
                data: []
            };

            function fakePromise() {
                return {
                    then: function (a, b) {
                        a(returnData);
                        return fakePromise();
                    }
                };
            }

            var fakeReturnData = [
                {
                    emptyObject: true
                }
            ];

            it("should call decorateData to format data", function () {
                spyOn(ajaxService, 'ajax').and.returnValue(fakePromise());
                spyOn(sut, 'decorateData').and.returnValue(fakeReturnData);
                spyOn(deferredObject, 'resolve');
                sut._getUsers();
                expect(sut.decorateData).toHaveBeenCalledWith(returnData);
            });

            it("should resolve the defer with data from server response", function () {
                spyOn(ajaxService, 'ajax').and.returnValue(fakePromise());
                spyOn(sut, 'decorateData').and.returnValue(fakeReturnData);
                spyOn(deferredObject, 'resolve');
                sut._getUsers();
                expect(deferredObject.resolve).toHaveBeenCalledWith(fakeReturnData);
            });
        });

        describe("service return error", function () {
            var error = new Error("test error");

            function fakePromise() {
                return {
                    then: function (a, b) {
                        b(error);
                        return fakePromise();
                    }
                };
            }

            it("should reject the defer with error", function () {
                spyOn(ajaxService, 'ajax').and.returnValue(fakePromise());
                spyOn(deferredObject, 'reject');
                sut._getUsers();
                expect(deferredObject.reject).toHaveBeenCalledWith(error);
            });
        });

        it("should return the promise deferred", function () {
            spyOn(ajaxService, 'ajax').and.returnValue(exerciseFakePromise());
            var promise = sut._getUsers();
            expect(promise).toEqual(deferredObject.promise);
        });
    });

    describe("getUsers", function () {
        beforeEach(function () {
            Q._____fcall = Q.fcall;
        });

        afterEach(function () {
            Q.fcall = Q._____fcall;
        });

        it("should call fcall from Q lib", function () {
            Q.fcall = jasmine.createSpy();
            sut.getUsers();
            expect(Q.fcall).toHaveBeenCalled();
        });

        it("should call _getUsers method", function () {
            spyOn(sut, "_getUsers");
            Q.fcall = function (method) {
                return method;
            };

            sut.getUsers()();

            expect(sut._getUsers).toHaveBeenCalled();
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

});