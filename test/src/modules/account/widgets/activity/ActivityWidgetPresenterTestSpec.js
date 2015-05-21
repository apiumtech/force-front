/**
 * Created by justin on 3/9/15.
 */

define([
    'modules/account/widgets/activity/ActivityWidgetPresenter'
], function(ActivityWidgetPresenter){
    'use strict';

    describe("ActivityWidgetPresenter", function () {

        var sut, view, model;

        beforeEach(function () {
            sut = ActivityWidgetPresenter.newInstance();
            view = {event: {}};
            model = {};
        });

        describe("show()", function () {
            [
                {
                    viewEvent: "onLoadActivity", test: onLoadActivityTest
                },
                {
                    viewEvent: "onActivityFollowToggled", test: onActivityFollowToggledTest
                }
            ].forEach(function (testCase) {
                    var viewEvent = testCase.viewEvent,
                        test = testCase.test;

                    describe("when event '" + viewEvent + "' fired", function () {
                        beforeEach(function () {
                            sut.show(view, model);
                        });
                        test();
                    });
                });

            function onLoadActivityTest() {
                var modelMethod = "loadActivity";
                var onSuccess = "onActivityLoaded";
                var onError = "showError";
                exerciseAjaxCallBinding("onLoadActivity", modelMethod, onSuccess, onError);
            }

            function onActivityFollowToggledTest() {
                var modelMethod = "toggleFollow";
                var onSuccess = "followToggled";
                var onError = "showError";
                exerciseAjaxCallBinding("onActivityFollowToggled", modelMethod, onSuccess, onError);
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