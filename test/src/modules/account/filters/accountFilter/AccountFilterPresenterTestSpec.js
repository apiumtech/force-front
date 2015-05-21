/**
 * Created by justin on 3/4/15
 */
define([
    'modules/account/filters/accountFilter/AccountFilterPresenter'
], function (AccountFilterPresenter) {
    'use strict';

    describe("AccountFilterPresenter", function () {

        var sut;
        var ___view, ___model;
        beforeEach(function () {
            ___view = {
                event: {}
            };
            ___model = {};
        });


        beforeEach(function () {
            sut = AccountFilterPresenter.newInstance();
        });

        describe("show", function () {
            [{
                viewEvent: "onShowAvailableOwners", exercise: onShowAvailableOwnersTest
            }, {
                viewEvent: "onShowAvailableViews", exercise: onShowAvailableViewsTest
            }, {
                viewEvent: "onShowAvailableEnvironments", exercise: onShowAvailableEnvironmentsTest
            }, {
                viewEvent: "onShowAvailableAccountTypes", exercise: onShowAvailableAccountTypesTest
            }, {
                viewEvent: "onToggleOwnerFilter", exercise: onToggleOwnerFilterTest
            }, {
                viewEvent: "onToggleEnvironmentFilter", exercise: onToggleEnvironmentFilterTest
            }, {
                viewEvent: "onToggleAccountTypeFilter", exercise: onToggleAccountTypeFilterTest
            }, {
                viewEvent: "onToggleViewFilter", exercise: onToggleViewFilterTest
            }, {
                viewEvent: "onSearchQueryChanged", exercise: onSearchQueryChangedTest
            }].forEach(function (test) {
                    var viewEvent = test.viewEvent;

                    it("should declared '" + viewEvent + "' event for View", function () {
                        sut.show(___view, ___model);
                        testDeclareMethod(___view.event, viewEvent);
                    });

                    describe("when event '" + viewEvent + "' fired", function () {
                        beforeEach(function () {
                            sut.show(___view, ___model);
                        });
                        test.exercise();
                    });
                });

            function onShowAvailableOwnersTest() {
                var modelMethod = "getAvailableOwners";
                var onSuccess = "setAvailableOwners";
                var onError = "showError";
                exerciseAjaxCallBinding("onShowAvailableOwners", modelMethod, onSuccess, onError);
            }

            function onShowAvailableViewsTest() {
                var modelMethod = "getAvailableViews";
                var onSuccess = "setAvailableViews";
                var onError = "showError";
                exerciseAjaxCallBinding("onShowAvailableViews", modelMethod, onSuccess, onError);
            }

            function onShowAvailableEnvironmentsTest() {
                var modelMethod = "getAvailableEnvironments";
                var onSuccess = "setAvailableEnvironments";
                var onError = "showError";
                exerciseAjaxCallBinding("onShowAvailableEnvironments", modelMethod, onSuccess, onError);
            }

            function onShowAvailableAccountTypesTest() {
                var modelMethod = "getAvailableAccountTypes";
                var onSuccess = "setAvailableAccountTypes";
                var onError = "showError";
                exerciseAjaxCallBinding("onShowAvailableAccountTypes", modelMethod, onSuccess, onError);
            }

            function onToggleOwnerFilterTest() {
                it("should send owner toggle signal using channel", function () {
                    spyOn(sut.filterChannel, 'sendOwnerToggleSignal');
                    ___view.event.onToggleOwnerFilter({id: 1});
                    expect(sut.filterChannel.sendOwnerToggleSignal).toHaveBeenCalledWith({id: 1});
                });
            }

            function onToggleEnvironmentFilterTest() {
                it("should send environment toggle signal using channel", function () {
                    spyOn(sut.filterChannel, 'sendEnvironmentToggleSignal');
                    ___view.event.onToggleEnvironmentFilter({id: 1});
                    expect(sut.filterChannel.sendEnvironmentToggleSignal).toHaveBeenCalledWith({id: 1});
                });
            }

            function onToggleAccountTypeFilterTest() {
                it("should send account type toggle signal using channel", function () {
                    spyOn(sut.filterChannel, 'sendAccountTypeToggledSignal');
                    ___view.event.onToggleAccountTypeFilter({id: 1});
                    expect(sut.filterChannel.sendAccountTypeToggledSignal).toHaveBeenCalledWith({id: 1});
                });
            }

            function onToggleViewFilterTest() {
                it("should send view toggle signal using channel", function () {
                    spyOn(sut.filterChannel, 'sendViewChangedSignal');
                    ___view.event.onToggleViewFilter({id: 1});
                    expect(sut.filterChannel.sendViewChangedSignal).toHaveBeenCalledWith({id: 1});
                });
            }

            function onSearchQueryChangedTest() {
                it("should send query changed signal using channel", function () {
                    spyOn(sut.filterChannel, 'sendQueryingData');
                    ___view.event.onSearchQueryChanged("queryString_apiumtech");
                    expect(sut.filterChannel.sendQueryingData).toHaveBeenCalledWith("queryString_apiumtech");
                });
            }
        });


        function exerciseAjaxCallBinding(viewEvent, modelMethod, onSuccess, onError) {
            beforeEach(function () {
                ___model[modelMethod] = function () {
                };
                ___view[onSuccess] = jasmine.createSpy();
                ___view[onError] = jasmine.createSpy();
            });
            it("presenter should connect event to '" + modelMethod + "' method on $model", function () {
                spyOn(___model, modelMethod).and.returnValue(exerciseFakePromise());
                ___view.event[viewEvent]();
                expect(___model[modelMethod]).toHaveBeenCalled();
            });

            it("should call method '" + onSuccess + "' on $___view if $model '" + modelMethod + "' return success", function () {
                spyOn(___model, modelMethod).and.returnValue(exerciseFakeOkPromise());
                ___view.event[viewEvent]();
                expect(___view[onSuccess]).toHaveBeenCalled();
            });

            it("should call method '" + onError + "' on $___view if $model '" + modelMethod + "' return error", function () {
                spyOn(___model, modelMethod).and.returnValue(exerciseFakeKoPromise());
                ___view.event[viewEvent]();
                expect(___view[onError]).toHaveBeenCalled();
            });
        }
    });

});