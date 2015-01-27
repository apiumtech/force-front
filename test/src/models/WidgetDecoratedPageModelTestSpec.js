/**
 * Created by Justin on 1/5/2015.
 */
describe("WidgetDecoratedPageModel", function () {
    var WidgetDecoratedPageModel = app.getModel("models/WidgetDecoratedPageModel");
    var sut,
        widgetService = {
            getWidgetsForPage: function () {
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

    beforeEach(function () {
        sut = Some(new WidgetDecoratedPageModel(widgetService, storageService)).getOrElse(throwInstantiateException(WidgetDecoratedPageModel));
    });

    describe("_getWidgets", function () {
        var deferredObject = {
            promise: function () {
            },
            resolve: function () {
            },
            reject: function () {
            }
        };

        beforeEach(function () {
            sut.pageName = "pageNameHere";
            spyOn(sut, 'defer').and.returnValue(deferredObject);
            spyOn(widgetService, 'getWidgetsForPage').and.returnValue(exerciseFakePromise());
        });

        it("should throw exception if pageName not defined", function () {
            sut.pageName = null;
            expect(function () {
                sut._getWidgets();
            }).toThrow(new Error("Page Name is not defined"));
        });

        it("should call defer to get defer object", function () {
            sut._getWidgets();
            expect(sut.defer).toHaveBeenCalled();
        });

        it("should try to get data from local storage", function () {
            spyOn(storageService, 'retrieve');
            sut._getWidgets();
            expect(storageService.retrieve).toHaveBeenCalledWith("pageLayout_pageNameHere");
        });

        describe("can get data from local storage", function () {
            var output = {page: "test", body: []};

            function performGetWidgets() {
                spyOn(storageService, 'retrieve').and.returnValue(output);
                spyOn(deferredObject, 'resolve');
                sut._getWidgets();
            }

            it("should resolve the defer with data from localStorage", function () {
                performGetWidgets();
                expect(deferredObject.resolve).toHaveBeenCalledWith(output);
            });

            it("should not call getWidgetsForPage", function () {
                performGetWidgets();
                expect(widgetService.getWidgetsForPage).not.toHaveBeenCalled();
            });
        });

        describe("no data in local storage", function () {
            beforeEach(function () {
                widgetService.getWidgetsForPage = function () {
                };
            });

            it("should call getWidgetsForPage from service", function () {
                spyOn(widgetService, 'getWidgetsForPage').and.returnValue(exerciseFakePromise());
                sut._getWidgets();
                expect(widgetService.getWidgetsForPage).toHaveBeenCalledWith(sut.pageName);
            });

            describe("service return success", function () {
                var returnData = {
                    data: {
                        page: "test",
                        body: []
                    }
                };

                function fakePromise() {
                    return {
                        then: function (a, b) {
                            a(returnData);
                            return fakePromise();
                        }
                    };
                }

                it("should store data to localStorage", function () {
                    spyOn(widgetService, 'getWidgetsForPage').and.returnValue(fakePromise());
                    spyOn(storageService, 'store');
                    sut._getWidgets();
                    expect(storageService.store).toHaveBeenCalledWith("pageLayout_pageNameHere", returnData.data);
                });

                it("should resolve the defer with data from server response", function () {
                    spyOn(widgetService, 'getWidgetsForPage').and.returnValue(fakePromise());
                    spyOn(deferredObject, 'resolve');
                    sut._getWidgets();
                    expect(deferredObject.resolve).toHaveBeenCalledWith(returnData.data);
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
                    spyOn(widgetService, 'getWidgetsForPage').and.returnValue(fakePromise());
                    spyOn(deferredObject, 'reject');
                    sut._getWidgets();
                    expect(deferredObject.reject).toHaveBeenCalledWith(error);
                });
            });
        });

        it("should return the promise deferred", function () {
            var promise = sut._getWidgets();
            expect(promise).toEqual(deferredObject.promise);
        });
    });
});