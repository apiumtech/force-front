/**
 * Created by Justin on 2/5/2015.
 */
describe("SalesAnalyticsFilterPresentationModel", function () {
    var SalesAnalyticsFilterPresentationModel = app.getModel("models/filters/SalesAnalyticsFilterPresentationModel"),
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
        sut = SalesAnalyticsFilterPresentationModel.newInstance(ajaxService, storageService).getOrElse(throwInstantiateException(SalesAnalyticsFilterPresentationModel));
        spyOn(sut, 'defer').and.returnValue(deferredObject);
    });

    //region inheritance tests
    describe("_getUsers", function () {
        beforeEach(function () {
        });

        it("should call defer to get defer object", function () {
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakePromise());
            sut._getUsers();
            expect(sut.defer).toHaveBeenCalled();
        });

        it("should call ajax", function () {
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakePromise());
            sut._getUsers();
            expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
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
    //endregion inheritance tests

    //region decorateData test
    describe("decorateData()", function () {
        it("should return correct grouped values", function () {
            var serverResponse = {
                "success": true,
                "data": [
                    {
                        "id": 1,
                        "name": "name1",
                        "environment": "es"
                    },
                    {
                        "id": 2,
                        "name": "name2",
                        "environment": "uk"
                    },
                    {
                        "id": 3,
                        "name": "name3",
                        "environment": "uk"
                    },
                    {
                        "id": 4,
                        "name": "name4",
                        "environment": "es"
                    }
                ]
            };

            var expected = [{
                group: "es",
                data: [
                    {
                        "id": 1,
                        "name": "name1",
                        "environment": "es",
                        "checked": false
                    },
                    {
                        "id": 4,
                        "name": "name4",
                        "environment": "es",
                        "checked": false
                    }
                ]
            }, {
                group: "uk",
                data: [
                    {
                        "id": 2,
                        "name": "name2",
                        "environment": "uk",
                        "checked": false
                    },
                    {
                        "id": 3,
                        "name": "name3",
                        "environment": "uk",
                        "checked": false
                    }
                ]
            }];

            var actual = sut.decorateData(serverResponse);
            expect(actual).toEqual(expected);
        });
    });
    //endregion decorateData test
});