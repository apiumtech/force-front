/**
 * Created by justin on 2/11/15.
 */

define([
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetPresenter'
], function (MapChartWidgetPresenter) {
    'use strict';
    describe("MapChartWidgetPresenter", function () {

        var sut;

        beforeEach(function () {
            sut = MapChartWidgetPresenter.newInstance();
        });

        describe("Connect view to model", function () {
            //region test should declare methods
            var ___view, ___model, view;
            [
                {
                    viewEvent: "onReloading", test: onReloadingTest
                },
                {
                    viewEvent: "onDateFilterApplied", test: onDateFilterAppliedTest
                },
                {
                    viewEvent: "onUsersFilterApplied", test: onUsersFilterAppliedTest
                },
                {
                    viewEvent: "onFilterChanged", test: onFilterChangedTest
                }
            ].forEach(function (testCase) {
                    var viewEvent = testCase.viewEvent,
                        test = testCase.test;

                    beforeEach(function () {
                        view = {
                            event: {},
                            sendReloadCommandToChannel: function () {
                            }
                        };
                        ___model = {
                            setFetchEndPoint: jasmine.createSpy()
                        };
                        sut.show(view, ___model);
                    });

                    describe("when event '" + viewEvent + "' fired", test);
                });

            function onReloadingTest() {
                beforeEach(function () {
                    view.selectedFilter = 'users';
                    view.widget = {
                        dataEndpoint: "/test/end/point"
                    };
                    spyOn(sut, '_executeLoadWidget');
                    ___model.changeFilterTab = jasmine.createSpy();
                });

                it("should call '_executeLoadWidget' method", function () {
                    view.event.onReloading();
                    expect(sut._executeLoadWidget).toHaveBeenCalled();
                });
            }


            function onDateFilterAppliedTest() {
                var filterValue = {
                    dateStart: new Date(),
                    dateEnd: new Date()
                };
                beforeEach(function () {
                    ___model.addDateFilter = jasmine.createSpy();

                    spyOn(view, 'sendReloadCommandToChannel');
                    view.event.onDateFilterApplied(filterValue);
                });

                it("should call 'addDateFilter' on the model", function () {
                    expect(___model.addDateFilter).toHaveBeenCalledWith(filterValue.dateStart, filterValue.dateEnd);
                });

                it("should call 'sendReloadCommandToChannel' on the view", function () {
                    expect(view.sendReloadCommandToChannel).toHaveBeenCalled();
                });
            }

            function onUsersFilterAppliedTest() {
                var filterValue = [1, 2, 3, 4, 5];
                beforeEach(function () {
                    ___model.addUserFilter = jasmine.createSpy();

                    spyOn(view, 'sendReloadCommandToChannel');
                    view.event.onUsersFilterApplied(filterValue);
                });

                it("should call 'addUserFilter' on the model", function () {
                    expect(___model.addUserFilter).toHaveBeenCalledWith(filterValue);
                });

                it("should call 'sendReloadCommandToChannel' on the view", function () {
                    expect(view.sendReloadCommandToChannel).toHaveBeenCalled();
                });
            }

            function onFilterChangedTest() {
                beforeEach(function () {
                    ___model.changeQueryFilter = jasmine.createSpy();
                    spyOn(view, 'sendReloadCommandToChannel');
                    view.selectedFilter = "abcdef";
                    view.event.onFilterChanged();
                });

                it("should call addQuery on model", function () {
                    expect(___model.changeQueryFilter).toHaveBeenCalledWith('abcdef');
                });

                it("should fire sendReloadCommandToChannel signal on view", function () {
                    expect(view.sendReloadCommandToChannel).toHaveBeenCalled();
                });
            }

            //endregion test should declare methods

            //region specific methods
            [{
                method: "_executeLoadWidget",
                modelMethod: "reloadWidget",
                onError: "onReloadWidgetError",
                onSuccess: "onReloadWidgetSuccess"
            }].forEach(function (item) {
                    describe("Calling '" + item.method + "' ", function () {
                        var model = createModel();
                        var view = createView();

                        it("should call '" + item.modelMethod + "' on model", function () {
                            spyOn(model, item.modelMethod).and.returnValue(exerciseFakePromise());
                            sut.show(view, model);
                            sut[item.method]();
                            expect(model[item.modelMethod]).toHaveBeenCalled();
                        });

                        it("should call '" + item.onSuccess + "' when model returns success", function () {
                            spyOn(model, item.modelMethod).and.returnValue(exerciseFakeOkPromise());
                            sut.show(view, model);
                            sut[item.method]();
                            expect(view[item.onSuccess]).toHaveBeenCalled();
                        });

                        it("should call '" + item.onError + "' when model returns fail", function () {
                            spyOn(model, item.modelMethod).and.returnValue(exerciseFakeKoPromise());
                            sut.show(view, model);
                            sut[item.method]();
                            expect(view[item.onError]).toHaveBeenCalled();
                        });
                    });

                    function createModel() {
                        var model = {};
                        model[item.modelMethod] = function () {
                        };
                        return model;
                    }

                    function createView() {
                        var v = {event: {}};
                        v[item.onSuccess] = jasmine.createSpy();
                        v[item.onError] = jasmine.createSpy();
                        v.event[item.event] = function () {
                        };
                        return v;
                    }
                });

            //endregion
        });
    });

});