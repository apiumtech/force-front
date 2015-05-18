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


    //region decoratingDataUsingEnvironmentMethod test
    describe("decoratingDataUsingEnvironmentMethod()", function () {
        it("should return correct grouped values", function () {
            var serverResponse = [
                {
                    "id": "Group-1",
                    "idParent": "-1",
                    "name": "Group1-Name"
                },
                {
                    "id": "Group-1-child-1",
                    "idParent": "Group-1",
                    "name": "Group1-child-1-Name"
                },
                {
                    "id": "Group-1-child-2",
                    "idParent": "Group-1",
                    "name": "Group1-child-2-Name"
                },
                {
                    "id": "Group-2",
                    "idParent": "-1",
                    "name": "Group2-Name"
                },
                {
                    "id": "Group-2-child-1",
                    "idParent": "Group-2",
                    "name": "Group2-child-1-Name"
                },
                {
                    "id": "Group-2-child-2",
                    "idParent": "Group-2",
                    "name": "Group2-child-2-Name"
                }
            ];

            var expected = [{
                id: "Group-1",
                group: "Group1-Name",
                children: [
                    {
                        "id": "Group-1-child-1",
                        "idParent": "Group-1",
                        "name": "Group1-child-1-Name",
                        "checked": false
                    },
                    {
                        "id": "Group-1-child-2",
                        "idParent": "Group-1",
                        "name": "Group1-child-2-Name",
                        "checked": false
                    }
                ]
            }, {
                id: "Group-2",
                group: "Group2-Name",
                children: [
                    {
                        "id": "Group-2-child-1",
                        "idParent": "Group-2",
                        "name": "Group2-child-1-Name",
                        "checked": false
                    },
                    {
                        "id": "Group-2-child-2",
                        "idParent": "Group-2",
                        "name": "Group2-child-2-Name",
                        "checked": false
                    }
                ]
            }];

            var actual = sut.decoratingDataUsingEnvironmentMethod(serverResponse);
            expect(actual).toEqual(expected);
        });
    });
    //endregion decoratingDataUsingEnvironmentMethod test

    //region decoratingDataUsingHierarqhyMethod test
    describe("decoratingDataUsingHierarqhyMethod()", function () {

        it("should return correct output", function () {
            var input = [
                {
                    "id": 1,
                    "name": "A",
                    "idParent": -1
                },
                {
                    "id": 2,
                    "name": "B",
                    "idParent": -1
                },
                {
                    "id": 3,
                    "name": "C",
                    "idParent": -1
                },
                {
                    "id": 4,
                    "name": "D",
                    "idParent": -1
                },
                {
                    "id": 5,
                    "name": "Child of A",
                    "idParent": 1
                },
                {
                    "id": 6,
                    "name": "Child of B 1",
                    "idParent": 2
                },
                {
                    "id": 7,
                    "name": "Child of B 2",
                    "idParent": 2
                },
                {
                    "id": 8,
                    "name": "Child of D 1",
                    "idParent": 4
                },
                {
                    "id": 9,
                    "name": "Child of D 2",
                    "idParent": 4
                },
                {
                    "id": 10,
                    "name": "Child of Child of D 2",
                    "idParent": 9
                },
                {
                    "id": 11,
                    "name": "Child of Child of Child of D 2",
                    "idParent": 10
                }];

            var expected = [
                {
                    "id": 1,
                    "name": 'A',
                    "idParent": -1,
                    "children": [
                        {
                            "id": 5,
                            "name": "Child of A",
                            "idParent": 1
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "B",
                    "idParent": -1,
                    children: [
                        {
                            "id": 6,
                            "name": "Child of B 1",
                            "idParent": 2
                        },
                        {
                            "id": 7,
                            "name": "Child of B 2",
                            "idParent": 2
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "C",
                    "idParent": -1
                },
                {
                    "id": 4,
                    "name": "D",
                    "idParent": -1,
                    children: [
                        {
                            "id": 8,
                            "name": "Child of D 1",
                            "idParent": 4
                        },
                        {
                            "id": 9,
                            "name": "Child of D 2",
                            "idParent": 4,
                            children: [
                                {
                                    "id": 10,
                                    "name": "Child of Child of D 2",
                                    "idParent": 9,
                                    children: [
                                        {
                                            "id": 11,
                                            "name": "Child of Child of Child of D 2",
                                            "idParent": 10
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ];
            var output = sut.decoratingDataUsingHierarqhyMethod(input);
            expect(output).toEqual(expected);
        });

    });
    //endregion decoratingDataUsingHierarqhyMethod test

    describe('decorateData', function () {
        describe('data is empty', function () {
            it("should return data empty error", function () {
                var data = [];
                expect(function () {
                    sut.decorateData(data);
                }).toThrow(new Error("No data received from server"));
            });
        });

        beforeEach(function () {
            var decoratingMethods = Object.keys(Object.getPrototypeOf(sut)).filter(function (methodName) {
                return methodName.match(/^(decoratingData)+/);
            });

            decoratingMethods.forEach(function (method) {
                spyOn(sut, method);
            });
        });

        [{
            query: 'Environment', expectedCallMethod: 'decoratingDataUsingEnvironmentMethod'
        }, {
            query: 'Hierarqhy', expectedCallMethod: 'decoratingDataUsingHierarqhyMethod'
        }].forEach(function (testCase) {
                it("should call '" + testCase.expectedCallMethod + "' to decorate when query is '" + testCase.query + "'", function () {
                    var data = [{
                        msg: "some fake data"
                    }];
                    sut.currentQuery = testCase.query;
                    sut.decorateData(data);
                    expect(sut[testCase.expectedCallMethod]).toHaveBeenCalledWith(data);
                });
            });
    });

    describe("getFilteredData", function () {

        describe('data is empty or invalid array', function () {
            [null, undefined, [], {length: 10}].forEach(function (data) {
                it("should throw data empty exception", function () {
                    expect(function () {
                        sut.getFilteredData(data);
                    }).toThrow(new Error('Invalid data passed'));
                });
            })
        });

        describe('currentUserFilterGroup is invalid', function () {
            var data = [{
                "data": "data"
            }];
            [null, undefined, 'somethingElse'].forEach(function (filter) {
                it("should throw currentUserFilterGroup is invalid exception", function () {
                    expect(function () {
                        sut.getFilteredData(data, filter);
                    }).toThrow(new Error('Invalid filterGroup passed'));
                });
            })
        });

        describe('searchQuery is empty', function () {
            var data = [{
                "data": "data"
            }];
            var filter = 'Hierarqhy';
            it("should return the same data without touching it", function () {
                var actual = sut.getFilteredData(data, filter);
                expect(actual).toEqual(data);
            });
        });

        describe('currentUserFilterGroup is "Environment" or "Team"', function () {
            beforeEach(function () {
                // Arrange
                var data = [{
                    "data": 'data'
                }];
                Object.keys(Object.getPrototypeOf(sut)).filter(function (methodName) {
                    return methodName.match(/^(getFilteredDataFor)+/);
                }).forEach(function (method) {
                    spyOn(sut, method);
                });
            });

            [{
                query: 'Environment', expectedCallMethod: 'getFilteredDataForEnvironment'
            }, {
                query: 'Hierarqhy', expectedCallMethod: 'getFilteredDataForHierarqhy'
            }].forEach(function (testCase) {
                    it("should call proper function base on currentUserFilterGroup", function () {
                        var data = [{
                            data: "data"
                        }];
                        var searchQuery = "what ever";
                        // action
                        sut.getFilteredData(data, testCase.query, searchQuery);

                        // Assert
                        expect(sut[testCase.expectedCallMethod]).toHaveBeenCalledWith(data, searchQuery);
                    })
                });
        });

    });

    describe('getFilteredDataForEnvironment', function () {
        it("should return filtered data base on searchQuery", function () {
            var searchQuery = "o";
            var input = [
                {
                    "id": 1,
                    "group": "Antonio",
                    "children": [{
                        "id": 3,
                        "name": "Beck",
                        "idParent": 1,
                        "isEnvironment": false,
                        "checked": false
                    }, {
                        "id": 4,
                        "name": "Victoria",
                        "idParent": 1,
                        "isEnvironment": false,
                        "checked": false
                    }]
                },
                {
                    "id": 2,
                    "group": "Kevin",
                    "children": [{
                        "id": 5,
                        "name": "Thomas",
                        "idParent": 2,
                        "isEnvironment": false,
                        "checked": false
                    }, {
                        "id": 6,
                        "name": "Cindy",
                        "idParent": 2,
                        "isEnvironment": false,
                        "checked": false
                    }]
                }
            ];
            var expectedOutput = [
                {
                    "id": 1,
                    "group": "Antonio",
                    "children": [{
                        "id": 4,
                        "name": "Victoria",
                        "idParent": 1,
                        "isEnvironment": false,
                        "checked": false
                    }]
                },
                {
                    "id": 2,
                    "group": "Kevin",
                    "children": [{
                        "id": 5,
                        "name": "Thomas",
                        "idParent": 2,
                        "isEnvironment": false,
                        "checked": false
                    }]
                }
            ];
            var filteredData = sut.getFilteredDataForEnvironment(input, searchQuery);
            expect(filteredData).toEqual(expectedOutput);
        });
    });

    describe('getFilteredDataForHierarqhy', function () {
        it("should return filtered data base on searchQuery", function () {
            var searchQuery = "o";
            var input = [
                {
                    "id": 1,
                    "name": "Antonio",
                    "idParent" : -1,
                    "checked": false,
                    "children": [{
                        "id": 3,
                        "name": "Beck",
                        "idParent": 1,
                        "checked": false
                    }, {
                        "id": 4,
                        "name": "Victoria",
                        "idParent": 1,
                        "children": [
                            {
                                "id": 41,
                                "name": "Hank",
                                "idParent": 4,
                                "checked": false
                            },
                            {
                                "id": 42,
                                "name": "John",
                                "idParent": 4,
                                "checked": false
                            }
                        ],
                        "checked": false
                    }]
                },
                {
                    "id": 2,
                    "name": "Kevin",
                    "idParent" : -1,
                    "checked": false,
                    "children": [{
                        "id": 5,
                        "name": "Thomas",
                        "idParent": 2,
                        "checked": false
                    }, {
                        "id": 6,
                        "name": "Cindy",
                        "idParent": 2,
                        "children": [
                            {
                                "id": 61,
                                "name": "Alex",
                                "idParent": 6,
                                "children": [
                                    {
                                        "id": 611,
                                        "name": "Tom",
                                        "idParent": 61,
                                        "checked": false
                                    }
                                ],
                                "checked": false
                            }
                        ],
                        "checked": false
                    }]
                }
            ];
            var expectedOutput = [
                {
                    "id": 1,
                    "name": "Antonio",
                    "idParent" : -1,
                    "checked": false,
                    "children": [{
                        "id": 4,
                        "name": "Victoria",
                        "idParent": 1,
                        "children": [
                            {
                                "id": 42,
                                "name": "John",
                                "idParent": 4,
                                "checked": false
                            }
                        ],
                        "checked": false
                    }]
                },
                {
                    "id": 2,
                    "name": "Kevin",
                    "idParent" : -1,
                    "checked": false,
                    "children": [{
                        "id": 5,
                        "name": "Thomas",
                        "idParent": 2,
                        "isEnvironment": false,
                        "checked": false
                    }, {
                        "id": 6,
                        "name": "Cindy",
                        "idParent": 2,
                        "children": [
                            {
                                "id": 61,
                                "name": "Alex",
                                "idParent": 6,
                                "children": [
                                    {
                                        "id": 611,
                                        "name": "Tom",
                                        "idParent": 61,
                                        "checked": false
                                    }
                                ],
                                "checked": false
                            }
                        ],
                        "checked": false
                    }]
                }
            ];
            var filteredData = sut.getFilteredDataForHierarqhy(input, searchQuery);
            expect(filteredData).toEqual(expectedOutput);
        });
    });

});