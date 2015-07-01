/**
 * Created by justin on 3/4/15
 */
define([
    'modules/account/filters/accountFilter/AccountFilterPresenter',
    'modules/account/filters/accountFilter/AccountFilterModel',
    'shared/services/bus/FilterChannel',
    'shared/services/AccountEventBus',
    'modules/account/filters/accountFilter/AccountFilterView'
], function (AccountFilterPresenter, AccountFilterModel, FilterChannel, AccountEventBus, AccountFilterView) {
    'use strict';

    describe("AccountFilterPresenter", function () {

        var sut, view, model, filterChannel, eventBus;
        beforeEach(function () {
            view = mock(AccountFilterView);
            model = mock(AccountFilterModel);
            filterChannel = mock(FilterChannel);
            eventBus = mock(AccountEventBus);
        });


        beforeEach(function () {
            sut = new AccountFilterPresenter(filterChannel, eventBus, model);
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
            }, {
                viewEvent: "onLoadingAvailableFilters", exercise: onLoadingAvailableFiltersTest
            }].forEach(function (test) {
                    var viewEvent = test.viewEvent;

                    describe("when event '" + viewEvent + "' fired", function () {
                        beforeEach(function () {
                            sut.show(view);
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

            function onLoadingAvailableFiltersTest() {
                var modelMethod = "loadAvailableFilters";
                var onSuccess = "onAvailableFiltersLoaded";
                var onError = "showError";
                exerciseAjaxCallBinding("onLoadingAvailableFilters", modelMethod, onSuccess, onError);
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
                    view.event.onToggleOwnerFilter({id: 1});
                    expect(sut.filterChannel.sendOwnerToggleSignal).toHaveBeenCalledWith({id: 1});
                });
            }

            function onToggleEnvironmentFilterTest() {
                it("should send environment toggle signal using channel", function () {
                    spyOn(sut.filterChannel, 'sendEnvironmentToggleSignal');
                    view.event.onToggleEnvironmentFilter({id: 1});
                    expect(sut.filterChannel.sendEnvironmentToggleSignal).toHaveBeenCalledWith({id: 1});
                });
            }

            function onToggleAccountTypeFilterTest() {
                it("should send account type toggle signal using channel", function () {
                    spyOn(sut.filterChannel, 'sendAccountTypeToggledSignal');
                    view.event.onToggleAccountTypeFilter({id: 1});
                    expect(sut.filterChannel.sendAccountTypeToggledSignal).toHaveBeenCalledWith({id: 1});
                });
            }

            function onToggleViewFilterTest() {
                it("should send view toggle signal using channel", function () {
                    spyOn(sut.filterChannel, 'sendViewChangedSignal');
                    view.event.onToggleViewFilter({id: 1});
                    expect(sut.filterChannel.sendViewChangedSignal).toHaveBeenCalledWith({id: 1});
                });
            }

            function onSearchQueryChangedTest() {
                it("should send query changed signal using channel", function () {
                    spyOn(sut.filterChannel, 'sendQueryingData');
                    view.event.onSearchQueryChanged("queryString_apiumtech");
                    expect(sut.filterChannel.sendQueryingData).toHaveBeenCalledWith("queryString_apiumtech");
                });
            }
        });


        function exerciseAjaxCallBinding(viewEvent, modelMethod, onSuccess, onError) {
            beforeEach(function () {
                view[onSuccess] = jasmine.createSpy();
                view[onError] = jasmine.createSpy();
            });
            it("presenter should connect event to '" + modelMethod + "' method on $model", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakePromise());
                view.event[viewEvent]();
                expect(model[modelMethod]).toHaveBeenCalled();
            });

            it("should call method '" + onSuccess + "' on $view if $model '" + modelMethod + "' return success", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakeOkPromise());
                view.event[viewEvent]();
                expect(view[onSuccess]).toHaveBeenCalled();
            });

            it("should call method '" + onError + "' on $view if $model '" + modelMethod + "' return error", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakeKoPromise());
                view.event[viewEvent]();
                expect(view[onError]).toHaveBeenCalled();
            });
        }

    });

});