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

        it("should call defer to get defer object", function () {
            spyOn(ajaxService, 'ajax').and.returnValue(exerciseFakePromise());
            sut._getUsers();
            expect(sut.defer).toHaveBeenCalled();
        });

        it("should call ajax", function () {
            var params = {
                url: '/api/users',
                type: 'get',
                contentType: 'application/json',
                accept: 'application/json'
            };
            spyOn(ajaxService, 'ajax').and.returnValue(exerciseFakePromise());
            sut._getUsers();
            expect(ajaxService.ajax).toHaveBeenCalledWith(params);
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
});