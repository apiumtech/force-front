define([
    'modules/saleAnalytics/reports/reportSearchBox/ReportSearchBoxPresenter',
    'modules/saleAnalytics/reports/reportSearchBox/ReportSearchBoxModel',
    'modules/saleAnalytics/reports/reportSearchBox/ReportSearchBoxView'
], function(ReportSearchBoxPresenter, ReportSearchBoxModel, ReportSearchBoxView) {
    'use strict';

    describe('ReportSearchBoxPresenter Test', function() {
        var sut, model, view;
        beforeEach(function(){
            model = mock(ReportSearchBoxModel);
            view = mock(ReportSearchBoxView);
            sut = new ReportSearchBoxPresenter(model);
        });

        describe('show', function () {
            beforeEach(function () {
                sut.show(view);
            });

            [
                {
                    viewEvent: "onSearch", test: onSearchTest
                }
            ].forEach(function(testCase){
                    var viewEvent = testCase.viewEvent,
                        test = testCase.test;

                    describe("when event '" + viewEvent + "' fired", function () {
                        beforeEach(function () {
                            sut.show(view);
                        });
                        test();
                    });
                });

            function onSearchTest(){
                var modelMethod = "search";
                var onSuccess = "onSearchResultLoaded";
                var onError = "showError";
                exerciseAjaxCallBinding("onSearch", modelMethod, onSuccess, onError);
            };

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
});