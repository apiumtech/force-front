/**
 * Created by Justin on 2/5/2015.
 */
describe("SalesAnalyticsFilterModel", function () {
    var SalesAnalyticsFilterModel = app.getModel("models/filters/SalesAnalyticsFilterModel"),
        Q = app.getFunction('q'),
        sut;

    var ajaxService = {
            rawAjaxRequest: function () {
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
        sut = SalesAnalyticsFilterModel.newInstance(ajaxService, storageService);
        spyOn(sut, 'defer').and.returnValue(deferredObject);
    });

    describe("_getUsers", function () {
        beforeEach(function () {
        });

        it("should call defer to get defer object", function () {
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakePromise());
            sut._getUsers();
            expect(sut.defer).toHaveBeenCalled();
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
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(fakePromise());
                spyOn(sut, 'decorateData').and.returnValue(fakeReturnData);
                spyOn(deferredObject, 'resolve');
                sut._getUsers();
                expect(sut.decorateData).toHaveBeenCalledWith(returnData);
            });

            it("should resolve the defer with data from server response", function () {
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(fakePromise());
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
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(fakePromise());
                spyOn(deferredObject, 'reject');
                sut._getUsers();
                expect(deferredObject.reject).toHaveBeenCalledWith(error);
            });
        });

        it("should return the promise deferred", function () {
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakePromise());
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

    describe("addQuery", function () {
        it("should add correct query", function () {
            sut.addQuery(1);
            var expected = 1;
            var actual = sut.currentQuery;
            expect(actual).toEqual(expected);
        });
    });

    describe('decorateData', function () {
        describe('data is empty', function () {
            it("should return data empty error", function () {
                var data = [];
                expect(function () {
                    sut.decorateData(data);
                }).toThrow(new Error("No data received from server"));
            });
        });

        it("should return correct output", function () {
            var input = [
                {
                    "id": 1,
                    "name": "A",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 2,
                    "name": "B",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 3,
                    "name": "C",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 4,
                    "name": "D",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 5,
                    "name": "Child of A",
                    "idParent": 1,
                    "isEnvironment": false
                },
                {
                    "id": 6,
                    "name": "Child of B 1",
                    "idParent": 2,
                    "isEnvironment": false
                },
                {
                    "id": 7,
                    "name": "Child of B 2",
                    "idParent": 2,
                    "isEnvironment": false
                },
                {
                    "id": 8,
                    "name": "Child of D 1",
                    "idParent": 4,
                    "isEnvironment": false
                },
                {
                    "id": 9,
                    "name": "Child of D 2",
                    "idParent": 4,
                    "isEnvironment": false
                },
                {
                    "id": 10,
                    "name": "Child of Child of D 2",
                    "idParent": 9,
                    "isEnvironment": false
                },
                {
                    "id": 11,
                    "name": "Child of Child of Child of D 2",
                    "idParent": 10,
                    "isEnvironment": false
                }];

            var expected = [
                {
                    "id": 1,
                    "name": 'A',
                    "idParent": -1,
                    "isEnvironment": true,
                    "children": [
                        {
                            "id": 5,
                            "name": "Child of A",
                            "idParent": 1,
                            "isEnvironment": false
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "B",
                    "idParent": -1,
                    "isEnvironment": true,
                    children: [
                        {
                            "id": 6,
                            "name": "Child of B 1",
                            "idParent": 2,
                            "isEnvironment": false
                        },
                        {
                            "id": 7,
                            "name": "Child of B 2",
                            "idParent": 2,
                            "isEnvironment": false
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "C",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 4,
                    "name": "D",
                    "idParent": -1,
                    "isEnvironment": true,
                    children: [
                        {
                            "id": 8,
                            "name": "Child of D 1",
                            "idParent": 4,
                            "isEnvironment": false
                        },
                        {
                            "id": 9,
                            "name": "Child of D 2",
                            "idParent": 4,
                            "isEnvironment": false,
                            children: [
                                {
                                    "id": 10,
                                    "name": "Child of Child of D 2",
                                    "idParent": 9,
                                    "isEnvironment": false,
                                    children: [
                                        {
                                            "id": 11,
                                            "name": "Child of Child of Child of D 2",
                                            "idParent": 10,
                                            "isEnvironment": false
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ];

            sut.currentQuery='Environment';
            var output = sut.decorateData(input);
            expect(output).toEqual(expected);
        });
    });

});