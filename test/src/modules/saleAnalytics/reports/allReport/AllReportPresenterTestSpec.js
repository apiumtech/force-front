define([
    'modules/saleAnalytics/reports/allReport/AllReportPresenter',
    'modules/saleAnalytics/reports/allReport/AllReportModel'
], function (AllReportPresenter, AllReportModel) {
    'use strict';

    describe('AllReportPresenter', function () {
        var sut;

        var ___view, ___model;
        beforeEach(function () {
            ___model = mock(AllReportModel);
            sut = new AllReportPresenter(___model);
        });


        describe("show()", function () {

            describe("should connect view's events to model", function () {

                beforeEach(function () {
                    ___view = {
                        event: {},
                        onReportsLoaded: function () {
                        },
                        showError: function () {
                        },
                        reloadReports: function () {
                        }
                    };
                    sut.show(___view);
                });

                [{
                    viewEvent: "onLoadReports", test: onLoadReportsTest
                },{
                    viewEvent: "onReloading", test: onReloadingTest
                }, {
                    viewEvent: "onUsersFilterApplied", test: onUsersFilterAppliedTest
                }].forEach(function (testCase) {
                        var viewEvent = testCase.viewEvent,
                            test = testCase.test;

                        describe("when event '" + viewEvent + "' fired", test);
                    });

                function onLoadReportsTest() {
                    beforeEach(function () {
                        spyOn(sut, '_executeLoadWidget');
                    });

                    it("should call '_executeLoadWidget' method", function () {
                        ___view.event.onReloading();
                        expect(sut._executeLoadWidget).toHaveBeenCalled();
                    });
                }

                function onReloadingTest() {
                    beforeEach(function () {
                        spyOn(sut, '_executeLoadWidget');
                    });

                    it("should call '_executeLoadWidget' method", function () {
                        ___view.event.onReloading();
                        expect(sut._executeLoadWidget).toHaveBeenCalled();
                    });
                }

                function onUsersFilterAppliedTest() {
                    var filterValue = [1, 2, 3, 4, 5];
                    beforeEach(function () {

                        spyOn(___view, 'reloadReports');
                        ___view.event.onUsersFilterApplied(filterValue);
                    });

                    it("should call 'addUserFilter' on the model", function () {
                        expect(___model.addUserFilter).toHaveBeenCalledWith(filterValue);
                    });

                    it("should call 'reloadReports' on the view", function () {
                        expect(___view.reloadReports).toHaveBeenCalled();
                    });
                }

            });
        });

        describe('_executeLoadWidget', function () {
            it("should call method reloadWidget from model, and send the result to view", function () {
                var viewEvent = "onLoadReports",
                    modelMethod = 'reloadWidget',
                    onSuccess = "onReportsLoaded",
                    onError = "showError";
                exerciseAjaxCallMapping(modelMethod, onSuccess, onError, viewEvent);
            });
        });

        function exerciseAjaxCallMapping(modelMethod, onSuccess, onError, viewEvent) {
            beforeEach(function () {
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