/**
 * Created by trung.dang on 02/13/2015
 */
define([
    'modules/account/filters/accountFilter/AccountFilterView',
    'modules/account/filters/accountFilter/AccountFilterPresenter'
], function (AccountFilterView, AccountFilterPresenter) {
    'use strict';
    describe("AccountFilterView", function () {

        var sut, scope, presenter;
        beforeEach(function () {
            inject(function($rootScope){
                scope = $rootScope.$new();
            });

            presenter = mock(AccountFilterPresenter);

            sut = new AccountFilterView(scope, presenter);
        });

        describe("configureEvents", function () {
            beforeEach(function () {
                sut.configureEvents();
            });

            [{
                method: "onLoaded", exercise: onLoadedTest
            }, {
                method: "onSelectedViewChanged", exercise: onSelectedViewChangedTest
            }, {
                method: "onSelectedViewChanged", exercise: onSelectedViewChangedTest
            }].forEach(function (test) {
                    var method = test.method;
                    var testExercise = test.exercise;

                    it("should define method '" + method + "'", function () {
                        expect(sut.fn[method]).not.toBeNull();
                        expect(isFunction(sut.fn[method]));
                    });

                    describe("calling '" + method + "' ", function () {
                        testExercise();
                    });
                });

            function onLoadedTest() {
                [
                    "onShowAvailableEnvironments",
                    "onShowAvailableAccountTypes",
                    "onShowAvailableViews",
                    "onShowAvailableOwners",
                    "onLoadingAvailableFilters"
                ].forEach(function (event) {
                        beforeEach(function () {
                            sut.event[event] = jasmine.createSpy();
                        });
                        it("should fire event '" + event + "'", function () {
                            sut.fn.onLoaded();
                            expect(sut.event[event]).toHaveBeenCalled();
                        });
                    });
            }

            function onSelectedViewChangedTest() {
                it("should fire event 'onToggleViewsFilter' with correct selected view", function () {
                    sut.data.selectedView = "view1";
                    sut.data.availableViews = [{
                        name: 'view1'
                    }, {
                        name: 'view2'
                    }, {
                        name: 'view3'
                    }, {
                        name: 'view4'
                    }];
                    sut.event.onToggleViewFilter = jasmine.createSpy();

                    sut.fn.onSelectedViewChanged();
                    expect(sut.event.onToggleViewFilter).toHaveBeenCalledWith({
                        name: 'view1',
                        selected: true
                    });
                });
            }

        });

        describe("setAvailableOwners behaviour", function () {
            var data = 1;

            beforeEach(function () {
                sut.setAvailableOwners(data);
            });

            it("should assign the availableOwners field", function () {
                expect(sut.data.availableOwners).toEqual(data);
            });
        });

        it("showCustomFilters should assign the customFilters field", function () {
            var data = 1;

            sut.showCustomFilters(data);

            expect(sut.data.customFilters).toEqual(data);
        });

        it("shouldError should assign the currentError field", function () {
            var msg = "Mamma mia!";

            sut.showError(msg);
            expect(sut.data.currentError).toEqual(msg);
        });
    });

});