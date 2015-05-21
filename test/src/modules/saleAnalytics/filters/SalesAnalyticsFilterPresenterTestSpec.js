/**
 * Created by Justin on 2/5/2015.
 */
define([
    'modules/saleAnalytics/filters/SalesAnalyticsFilterPresenter'
], function (SalesAnalyticsFilterPresenter) {
    'use strict';
    describe("SalesAnalyticsFilterPresenter", function () {
        var sut;

        beforeEach(function () {
            sut = SalesAnalyticsFilterPresenter.newInstance();
        });

        var ___view, ___model;
        describe("show()", function () {
            describe("should connect view's events to model", function () {

                beforeEach(function () {
                    ___view = {
                        event: {},
                        showLoadingUsers: function () {
                        },
                        hideLoadingUsers: function () {
                        },
                        setFilteredData: function () {

                        }
                    };
                    ___model = {};
                    sut.show(___view, ___model);
                });

                [{
                    viewEvent: "onFilterInitializing", test: onFilterInitializingTest
                }, {
                    viewEvent: "onFilterByGroup", test: onFilterByGroupTest
                }, {
                    viewEvent: "onFilteringUsers", test: onFilteringUsersTest
                }].forEach(function (testCase) {
                        var viewEvent = testCase.viewEvent,
                            test = testCase.test;

                        describe("when event '" + viewEvent + "' fired", test);
                    });

                function onFilterInitializingTest() {
                    var viewEvent = "onFilterInitializing",
                        modelMethod = 'getUsers',
                        onSuccess = "onUsersLoadedSuccess",
                        onError = "onUsersLoadedFail";
                    exerciseAjaxCallMapping(modelMethod, onSuccess, onError, viewEvent);
                }

                function onFilterByGroupTest() {
                    var groupName = "team";

                    function exerciseTest() {
                        ___model.addQuery = jasmine.createSpy();
                        ___view.event.onFilterInitializing = jasmine.createSpy();
                        ___view.event.onFilterByGroup(groupName);
                    }

                    it("should call model's addQuery", function () {
                        exerciseTest();
                        expect(___model.addQuery).toHaveBeenCalledWith(groupName);
                    });

                    it("should fire event onFilterInitializing", function () {
                        exerciseTest();
                        expect(___view.event.onFilterInitializing).toHaveBeenCalled();
                    });
                }

                function onFilteringUsersTest() {
                    beforeEach(function () {
                        ___model.getFilteredData = function () {
                        };
                        ___view.usersList = [{
                            "data": "mockup"
                        }];
                        ___view.currentUserFilterGroup = 'Environment';
                    });

                    it("should call the filter method from model", function () {
                        var searchQuery = "some search query";
                        spyOn(___model, 'getFilteredData');
                        ___view.event.onFilteringUsers('a', 'b', searchQuery);
                        expect(___model.getFilteredData).toHaveBeenCalledWith('a', 'b', searchQuery);
                    });

                    it("should pass the result to view", function () {
                        var searchQuery = "some search query";
                        var fakeValue = {};
                        spyOn(___model, 'getFilteredData').and.returnValue(fakeValue);
                        spyOn(___view, 'setFilteredData');
                        ___view.event.onFilteringUsers('a', 'b', searchQuery);
                        expect(___view.setFilteredData).toHaveBeenCalledWith(fakeValue);
                    });
                }
            });
        });


        function exerciseAjaxCallMapping(modelMethod, onSuccess, onError, viewEvent) {
            beforeEach(function () {
                ___model[modelMethod] = function () {
                };
                ___view[onSuccess] = jasmine.createSpy();
                ___view[onError] = jasmine.createSpy();
            });

            it("presenter should connect event to '" + modelMethod + "' method on model", function () {
                spyOn(___model, modelMethod).and.returnValue(exerciseFakePromise());
                ___view.event[viewEvent]();
                expect(___model[modelMethod]).toHaveBeenCalled();
            });

            it("should call method '" + onSuccess + "' on view if model '" + modelMethod + "' return success", function () {
                spyOn(___model, modelMethod).and.returnValue(exerciseFakeOkPromise());
                ___view.event[viewEvent]();
                expect(___view[onSuccess]).toHaveBeenCalled();
            });

            it("should call method '" + onError + "' on view if model '" + modelMethod + "' return error", function () {
                spyOn(___model, modelMethod).and.returnValue(exerciseFakeKoPromise());
                ___view.event[viewEvent]();
                expect(___view[onError]).toHaveBeenCalled();
            });
        }
    });

});