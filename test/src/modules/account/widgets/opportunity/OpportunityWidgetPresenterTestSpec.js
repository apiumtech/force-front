/**
 * Created by justin on 3/9/15.
 */
define([
    'modules/account/widgets/opportunity/OpportunityWidgetPresenter'
], function (OpportunityWidgetPresenter) {
    'use strict';
    describe("OpportunityWidgetPresenter", function () {

        var sut, view, model;

        beforeEach(function () {
            sut = OpportunityWidgetPresenter.newInstance();
            view = {event: {}};
            model = {};
        });

        describe("show()", function () {
            [
                {
                    viewEvent: "onLoadOpportunities", test: onLoadOpportunitiesTest
                }
            ].forEach(function (testCase) {
                    var viewEvent = testCase.viewEvent,
                        test = testCase.test;

                    describe("when event '" + viewEvent + "' on view fired", function () {
                        beforeEach(function () {
                            sut.show(view, model);
                        });
                        test();
                    });
                });

            function onLoadOpportunitiesTest() {
                var modelMethod = "loadOpportunities";
                var onSuccess = "onOpportunitiesLoaded";
                var onError = "showError";
                exerciseAjaxCallBinding("onLoadOpportunities", modelMethod, onSuccess, onError);
            }

            function exerciseAjaxCallBinding(viewEvent, modelMethod, onSuccess, onError) {
                beforeEach(function () {
                    model[modelMethod] = function () {
                    };
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