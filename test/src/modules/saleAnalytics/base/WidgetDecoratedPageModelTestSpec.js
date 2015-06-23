/**
 * Created by Justin on 1/5/2015.
 */
define([
    'modules/saleAnalytics/base/WidgetDecoratedPageModel',
    'q'
], function (WidgetDecoratedPageModel, Q) {
    'use strict';
    describe("WidgetDecoratedPageModel", function () {

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
            sut = new WidgetDecoratedPageModel(widgetService, storageService);
        });

        afterEach(function(){
            window.sessionStorage.clear();
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
                expect(storageService.retrieve).toHaveBeenCalledWith("pageLayout_pageNameHere", true);
            });

            describe("can get data from local storage", function () {
                var output = {page: "test", body: []};

                function performGetWidgets() {
                    spyOn(storageService, 'retrieve').and.returnValue(output);
                    spyOn(deferredObject, 'resolve');
                    sut._getWidgets();
                }

                it("should assign data from localStorage to model's data", function () {
                    performGetWidgets();
                    expect(sut.modelData).toEqual(output);
                });

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
                        expect(storageService.store).toHaveBeenCalledWith("pageLayout_pageNameHere", returnData.data, true);
                    });

                    it("should assign data to modelData", function () {
                        spyOn(widgetService, 'getWidgetsForPage').and.returnValue(fakePromise());
                        sut._getWidgets();
                        expect(sut.modelData).toEqual(returnData.data);
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

        describe("getWidgets", function () {
            beforeEach(function () {
                Q._____fcall = Q.fcall;
            });

            afterEach(function () {
                Q.fcall = Q._____fcall;
            });

            it("should call fcall from Q lib", function () {
                Q.fcall = jasmine.createSpy();
                sut.getWidgets();
                expect(Q.fcall).toHaveBeenCalled();
            });

            it("should call _getWidgets method", function () {
                spyOn(sut, "_getWidgets");
                Q.fcall = function (method) {
                    return method;
                };

                sut.getWidgets()();

                expect(sut._getWidgets).toHaveBeenCalled();
            });
        });

        describe("updateWidgets", function () {
            beforeEach(function () {
                Q._____fcall = Q.fcall;
            });

            afterEach(function () {
                Q.fcall = Q._____fcall;
            });

            it("should call fcall from Q lib", function () {
                Q.fcall = jasmine.createSpy();
                sut.updateWidgets();
                expect(Q.fcall).toHaveBeenCalled();
            });

            it("should call _updateWidgets method", function () {
                spyOn(sut, "_updateWidgets");
                Q.fcall = function (method) {
                    return method;
                };

                sut.updateWidgets()();

                expect(sut._updateWidgets).toHaveBeenCalled();
            });
        });

        describe("moveWidget", function () {
            var initialWidgetsList;

            function getWidget(id, size) {
                return {
                    widgetId: id,
                    widgetName: "widget " + id,
                    dataEndPoint: "/api/data/fetch/" + id,
                    position: {size: size}
                };
            }

            beforeEach(function () {
                initialWidgetsList = [
                    getWidget(1, 6),
                    getWidget(2, 6),
                    getWidget(3, 6),
                    getWidget(4, 6),
                    getWidget(5, 6)
                ];

                sut.modelData = {
                    id: "pagename",
                    layout: "linear",
                    body: initialWidgetsList
                };
            });

            describe("input is invalid", function () {
                describe("widget to move is not exist in list", function () {
                    it("should throw exception", function () {
                        var movingWidget = {widgetId: 10};
                        expect(function () {
                            sut.moveWidget(movingWidget, 2);
                        }).toThrow(new Error("Requesting widget doesn't exist in widgets list"));
                    });
                });
            });


            describe("input is valid", function () {
                [{
                    movingWidget: getWidget(5, 6),
                    newIndex: 2,
                    expected: [
                        getWidget(1, 6),
                        getWidget(2, 6),
                        getWidget(5, 6),
                        getWidget(3, 6),
                        getWidget(4, 6)
                    ]
                }, {
                    movingWidget: getWidget(5, 6),
                    newIndex: 0,
                    expected: [
                        getWidget(5, 6),
                        getWidget(1, 6),
                        getWidget(2, 6),
                        getWidget(3, 6),
                        getWidget(4, 6)
                    ]
                }, {
                    movingWidget: getWidget(5, 12),
                    newIndex: 1,
                    expected: [
                        getWidget(1, 6),
                        getWidget(5, 12),
                        getWidget(2, 6),
                        getWidget(3, 6),
                        getWidget(4, 6)
                    ]
                }, {
                    movingWidget: getWidget(2, 12),
                    newIndex: 3,
                    expected: [
                        getWidget(1, 6),
                        getWidget(3, 6),
                        getWidget(4, 6),
                        getWidget(2, 12),
                        getWidget(5, 6)
                    ]
                }].forEach(function (test) {
                        it("should sort and have correct ordered list of widgets", function () {
                            var newIndex = test.newIndex;
                            var movingWidget = test.movingWidget,
                                expectedSortedList = test.expected;

                            sut.moveWidget(movingWidget, newIndex);
                            expect(sut.widgetsList).toEqual(expectedSortedList);
                        });

                        it("should have size changed to new size", function () {
                            var newIndex = test.newIndex;
                            var movingWidget = test.movingWidget,
                                expectedSize = movingWidget.position.size;

                            sut.moveWidget(movingWidget, newIndex);
                            expect(sut.widgetsList[newIndex].position.size).toEqual(expectedSize);
                        });
                    });
            });
        });
    });
});
